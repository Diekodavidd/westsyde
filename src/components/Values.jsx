import { motion } from "framer-motion";
import values from "../data/values";

function Values() {
  return (
    <section id="values" className="ws-values">
      <div className="ws-values__inner">
        <motion.div
          className="ws-values__heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h6>What the name carries</h6>

            <h2>W · E · S · T · S · Y · D · E</h2>
          </div>

          <p>
            There is no “I” in WestSyde. There is a Y — and the Y stands for
            YOU.
          </p>
        </motion.div>

        <div className="ws-values__grid">
          {values.map((value, index) => (
            <motion.div
              className="ws-values__card"
              key={`${value.letter}-${value.word}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
              }}
            >
              <div className="ws-values__letter">{value.letter}</div>

              <div className="ws-values__word">{value.word}</div>

              <p>{value.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Values;