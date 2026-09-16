import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

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
  const [menuOpen, setMenuOpen] =
    useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleAdminClick = () => {
    closeMenu();
    onAdminToggle();
  };

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
          onClick={closeMenu}
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

        {/* Desktop navigation */}
        <nav
          className="ws-navbar__nav ws-navbar__nav--desktop"
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

        {/* Mobile menu button */}
        <button
          type="button"
          className="ws-navbar__menu-button"
          onClick={() =>
            setMenuOpen(
              (current) => !current
            )
          }
          aria-label={
            menuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <FiX size={20} />
          ) : (
            <FiMenu size={20} />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="ws-navbar__mobile-menu"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
          >
            <nav
              className="ws-navbar__mobile-nav"
              aria-label="Mobile navigation"
            >
              {navItems.map(
                (item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="ws-navbar__mobile-link"
                    onClick={closeMenu}
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.04,
                    }}
                  >
                    {item.label}
                  </motion.a>
                )
              )}

              <button
                type="button"
                className="ws-navbar__mobile-admin"
                onClick={
                  handleAdminClick
                }
              >
                {isAdmin ? (
                  <FiLogOut size={14} />
                ) : (
                  <FiSettings size={14} />
                )}

                <span>
                  {adminLabel}
                </span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;