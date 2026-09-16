import { AnimatePresence, motion } from "framer-motion";
import "../styles/modal.css";

function RegistrationModal({
  open,
  kicker,
  title,
  blurb,
  onClose,
  children,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ws-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="ws-modal"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-modal-title"
          >
            <div className="ws-modal__header">
              <div>
                {kicker && (
                  <div className="ws-modal__kicker">
                    {kicker}
                  </div>
                )}

                <h2 id="registration-modal-title">
                  {title}
                </h2>
                <p>
                    
                </p>

                {blurb && (
                  <p className="ws-modal__blurb">
                    {blurb}
                  </p>
                )}
              </div>

              <button
                type="button"
                className="ws-modal__close"
                onClick={onClose}
                aria-label="Close registration"
              >
                ×
              </button>
            </div>

            <div className="ws-modal__body">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RegistrationModal;