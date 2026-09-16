import { motion } from "framer-motion";
import { flowSteps } from "../data/flow";
import "../styles/sections.css";

function GameFlow() {
  return (
    <section
      id="flow"
      className="ws-flow"
    >
      <div className="ws-flow__inner">
        <motion.div
          className="ws-flow__heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <h6>Game day</h6>

          <h2>How every game runs</h2>

          <p>
            The order set by our founder. Every game on both
            nights follows it, start to finish.
          </p>
        </motion.div>

        <div className="ws-flow__grid">
          {flowSteps.map((step, index) => (
            <motion.div
              className="ws-flow__card"
              key={step.no}
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
                delay: index * 0.045,
              }}
            >
              <div className="ws-flow__number">
                {step.no}
              </div>

              <h4>{step.title}</h4>

              <p>{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="ws-flow__lock"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <span className="ws-flow__lock-title">
            Game Master: “Lock in”
          </span>

          <span className="ws-flow__lock-text">
            After the call there are no rule changes, no
            re-explanations and no late entries. Questions
            belong in the demo round.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default GameFlow;