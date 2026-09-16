import { motion } from "framer-motion";

function AdminGameCard({
  game,
  onRemove,
}) {
  const hasGroups = game.groups > 1;

  const groupedEntries =
    game.entries.reduce(
      (groups, entry) => {
        const key = entry.reserve
          ? "reserve"
          : entry.group || 1;

        if (!groups[key]) {
          groups[key] = [];
        }

        groups[key].push(entry);

        return groups;
      },
      {}
    );

  const renderEntry = (entry) => (
    <div
      className="ws-admin-game-card__entry"
      key={`${entry.ts}-${entry.seatLabel}`}
    >
      <span className="ws-admin-game-card__seat">
        {entry.seatLabel}
      </span>

      <span className="ws-admin-game-card__name">
        {entry.name}
      </span>

      <span className="ws-admin-game-card__gender">
        {entry.gender}
      </span>

      <button
        type="button"
        className="ws-admin-game-card__remove"
        onClick={() =>
          onRemove(
            game.id,
            entry.ts
          )
        }
        aria-label={`Remove ${entry.name}`}
      >
        ×
      </button>
    </div>
  );

  return (
    <motion.div
      className="ws-admin-game-card"
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <div className="ws-admin-game-card__header">
        <h4>{game.name}</h4>

        <span>
          {game.dayShort} ·{" "}
          {game.filledText}
        </span>
      </div>

      {game.entries.length > 0 ? (
        <div className="ws-admin-game-card__entries">
          {hasGroups ? (
            <>
              {Object.keys(
                groupedEntries
              )
                .filter(
                  (key) =>
                    key !== "reserve"
                )
                .sort(
                  (a, b) =>
                    Number(a) -
                    Number(b)
                )
                .map((group) => (
                  <div
                    className="ws-admin-game-card__group"
                    key={group}
                  >
                    <div className="ws-admin-game-card__group-heading">
                      <span>
                        Group {group}
                      </span>

                      <span>
                        {
                          groupedEntries[
                            group
                          ].length
                        }{" "}
                        / 10
                      </span>
                    </div>

                    {groupedEntries[
                      group
                    ].map(renderEntry)}
                  </div>
                ))}

              {groupedEntries.reserve && (
                <div className="ws-admin-game-card__group ws-admin-game-card__group--reserve">
                  <div className="ws-admin-game-card__group-heading">
                    <span>
                      Reserves
                    </span>

                    <span>
                      {
                        groupedEntries
                          .reserve
                          .length
                      }{" "}
                      / 2
                    </span>
                  </div>

                  {groupedEntries.reserve.map(
                    renderEntry
                  )}
                </div>
              )}
            </>
          ) : (
            game.entries.map(
              renderEntry
            )
          )}
        </div>
      ) : (
        <p className="ws-admin-game-card__empty">
          No registrations yet.
        </p>
      )}
    </motion.div>
  );
}

export default AdminGameCard;