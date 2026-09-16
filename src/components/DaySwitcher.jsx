import { motion } from "framer-motion";

function DaySwitcher({ day, onChange }) {
  return (
    <div className="ws-day-switcher">
      <motion.button
        type="button"
        className={`ws-day-switcher__button ${
          day === 1 ? "is-active" : ""
        }`}
        onClick={() => onChange(1)}
        whileTap={{ scale: 0.98 }}
      >
        Day 1 · Sep 26
      </motion.button>

      <motion.button
        type="button"
        className={`ws-day-switcher__button ${
          day === 2 ? "is-active" : ""
        }`}
        onClick={() => onChange(2)}
        whileTap={{ scale: 0.98 }}
      >
        Day 2 · Sep 27
      </motion.button>
    </div>
  );
}

export default DaySwitcher;