import { useState } from "react";
import { motion } from "framer-motion";

import "../styles/admin.css";

function AdminLogin({
  onLogin,
  onCancel,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const result = onLogin(username, password);

    if (!result?.success) {
      setError(
        result?.error || "Invalid Game Master credentials."
      );
    }
  };

  return (
    <motion.section
      className="ws-admin-login"
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <div className="ws-admin-login__card">
        <div className="ws-admin-login__eyebrow">
          Game Master
        </div>

        <h1>Admin access</h1>

        <p className="ws-admin-login__intro">
          Sign in to access the WestSyde registration
          board.
        </p>

        <form
          className="ws-admin-login__form"
          onSubmit={handleSubmit}
        >
          <div className="ws-admin-login__field">
            <label htmlFor="admin-username">
              Username
            </label>

            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
              autoComplete="username"
              placeholder="Game Master"
            />
          </div>

          <div className="ws-admin-login__field">
            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              autoComplete="current-password"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div
              className="ws-admin-login__error"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="ws-admin-login__submit"
          >
            Sign in
          </button>

          <button
            type="button"
            className="ws-admin-login__cancel"
            onClick={onCancel}
          >
            Back to website
          </button>
        </form>
      </div>
    </motion.section>
  );
}
// username: "GameMaster"
// password: "WestSyde2026"

export default AdminLogin;