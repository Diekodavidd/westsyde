import { motion } from "framer-motion";
import rules from "../data/rules";

function Rules() {
  return (
    <section id="rules" className="ws-rules">
      <div className="ws-rules__inner">
        <motion.div
          className="ws-rules__intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h6>Rules &amp; conduct</h6>

          <h2>Play hard. Stay family.</h2>

          <p>
            One seat, one player. What happens on the panel stays a game —
            we log off as the same family we logged on as.
          </p>
        </motion.div>

        <motion.div
          className="ws-rules__list"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {rules.map((rule) => (
            <div className="ws-rules__item" key={rule.no}>
              <span className="ws-rules__number">{rule.no}</span>

              <span className="ws-rules__text">{rule.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Rules;