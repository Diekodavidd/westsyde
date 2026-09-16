import { useMemo, useState } from "react";

import { games } from "../data/games";

import DaySwitcher from "./DaySwitcher";
import GameCard from "./GameCard";

import "../styles/games.css";

function Games({
  registrations = {},
  onRegister,
  onRoster,
}) {
  const [day, setDay] = useState(1);

  const visibleGames = useMemo(() => {
    return games.filter(
      (game) => game.day === day
    );
  }, [day]);

  const dayLabel =
    day === 1
      ? "Day 1 — Saturday 26 September"
      : "Day 2 — Sunday 27 September";

  return (
    <section
      id="games"
      className="ws-games"
    >
      <div className="ws-games__inner">
        <div className="ws-games__header">
          <div className="ws-games__intro">
            <h6>The Games</h6>

            <h2>
              Twelve games. Ten seats each.
            </h2>

            <p>
              Registration closes at ten
              players per game, then two
              reserve slots. Reserves play
              only if a seat opens at roll
              call. You may enter a maximum
              of two games across both nights.
            </p>
          </div>

          <DaySwitcher
            day={day}
            onChange={setDay}
          />
        </div>

        <div className="ws-games__day-label">
          <span>{dayLabel}</span>

          <span className="ws-games__day-line" />
        </div>

        <div className="ws-games__grid">
          {visibleGames.map((game) => {
            const list =
              registrations[game.id] || [];

            const groups =
              game.groups || 1;

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

            const registered =
              Math.min(
                list.filter(
                  (entry) =>
                    !entry.reserve
                ).length,
                playerCapacity
              );

            const reserves =
              list.filter(
                (entry) =>
                  entry.reserve
              ).length;

            return (
              <GameCard
                key={game.id}
                game={game}
                registered={registered}
                reserves={reserves}
                totalRegistered={list.length}
                playerCapacity={
                  playerCapacity
                }
                totalCapacity={
                  totalCapacity
                }
                groups={groups}
                seatsPerGroup={
                  seatsPerGroup
                }
                reserveCapacity={
                  reserveCapacity
                }
                onRegister={onRegister}
                onRoster={onRoster}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Games;