import { motion } from "framer-motion";
import "../styles/stats.css";

function StatsSet({ stats }) {
  return (
    <div className="ws-stats__set">
      {stats.map((stat, index) => (
        <div className="ws-stats__item" key={`${stat.label}-${index}`}>
          <motion.div
            className="ws-stats__value"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
            }}
          >
            {stat.value}
          </motion.div>

          <div className="ws-stats__label">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsBar({ seatsLeftTotal = 120 }) {
  const stats = [
    {
      value: "12",
      label: "Games",
    },
    {
      value: "2",
      label: "Nights",
    },
    {
      value: "10",
      label: "Seats per game",
    },
    {
      value: seatsLeftTotal,
      label: "Seats still open",
    },
  ];

  return (
    <section className="ws-stats">
      <div className="ws-stats__track">
        <StatsSet stats={stats} />
        <StatsSet stats={stats} />
      </div>
    </section>
  );
}

export default StatsBar;