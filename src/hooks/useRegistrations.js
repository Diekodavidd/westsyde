import { useCallback, useEffect, useState } from "react";

import { games } from "../data/games";

/*
 * ------------------------------------------
 * API
 * ------------------------------------------
 */

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/registrations";


/*
 * ------------------------------------------
 * DEFAULTS
 * ------------------------------------------
 */

const DEFAULT_CAPACITY = 12;
const DEFAULT_SEATS = 10;
const DEFAULT_GROUPS = 1;
const DEFAULT_RESERVES = 2;
const DEFAULT_MAX_GAMES_PER_PERSON = 2;


/*
 * ------------------------------------------
 * GAME CONFIG
 * ------------------------------------------
 */

function getGameConfig(gameId) {
  const game = games.find(
    (item) => item.id === gameId
  );

  if (!game) {
    return {
      groups: DEFAULT_GROUPS,
      seatsPerGroup: DEFAULT_SEATS,
      reserves: DEFAULT_RESERVES,
      capacity: DEFAULT_CAPACITY,
    };
  }

  const groups =
    game.groups || DEFAULT_GROUPS;

  const seatsPerGroup =
    game.seatsPerGroup ||
    DEFAULT_SEATS;

  const reserves =
    typeof game.reserves === "number"
      ? game.reserves
      : DEFAULT_RESERVES;

  return {
    groups,
    seatsPerGroup,
    reserves,
    capacity:
      groups * seatsPerGroup +
      reserves,
  };
}


/*
 * ------------------------------------------
 * HOOK
 * ------------------------------------------
 */

function useRegistrations({
  maxGamesPerPerson =
    DEFAULT_MAX_GAMES_PER_PERSON,
} = {}) {
  const [registrations, setRegistrations] =
    useState({});

  const [loaded, setLoaded] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  /*
   * ----------------------------------------
   * FETCH ALL REGISTRATIONS
   * ----------------------------------------
   */

  const fetchRegistrations =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL);

        const data =
          await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.error ||
              "Unable to fetch registrations."
          );
        }

        setRegistrations(
          data.registrations || {}
        );
      } catch (err) {
        console.error(
          "Fetch registrations error:",
          err
        );

        setError(
          err.message ||
            "Unable to load registrations."
        );
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    }, []);


  /*
   * ----------------------------------------
   * INITIAL LOAD
   * ----------------------------------------
   */

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);


  /*
   * ----------------------------------------
   * GET GAME REGISTRATIONS
   * ----------------------------------------
   */

  const getGameRegistrations =
    useCallback(
      (gameId) => {
        return (
          registrations[gameId] || []
        );
      },
      [registrations]
    );


  /*
   * ----------------------------------------
   * REGISTER
   * ----------------------------------------
   *
   * IMPORTANT:
   *
   * Seat assignment is NOT done here.
   *
   * The backend decides:
   * - group
   * - seat
   * - reserve
   *
   * This prevents each browser from
   * creating its own separate registration
   * state.
   */

  const register = useCallback(
    async ({
      gameId,
      name,
      gender,
    }) => {
      const trimmedName =
        (name || "").trim();

      if (trimmedName.length < 2) {
        return {
          success: false,
          error:
            "Enter your Bigo name or ID.",
        };
      }

      if (!gender) {
        return {
          success: false,
          error:
            "Select your gender.",
        };
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL, {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              gameId,
              name: trimmedName,
              gender,
            }),
          });

        const data =
          await response.json();

        /*
         * Backend rejected registration.
         */
        if (!response.ok || !data.success) {
          return {
            success: false,
            error:
              data.error ||
              "Unable to complete registration.",
          };
        }

        /*
         * Add the newly created
         * registration immediately.
         */
        const entry = data.entry;

        setRegistrations(
          (current) => {
            const currentGame =
              current[gameId] || [];

            return {
              ...current,

              [gameId]: [
                ...currentGame,
                entry,
              ],
            };
          }
        );

        return {
          success: true,
          entry,
        };
      } catch (err) {
        console.error(
          "Registration error:",
          err
        );

        return {
          success: false,
          error:
            "Unable to connect to the registration server. Please try again.",
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );


  /*
   * ----------------------------------------
   * REMOVE ONE REGISTRATION
   * ----------------------------------------
   */

  const remove = useCallback(
    async (
      gameId,
      timestamp
    ) => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}/${gameId}/${timestamp}`,
            {
              method: "DELETE",
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.error ||
              "Unable to remove registration."
          );
        }

        /*
         * Remove from local React state.
         *
         * This is NOT localStorage.
         * It is simply keeping the current
         * UI synchronized with MongoDB.
         */
        setRegistrations(
          (current) => ({
            ...current,

            [gameId]: (
              current[gameId] || []
            ).filter(
              (entry) =>
                entry.ts !==
                Number(timestamp)
            ),
          })
        );

        return {
          success: true,
        };
      } catch (err) {
        console.error(
          "Remove registration error:",
          err
        );

        setError(
          err.message ||
            "Unable to remove registration."
        );

        /*
         * Refresh from MongoDB in case
         * the UI and database became
         * out of sync.
         */
        await fetchRegistrations();

        return {
          success: false,
          error:
            err.message ||
            "Unable to remove registration.",
        };
      } finally {
        setLoading(false);
      }
    },
    [fetchRegistrations]
  );


  /*
   * ----------------------------------------
   * CLEAR ALL REGISTRATIONS
   * ----------------------------------------
   */

  const clearAll = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL, {
            method: "DELETE",
          });

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.error ||
              "Unable to clear registrations."
          );
        }

        setRegistrations({});

        return {
          success: true,
        };
      } catch (err) {
        console.error(
          "Clear registrations error:",
          err
        );

        setError(
          err.message ||
            "Unable to clear registrations."
        );

        return {
          success: false,
          error:
            err.message ||
            "Unable to clear registrations.",
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );


  /*
   * ----------------------------------------
   * SEAT COUNT
   * ----------------------------------------
   */

  const getSeatCount =
    useCallback(
      (gameId) => {
        const config =
          getGameConfig(gameId);

        const list =
          registrations[gameId] || [];

        return Math.min(
          list.filter(
            (entry) =>
              !entry.reserve
          ).length,

          config.groups *
            config.seatsPerGroup
        );
      },
      [registrations]
    );


  /*
   * ----------------------------------------
   * RESERVE COUNT
   * ----------------------------------------
   */

  const getReserveCount =
    useCallback(
      (gameId) => {
        const list =
          registrations[gameId] || [];

        return list.filter(
          (entry) =>
            entry.reserve
        ).length;
      },
      [registrations]
    );


  /*
   * ----------------------------------------
   * OPEN SEATS
   * ----------------------------------------
   */

  const getOpenSeats =
    useCallback(
      (gameId) => {
        const config =
          getGameConfig(gameId);

        return (
          config.groups *
            config.seatsPerGroup -
          getSeatCount(gameId)
        );
      },
      [getSeatCount]
    );


  /*
   * ----------------------------------------
   * IS FULL
   * ----------------------------------------
   */

  const isFull =
    useCallback(
      (gameId) => {
        const config =
          getGameConfig(gameId);

        return (
          getGameRegistrations(
            gameId
          ).length >=
          config.capacity
        );
      },
      [getGameRegistrations]
    );


  /*
   * ----------------------------------------
   * GAME CAPACITY
   * ----------------------------------------
   */

  const getGameCapacity =
    useCallback(
      (gameId) => {
        return getGameConfig(
          gameId
        ).capacity;
      },
      []
    );


  /*
   * ----------------------------------------
   * GAME GROUPS
   * ----------------------------------------
   */

  const getGameGroups =
    useCallback(
      (gameId) => {
        return getGameConfig(
          gameId
        ).groups;
      },
      []
    );


  /*
   * ----------------------------------------
   * SEATS PER GROUP
   * ----------------------------------------
   */

  const getSeatsPerGroup =
    useCallback(
      (gameId) => {
        return getGameConfig(
          gameId
        ).seatsPerGroup;
      },
      []
    );


  /*
   * ----------------------------------------
   * RESERVE CAPACITY
   * ----------------------------------------
   */

  const getReserveCapacity =
    useCallback(
      (gameId) => {
        return getGameConfig(
          gameId
        ).reserves;
      },
      []
    );


  /*
   * ----------------------------------------
   * RETURN
   * ----------------------------------------
   */

  return {
    registrations,
    loaded,
    loading,
    error,

    register,
    remove,
    clearAll,

    fetchRegistrations,

    getGameRegistrations,
    getSeatCount,
    getReserveCount,
    getOpenSeats,
    isFull,

    getGameCapacity,
    getGameGroups,
    getSeatsPerGroup,
    getReserveCapacity,

    seatsPerGame:
      DEFAULT_SEATS,

    capPerGame:
      DEFAULT_CAPACITY,

    maxGamesPerPerson,
  };
}

export default useRegistrations;