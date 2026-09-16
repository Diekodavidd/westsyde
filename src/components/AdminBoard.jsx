import { motion } from "framer-motion";

import AdminGameCard from "./AdminGameCard";

import "../styles/admin.css";

function AdminBoard({
  games = [],
  summary = "",
  copyLabel = "Copy full list",
  resetLabel = "Clear all registrations",
  onCopyAll,
  onResetAll,
  onRemove,
}) {
  return (
    <motion.section
      className="ws-admin"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <div className="ws-admin__inner">
        <div className="ws-admin__heading">
          <h6>Game Master</h6>

          <h2>Registration board</h2>

          <p>{summary}</p>
        </div>

        <div className="ws-admin__actions">
          <button
            type="button"
            className="ws-admin__copy"
            onClick={onCopyAll}
          >
            {copyLabel}
          </button>

          <button
            type="button"
            className="ws-admin__reset"
            onClick={onResetAll}
          >
            {resetLabel}
          </button>
        </div>

        <div className="ws-admin__grid">
          {games.map((game) => (
            <AdminGameCard
              key={game.id}
              game={game}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default AdminBoard;