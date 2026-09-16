import { motion } from "framer-motion";
import "../styles/hero.css";

function Hero({
  showCountdown,
  cdDays,
  cdHours,
  cdMins,
  cdSecs,
}) {
  return (
    <section className="ws-hero">
      <div className="ws-hero__inner">
        <motion.div
          className="ws-hero__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Date */}
          <div className="ws-hero__eyebrow">
            <span className="ws-hero__eyebrow-line" />
            <span>26 &amp; 27 September 2026</span>
          </div>

          {/* Heading */}
          <h1 className="ws-hero__title">
            One year of
            <br />
            <span>WestSyde</span>
          </h1>

          {/* Description */}
          <p className="ws-hero__description">
            Twelve games. Two nights. One family. Our first anniversary is
            played out live on the family head&apos;s panel — six games on Day
            1, six on Day 2, ten seats in every game.
          </p>

          <p className="ws-hero__subtext">
            Start time announced on the family panel.
          </p>

          {/* Countdown */}
          {showCountdown && (
            <motion.div
              className="ws-hero__countdown"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.25,
              }}
            >
              <div className="ws-countdown-box">
                <div className="ws-countdown-value">{cdDays}</div>
                <div className="ws-countdown-label">Days</div>
              </div>

              <div className="ws-countdown-box">
                <div className="ws-countdown-value">{cdHours}</div>
                <div className="ws-countdown-label">Hours</div>
              </div>

              <div className="ws-countdown-box">
                <div className="ws-countdown-value">{cdMins}</div>
                <div className="ws-countdown-label">Minutes</div>
              </div>

              <div className="ws-countdown-box">
                <div className="ws-countdown-value ws-countdown-value--seconds">
                  {cdSecs}
                </div>
                <div className="ws-countdown-label">Seconds</div>
              </div>
            </motion.div>
          )}

          {/* Buttons */}
          <div className="ws-hero__actions">
            <motion.a
              href="#games"
              className="ws-hero__button ws-hero__button--primary"
              whileTap={{ scale: 0.98 }}
            >
              Claim a seat
            </motion.a>

            <motion.a
              href="#flow"
              className="ws-hero__button ws-hero__button--secondary"
              whileTap={{ scale: 0.98 }}
            >
              How game day runs
            </motion.a>
          </div>
        </motion.div>

        {/* Crest */}
        <motion.div
          className="ws-hero__visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="ws-hero__crest-wrap">
            <div className="ws-hero__glow" />

            <img
              className="lighten ws-hero__crest"
              src="https://res.cloudinary.com/zy7u4nqi/image/upload/v1789511694/WhatsApp_Image_2026-09-15_at_22.40.05_crprfu.jpg"
              alt="WestSyde gold dragon crest"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;