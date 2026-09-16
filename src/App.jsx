import { useMemo, useState } from "react";

import "./styles/variables.css";
import "./styles/global.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Games from "./components/Games";
import GameFlow from "./components/GameFlow";
import Rules from "./components/Rules";
import Story from "./components/Story";
import Values from "./components/Values";
import Merch from "./components/Merch";
import JoinSection from "./components/JoinSection";
import Footer from "./components/Footer";

import RegistrationModal from "./components/RegistrationModal";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationResult from "./components/RegistrationResult";
import GameRoster from "./components/GameRoster";

import AdminLogin from "./components/AdminLogin";
import AdminBoard from "./components/AdminBoard";

import useCountdown from "./hooks/useCountdown";
import useRegistrations from "./hooks/useRegistrations";
import useAdminAuth from "./hooks/useAdminAuth";

import { games } from "./data/games";

function App() {
  const countdown = useCountdown();

  const {
    registrations,
    register,
    remove,
    clearAll,
  } = useRegistrations();

  const {
    isAdmin,
    login,
    logout,
  } = useAdminAuth();

  const [modalGame, setModalGame] = useState(null);
  const [modalMode, setModalMode] = useState("form");

  const [formName, setFormName] = useState("");
  const [formGender, setFormGender] = useState("");

  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [showAdmin, setShowAdmin] = useState(false);

  /*
   * ------------------------------------------
   * GAME CONFIG
   * ------------------------------------------
   */

  const getGameConfig = (game) => {
    const groups = game.groups || 1;

    const seatsPerGroup =
      game.seatsPerGroup || 10;

    const reserveCapacity =
      typeof game.reserves === "number"
        ? game.reserves
        : 2;

    const playerCapacity =
      groups * seatsPerGroup;

    const totalCapacity =
      playerCapacity +
      reserveCapacity;

    return {
      groups,
      seatsPerGroup,
      reserveCapacity,
      playerCapacity,
      totalCapacity,
    };
  };

  /*
   * ------------------------------------------
   * REGISTRATION
   * ------------------------------------------
   */

  const openRegistration = (game) => {
    const list =
      registrations[game.id] || [];

    const config =
      getGameConfig(game);

    const isFull =
      list.length >=
      config.totalCapacity;

    setModalGame(game);

    if (isFull) {
      setModalMode("roster");
      return;
    }

    setModalMode("form");
    setFormName("");
    setFormGender("");
    setError("");
    setResult(null);
  };

  const openRoster = (game) => {
    setModalGame(game);
    setModalMode("roster");
    setError("");
    setResult(null);
  };

  const closeModal = () => {
    setModalGame(null);
    setModalMode("form");
    setFormName("");
    setFormGender("");
    setError("");
    setResult(null);
  };

  const submitRegistration = async () => {
  if (!modalGame) {
    return;
  }

  const response = await register({
    gameId: modalGame.id,
    name: formName,
    gender: formGender,
  });

  if (!response.success) {
    setError(response.error);
    return;
  }

  setError("");
  setResult(response.entry);
  setModalMode("result");
};

  /*
   * ------------------------------------------
   * ROSTER
   * ------------------------------------------
   */

  const selectedList = modalGame
    ? registrations[modalGame.id] || []
    : [];

  const rosterSeats = [];

  if (modalGame) {
    const config =
      getGameConfig(modalGame);

    /*
     * Build each group separately.
     *
     * Normal game:
     * Group 1 → Seat 1-10
     *
     * Special game:
     * Group 1 → Seat 1-10
     * Group 2 → Seat 1-10
     */

    for (
      let group = 1;
      group <= config.groups;
      group += 1
    ) {
      for (
        let seat = 1;
        seat <= config.seatsPerGroup;
        seat += 1
      ) {
        const player =
          selectedList.find(
            (entry) =>
              !entry.reserve &&
              (entry.group || 1) ===
                group &&
              entry.seat === seat
          );

        rosterSeats.push({
          group,
          label: `Seat ${seat}`,
          name: player
            ? player.name
            : "— open —",
          gender: player
            ? player.gender
            : "",
        });
      }
    }

    /*
     * Reserves are not assigned to a group.
     */

    selectedList
      .filter(
        (entry) => entry.reserve
      )
      .forEach((entry) => {
        rosterSeats.push({
          group: "reserve",
          label: `Reserve ${entry.seat}`,
          name: entry.name,
          gender: entry.gender,
        });
      });
  }

  const modalGameConfig = modalGame
    ? getGameConfig(modalGame)
    : {
        groups: 1,
        seatsPerGroup: 10,
        reserveCapacity: 2,
        playerCapacity: 10,
        totalCapacity: 12,
      };

  const registeredCount = modalGame
    ? selectedList.filter(
        (entry) => !entry.reserve
      ).length
    : 0;

  const reserveCount = modalGame
    ? selectedList.filter(
        (entry) => entry.reserve
      ).length
    : 0;

  const modalHasGroups =
    modalGameConfig.groups > 1;

  const modalBlurb = modalGame
    ? registeredCount <
      modalGameConfig.playerCapacity
      ? modalHasGroups
        ? "Your group and seat number are drawn at random when you register. Bring them with you to the panel."
        : "Your seat number is drawn at random the moment you register. Bring it with you to the panel."
      : reserveCount <
          modalGameConfig.reserveCapacity
        ? `All ${modalGameConfig.playerCapacity} seats are taken. Register as a reserve and you play if someone misses roll call.`
        : "This panel is full."
    : "";

  /*
   * ------------------------------------------
   * ADMIN
   * ------------------------------------------
   */

  const openAdmin = () => {
    setShowAdmin(true);
  };

  const closeAdmin = () => {
    setShowAdmin(false);
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      logout();
      setShowAdmin(false);
      return;
    }

    setShowAdmin(true);
  };

  /*
   * Build the exact data required by
   * AdminBoard / AdminGameCard.
   */

  const adminGames = useMemo(() => {
    return games.map((game) => {
      const list =
        registrations[game.id] || [];

      const config =
        getGameConfig(game);

      const entries = [...list]
        .sort((a, b) => {
          /*
           * Reserves always come after players.
           */
          if (
            a.reserve !== b.reserve
          ) {
            return a.reserve
              ? 1
              : -1;
          }

          /*
           * For grouped games,
           * sort by group first.
           */
          if (
            !a.reserve &&
            !b.reserve &&
            (a.group || 1) !==
              (b.group || 1)
          ) {
            return (
              (a.group || 1) -
              (b.group || 1)
            );
          }

          return a.seat - b.seat;
        })
        .map((entry) => ({
          ...entry,

          seatLabel: entry.reserve
            ? `R${entry.seat}`
            : `S${entry.seat}`,
        }));

      const filled = list.filter(
        (entry) => !entry.reserve
      ).length;

      return {
        ...game,

        entries,

        groups: config.groups,

        seatsPerGroup:
          config.seatsPerGroup,

        reserveCapacity:
          config.reserveCapacity,

        playerCapacity:
          config.playerCapacity,

        totalCapacity:
          config.totalCapacity,

        filledText:
          config.groups > 1
            ? `${filled}/${config.playerCapacity}`
            : `${filled}/${config.seatsPerGroup}`,

        dayShort:
          game.day === 1
            ? "Day 1"
            : "Day 2",
      };
    });
  }, [registrations]);

  const totalRegistrations =
    useMemo(() => {
      return Object.values(
        registrations
      ).reduce(
        (total, list) =>
          total + list.length,
        0
      );
    }, [registrations]);

  const adminSummary = `${totalRegistrations} total registration${
    totalRegistrations === 1
      ? ""
      : "s"
  } across 12 games.`;

  /*
   * ------------------------------------------
   * COPY EVERY REGISTRATION
   * ------------------------------------------
   */

  const handleCopyAll = async () => {
    const lines = [];

    games.forEach((game) => {
      const list =
        registrations[game.id] || [];

      const config =
        getGameConfig(game);

      lines.push(game.name);

      lines.push(
        `Day ${game.day} · ${list.length}/${config.totalCapacity} registered`
      );

      if (!list.length) {
        lines.push(
          "No registrations yet."
        );
      } else {
        const sortedList = [...list].sort(
          (a, b) => {
            /*
             * Reserves after players.
             */
            if (
              a.reserve !== b.reserve
            ) {
              return a.reserve
                ? 1
                : -1;
            }

            /*
             * Groups first.
             */
            if (
              !a.reserve &&
              !b.reserve &&
              (a.group || 1) !==
                (b.group || 1)
            ) {
              return (
                (a.group || 1) -
                (b.group || 1)
              );
            }

            return a.seat - b.seat;
          }
        );

        sortedList.forEach(
          (entry) => {
            let label;

            if (entry.reserve) {
              label = `Reserve ${entry.seat}`;
            } else if (
              config.groups > 1
            ) {
              label = `Group ${entry.group} · Seat ${entry.seat}`;
            } else {
              label = `Seat ${entry.seat}`;
            }

            lines.push(
              `${label} — ${entry.name} — ${entry.gender}`
            );
          }
        );
      }

      lines.push("");
    });

    const text =
      lines.join("\n");

    try {
      await navigator.clipboard.writeText(
        text
      );

      alert(
        "Registration list copied."
      );
    } catch {
      alert(
        "Unable to copy the registration list."
      );
    }
  };

  /*
   * ------------------------------------------
   * CLEAR EVERY REGISTRATION
   * ------------------------------------------
   */

  const handleResetAll = () => {
    const confirmed =
      window.confirm(
        "Clear all WestSyde registrations? This cannot be undone."
      );

    if (!confirmed) {
      return;
    }

    clearAll();
  };

  /*
   * ------------------------------------------
   * REMOVE ONE REGISTRATION
   * ------------------------------------------
   */

  const handleRemove = (
    gameId,
    timestamp
  ) => {
    remove(
      gameId,
      timestamp
    );
  };

  /*
   * ------------------------------------------
   * RENDER ADMIN
   * ------------------------------------------
   */

  if (showAdmin) {
    return (
      <>
        <Navbar
          onAdminToggle={
            handleAdminToggle
          }
          adminLabel={
            isAdmin
              ? "Log out"
              : "Game Master"
          }
          isAdmin={isAdmin}
        />

        <main>
          {isAdmin ? (
            <AdminBoard
              games={adminGames}
              summary={adminSummary}
              onCopyAll={
                handleCopyAll
              }
              onResetAll={
                handleResetAll
              }
              onRemove={
                handleRemove
              }
            />
          ) : (
            <AdminLogin
              onLogin={login}
              onCancel={
                closeAdmin
              }
            />
          )}
        </main>
      </>
    );
  }

  /*
   * ------------------------------------------
   * PUBLIC WEBSITE
   * ------------------------------------------
   */

  return (
    <>
      <Navbar
        onAdminToggle={
          handleAdminToggle
        }
        adminLabel="Game Master"
        isAdmin={isAdmin}
      />

      <main>
        <Hero {...countdown} />

        <StatsBar />

        <Games
          registrations={
            registrations
          }
          onRegister={
            openRegistration
          }
          onRoster={
            openRoster
          }
        />

        <GameFlow />

        <Rules />

        <Story />

        <Values />

        <Merch />

        <JoinSection />

        <Footer />
      </main>

      <RegistrationModal
        open={!!modalGame}
        kicker={
          modalGame
            ? `Day ${
                modalGame.day
              } · ${
                modalGame.day === 1
                  ? "26 September"
                  : "27 September"
              }`
            : ""
        }
        title={
          modalGame?.name || ""
        }
        blurb={modalBlurb}
        onClose={
          closeModal
        }
      >
        {modalMode === "form" && (
  <RegistrationForm
    formName={formName}
    maleLabel={
      formGender === "Male"
        ? "✓ Male"
        : "Male"
    }
    femaleLabel={
      formGender === "Female"
        ? "✓ Female"
        : "Female"
    }
    onNameChange={(event) => {
      setFormName(event.target.value);
      setError("");
    }}
    pickMale={() => {
      setFormGender("Male");
      setError("");
    }}
    pickFemale={() => {
      setFormGender("Female");
      setError("");
    }}
    submitReg={submitRegistration}
    hasError={!!error}
    errorText={error}
    isReserveMode={
      registeredCount >=
        modalGameConfig.playerCapacity &&
      reserveCount <
        modalGameConfig.reserveCapacity
    }
    isGameFull={
      registeredCount >=
        modalGameConfig.playerCapacity &&
      reserveCount >=
        modalGameConfig.reserveCapacity
    }
  />
)}

        {modalMode === "result" &&
          result && (
            <RegistrationResult
              resultKicker={
                result.reserve
                  ? "You are a reserve"
                  : modalHasGroups
                    ? `Group ${result.group} · Your seat`
                    : "Your seat"
              }
              resultSeat={
                result.reserve
                  ? `R${result.seat}`
                  : result.seat
              }
              resultBody={
                result.reserve
                  ? `${result.name}, you are reserve ${result.seat}. Stay on the panel at roll call — if a seat opens it is yours.`
                  : modalHasGroups
                    ? `${result.name}, you are in Group ${result.group}, seat ${result.seat}. Be on the panel when the Game Master calls the game.`
                    : `${result.name}, seat ${result.seat} is yours. Be on the panel when the Game Master calls the game.`
              }
              closeModal={
                closeModal
              }
            />
          )}

        {modalMode ===
          "roster" && (
          <GameRoster
            rosterSummary={
              modalGameConfig.groups > 1
                ? `${registeredCount} / ${modalGameConfig.playerCapacity} seats filled · ${
                    reserveCount > 0
                      ? `${reserveCount} / ${modalGameConfig.reserveCapacity} reserves`
                      : `${modalGameConfig.reserveCapacity} reserves open`
                  }`
                : `${registeredCount} / ${modalGameConfig.seatsPerGroup} seats filled · ${
                    reserveCount > 0
                      ? `${reserveCount} / ${modalGameConfig.reserveCapacity} reserves`
                      : `${modalGameConfig.reserveCapacity} reserves open`
                  }`
            }
            rosterSeats={
              rosterSeats
            }
            closeModal={
              closeModal
            }
          />
        )}
      </RegistrationModal>
    </>
  );
}

export default App;