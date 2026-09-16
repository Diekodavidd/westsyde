import { motion } from "framer-motion";
import timeline from "../data/timeline";

function Story() {
  return (
    <section id="story" className="ws-story">
      <div className="ws-story__inner">
        <motion.div
          className="ws-story__heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h6>Our story</h6>

          <h2>One year, told in five moments</h2>
        </motion.div>

        <div className="ws-story__timeline">
          {timeline.map((item, index) => (
            <motion.div
              className="ws-story__item"
              key={item.when}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
            >
              <span className="ws-story__dot" />

              <div className="ws-story__when">{item.when}</div>

              <h4>{item.title}</h4>

              <p>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Story;