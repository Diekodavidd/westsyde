import { motion } from "framer-motion";
import { FiSettings, FiLogOut } from "react-icons/fi";

import "../styles/navbar.css";

const navItems = [
  { label: "Games", href: "#games" },
  { label: "Game day", href: "#flow" },
  { label: "Family", href: "#story" },
  { label: "Merch", href: "#merch" },
];

function Navbar({
  onAdminToggle,
  adminLabel = "Game Master",
  isAdmin = false,
}) {
  return (
    <motion.header
      className="ws-navbar"
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
    >
      <div className="ws-navbar__inner">
        <a
          href="#"
          className="ws-navbar__brand"
        >
          <img
            src="https://res.cloudinary.com/zy7u4nqi/image/upload/v1789511694/WhatsApp_Image_2026-09-15_at_22.40.05_crprfu.jpg"
            alt="WestSyde"
            className="ws-navbar__logo"
          />

          <div className="ws-navbar__brand-text">
            <span className="ws-navbar__name">
              WESTSYDE
            </span>

            <span className="ws-navbar__subtitle">
              ANNIVERSARY GAMES
            </span>
          </div>
        </a>

        <div className="ws-navbar__spacer" />

        <nav
          className="ws-navbar__nav"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="ws-navbar__link"
              whileHover={{
                y: -1,
              }}
              transition={{
                duration: 0.15,
              }}
            >
              {item.label}
            </motion.a>
          ))}

          <motion.button
            type="button"
            className="ws-navbar__admin"
            onClick={onAdminToggle}
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            {isAdmin ? (
              <FiLogOut size={13} />
            ) : (
              <FiSettings size={13} />
            )}

            <span>{adminLabel}</span>
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;