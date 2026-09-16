import { useCallback, useEffect, useState } from "react";

import { games } from "../data/games";

const STORAGE_KEY = "westsyde_regs_v1";

const DEFAULT_CAPACITY = 12;
const DEFAULT_SEATS = 10;
const DEFAULT_GROUPS = 1;
const DEFAULT_RESERVES = 2;
const DEFAULT_MAX_GAMES_PER_PERSON = 2;

function getGameConfig(gameId) {
  const game = games.find((item) => item.id === gameId);

  if (!game) {
    return {
      groups: DEFAULT_GROUPS,
      seatsPerGroup: DEFAULT_SEATS,
      reserves: DEFAULT_RESERVES,
      capacity: DEFAULT_CAPACITY,
    };
  }

  const groups = game.groups || DEFAULT_GROUPS;
  const seatsPerGroup = game.seatsPerGroup || DEFAULT_SEATS;
  const reserves =
    typeof game.reserves === "number"
      ? game.reserves
      : DEFAULT_RESERVES;

  return {
    groups,
    seatsPerGroup,
    reserves,
    capacity: groups * seatsPerGroup + reserves,
  };
}

function useRegistrations({
  maxGamesPerPerson = DEFAULT_MAX_GAMES_PER_PERSON,
} = {}) {
  const [registrations, setRegistrations] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        setRegistrations(JSON.parse(raw) || {});
      }
    } catch {
      setRegistrations({});
    } finally {
      setLoaded(true);
    }
  }, []);

  const saveRegistrations = useCallback((nextRegistrations) => {
    setRegistrations(nextRegistrations);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nextRegistrations)
      );
    } catch {
      // Keep the in-memory state even if localStorage fails.
    }
  }, []);

  const getGameRegistrations = useCallback(
    (gameId) => {
      return registrations[gameId] || [];
    },
    [registrations]
  );

  const register = useCallback(
    ({ gameId, name, gender }) => {
      const trimmedName = (name || "").trim();

      if (trimmedName.length < 2) {
        return {
          success: false,
          error: "Enter your Bigo name or ID.",
        };
      }

      if (!gender) {
        return {
          success: false,
          error: "Select your gender.",
        };
      }

      const config = getGameConfig(gameId);

      const nextRegistrations = JSON.parse(
        JSON.stringify(registrations || {})
      );

      const list = nextRegistrations[gameId] || [];

      /*
       * Total capacity:
       *
       * Normal game:
       * 1 × 10 seats + 2 reserves = 12
       *
       * Special game:
       * 2 × 10 seats + 2 reserves = 22
       */
      if (list.length >= config.capacity) {
        return {
          success: false,
          error: "This game is full. Try another one.",
        };
      }

      const key = trimmedName.toLowerCase();

      const alreadyOnPanel = list.some(
        (entry) => entry.name.toLowerCase() === key
      );

      if (alreadyOnPanel) {
        return {
          success: false,
          error: "You are already on this panel.",
        };
      }

      /*
       * Count how many different games this player
       * has already registered for.
       */
      const gameCount = Object.keys(nextRegistrations).filter(
        (id) =>
          (nextRegistrations[id] || []).some(
            (entry) => entry.name.toLowerCase() === key
          )
      ).length;

      if (gameCount >= maxGamesPerPerson) {
        return {
          success: false,
          error: `You already hold seats in ${maxGamesPerPerson} games — that is the limit.`,
        };
      }

      /*
       * ------------------------------------------------
       * GROUP ASSIGNMENT
       * ------------------------------------------------
       *
       * Special games:
       *
       * Group 1 → seats 1-10
       * Group 2 → seats 1-10
       * Reserves → R1-R2
       *
       * Players are automatically placed into the first
       * group with an available seat.
       */
      const regularPlayers = list.filter(
        (entry) => !entry.reserve
      );

      let group = null;
      let seat = null;
      let isReserve = false;

      /*
       * Find the first group that still has space.
       */
      for (
        let currentGroup = 1;
        currentGroup <= config.groups;
        currentGroup += 1
      ) {
        const groupPlayers = regularPlayers.filter(
          (entry) =>
            (entry.group || 1) === currentGroup
        );

        if (groupPlayers.length < config.seatsPerGroup) {
          const takenSeats = groupPlayers.map(
            (entry) => entry.seat
          );

          const freeSeats = [];

          for (
            let currentSeat = 1;
            currentSeat <= config.seatsPerGroup;
            currentSeat += 1
          ) {
            if (!takenSeats.includes(currentSeat)) {
              freeSeats.push(currentSeat);
            }
          }

          if (freeSeats.length > 0) {
            group = currentGroup;

            seat =
              freeSeats[
                Math.floor(
                  Math.random() * freeSeats.length
                )
              ];

            break;
          }
        }
      }

      /*
       * If every group is full, assign a reserve slot.
       */
      if (group === null) {
        isReserve = true;
        group = null;

        const reservePlayers = list.filter(
          (entry) => entry.reserve
        );

        seat = reservePlayers.length + 1;
      }

      const entry = {
        name: trimmedName,
        gender,
        group,
        seat,
        reserve: isReserve,
        ts: Date.now(),
      };

      nextRegistrations[gameId] = [...list, entry];

      saveRegistrations(nextRegistrations);

      return {
        success: true,
        entry,
      };
    },
    [
      registrations,
      maxGamesPerPerson,
      saveRegistrations,
    ]
  );

  const remove = useCallback(
    (gameId, timestamp) => {
      const nextRegistrations = JSON.parse(
        JSON.stringify(registrations || {})
      );

      nextRegistrations[gameId] = (
        nextRegistrations[gameId] || []
      ).filter((entry) => entry.ts !== timestamp);

      saveRegistrations(nextRegistrations);
    },
    [registrations, saveRegistrations]
  );

  const clearAll = useCallback(() => {
    saveRegistrations({});
  }, [saveRegistrations]);

  const getSeatCount = useCallback(
    (gameId) => {
      const config = getGameConfig(gameId);
      const list = registrations[gameId] || [];

      return Math.min(
        list.filter((entry) => !entry.reserve).length,
        config.groups * config.seatsPerGroup
      );
    },
    [registrations]
  );

  const getReserveCount = useCallback(
    (gameId) => {
      const list = registrations[gameId] || [];

      return list.filter((entry) => entry.reserve).length;
    },
    [registrations]
  );

  const getOpenSeats = useCallback(
    (gameId) => {
      const config = getGameConfig(gameId);

      return (
        config.groups * config.seatsPerGroup -
        getSeatCount(gameId)
      );
    },
    [getSeatCount]
  );

  const isFull = useCallback(
    (gameId) => {
      const config = getGameConfig(gameId);

      return (
        getGameRegistrations(gameId).length >=
        config.capacity
      );
    },
    [getGameRegistrations]
  );

  const getGameCapacity = useCallback((gameId) => {
    return getGameConfig(gameId).capacity;
  }, []);

  const getGameGroups = useCallback((gameId) => {
    return getGameConfig(gameId).groups;
  }, []);

  const getSeatsPerGroup = useCallback((gameId) => {
    return getGameConfig(gameId).seatsPerGroup;
  }, []);

  const getReserveCapacity = useCallback((gameId) => {
    return getGameConfig(gameId).reserves;
  }, []);

  return {
    registrations,
    loaded,

    register,
    remove,
    clearAll,

    getGameRegistrations,
    getSeatCount,
    getReserveCount,
    getOpenSeats,
    isFull,

    getGameCapacity,
    getGameGroups,
    getSeatsPerGroup,
    getReserveCapacity,

    seatsPerGame: DEFAULT_SEATS,
    capPerGame: DEFAULT_CAPACITY,
    maxGamesPerPerson,
  };
}

export default useRegistrations;