import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo, FiX } from "react-icons/fi";

function GameCard({
  game,
  registered = 0,
  reserves = 0,
  totalRegistered = 0,
  playerCapacity = 10,
  totalCapacity = 12,
  groups = 1,
  seatsPerGroup = 10,
  reserveCapacity = 2,
  onRegister,
  onRoster,
}) {
  const [showExplanation, setShowExplanation] =
    useState(false);

  const isFull =
    totalRegistered >= totalCapacity;

  const left = Math.max(
    playerCapacity - registered,
    0
  );

  const pct = Math.min(
    (totalRegistered / totalCapacity) * 100,
    100
  );

  const filledText =
    groups > 1
      ? `${registered} / ${playerCapacity} seats`
      : `${registered} / ${seatsPerGroup} seats`;

  const reserveText =
    reserves > 0
      ? `${reserves} / ${reserveCapacity} reserves`
      : `${reserveCapacity} reserves open`;

  const statusText =
    left > 0
      ? `${left} seats left`
      : reserves < reserveCapacity
        ? "Reserves only"
        : "Full";

  const cta = isFull
    ? "Panel locked"
    : left > 0
      ? "Register"
      : "Join reserves";

  const gameNumber = `Game ${String(
    game.no
  ).padStart(2, "0")}`;

  const note =
    game.id === "lov"
      ? "Seats and villa side assigned at registration."
      : "Full rules given by the Game Master before play.";

  return (
    <motion.div
      className="ws-game-card"
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.45,
        delay: (game.no - 1) * 0.05,
      }}
      whileHover={{
        y: -2,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <div className="ws-game-card__top">
        <span className="ws-game-card__number">
          {gameNumber}
        </span>

        {isFull ? (
          <span className="ws-game-card__status ws-game-card__status--full">
            Locked · full
          </span>
        ) : (
          <span className="ws-game-card__status">
            {statusText}
          </span>
        )}
      </div>

      <div className="ws-game-card__title-row">
        <h3 className="ws-game-card__title">
          {game.name}
        </h3>

        <button
          type="button"
          className={`ws-game-card__info ${
            showExplanation
              ? "ws-game-card__info--active"
              : ""
          }`}
          onClick={() =>
            setShowExplanation(
              (current) => !current
            )
          }
          aria-expanded={showExplanation}
          aria-label={`How ${game.name} works`}
        >
          {showExplanation ? (
            <FiX size={16} />
          ) : (
            <FiInfo size={16} />
          )}

          <span>
            {showExplanation
              ? "Close"
              : "How it works"}
          </span>
        </button>
      </div>

      <p className="ws-game-card__blurb">
        {game.blurb}
      </p>

      <AnimatePresence initial={false}>
        {showExplanation && (
          <motion.div
            className="ws-game-card__explanation"
            initial={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 16,
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <div className="ws-game-card__explanation-inner">
              <div className="ws-game-card__explanation-heading">
                <FiInfo size={14} />
                <span>
                  How it works
                </span>
              </div>

              <p>
                {game.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="ws-game-card__note">
        {note}
      </p>

      {groups > 1 && (
        <div className="ws-game-card__groups">
          <span>
            {groups} groups
          </span>

          <span>
            {seatsPerGroup} seats each
          </span>
        </div>
      )}

      <div className="ws-game-card__bottom">
        <div className="ws-game-card__numbers">
          <span>
            {filledText}
          </span>

          <span>
            {reserveText}
          </span>
        </div>

        <div className="ws-game-card__progress">
          <motion.div
            className="ws-game-card__progress-fill"
            initial={{
              width: 0,
            }}
            whileInView={{
              width: `${pct}%`,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          />
        </div>

        <div className="ws-game-card__actions">
          <button
            type="button"
            className="ws-game-card__register"
            onClick={() =>
              onRegister(game)
            }
          >
            {cta}
          </button>

          <button
            type="button"
            className="ws-game-card__panel"
            onClick={() =>
              onRoster(game)
            }
          >
            Panel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default GameCard;