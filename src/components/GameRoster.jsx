function GameRoster({
  rosterSummary,
  rosterSeats,
  closeModal,
}) {
  const groupedSeats = rosterSeats.reduce(
    (groups, seat) => {
      const groupKey =
        seat.group || "single";

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }

      groups[groupKey].push(seat);

      return groups;
    },
    {}
  );

  const groupKeys =
    Object.keys(groupedSeats);

  const hasGroups =
    groupKeys.some(
      (key) => key !== "single"
    );

  return (
    <div className="ws-game-roster">
      <p className="ws-game-roster__summary">
        {rosterSummary}
      </p>

      <div className="ws-game-roster__list">
        {hasGroups ? (
          <>
            {groupKeys
              .filter(
                (key) => key !== "reserve"
              )
              .map((groupKey) => (
                <div
                  className="ws-game-roster__group"
                  key={groupKey}
                >
                  <div className="ws-game-roster__group-heading">
                    <span>
                      Group {groupKey}
                    </span>
<br />
                    <span>
                      {
                        groupedSeats[
                          groupKey
                        ].filter(
                          (seat) =>
                            seat.name !==
                            "— open —"
                        ).length
                      } / 10
                    </span>
                  </div>

                  {groupedSeats[
                    groupKey
                  ].map((seat) => (
                    <div
                      className="ws-game-roster__row"
                      key={`${seat.group}-${seat.label}-${seat.name}`}
                    >
                      <span className="ws-game-roster__label">
                        {seat.label}
                      </span>

                      <span className="ws-game-roster__name">
                        {seat.name}
                      </span>

                      <span className="ws-game-roster__gender">
                        {seat.gender}
                      </span>
                    </div>
                  ))}
                </div>
              ))}

            {groupedSeats.reserve && (
              <div className="ws-game-roster__group ws-game-roster__group--reserve">
                <div className="ws-game-roster__group-heading">
                  <span>
                    Reserves
                  </span>

                  <span>
                    {
                      groupedSeats.reserve.filter(
                        (seat) =>
                          seat.name !==
                          "— open —"
                      ).length
                    } / 2
                  </span>
                </div>

                {groupedSeats.reserve.map(
                  (seat) => (
                    <div
                      className="ws-game-roster__row"
                      key={`${seat.label}-${seat.name}`}
                    >
                      <span className="ws-game-roster__label">
                        {seat.label}
                      </span>

                      <span className="ws-game-roster__name">
                        {seat.name}
                      </span>

                      <span className="ws-game-roster__gender">
                        {seat.gender}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        ) : (
          <div>
            {rosterSeats.map(
              (seat) => (
                <div
                  className="ws-game-roster__row"
                  key={`${seat.label}-${seat.name}`}
                >
                  <span className="ws-game-roster__label">
                    {seat.label}
                  </span>

                  <span className="ws-game-roster__name">
                    {seat.name}
                  </span>

                  <span className="ws-game-roster__gender">
                    {seat.gender}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        className="ws-game-roster__close"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  );
}

export default GameRoster;