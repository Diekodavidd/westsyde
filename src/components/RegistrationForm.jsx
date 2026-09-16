import { motion } from "framer-motion";

function RegistrationForm({
  formName = "",
  maleLabel,
  femaleLabel,
  onNameChange,
  pickMale,
  pickFemale,
  submitReg,
  hasError,
  errorText,
}) {
  return (
    <form
      className="ws-registration-form"
      onSubmit={(event) => {
        event.preventDefault();
        submitReg();
      }}
    >
      <div className="ws-form-field">
        <label htmlFor="westsyde-player-name">
          Bigo name or ID
        </label>

        <input
          id="westsyde-player-name"
          type="text"
          value={formName}
          onChange={onNameChange}
          placeholder="Enter your Bigo name or ID"
          autoComplete="off"
        />
      </div>

      <div className="ws-form-field">
        <label>Gender</label>

        <div className="ws-gender-options">
          <motion.button
            type="button"
            className="ws-gender-button"
            whileTap={{ scale: 0.98 }}
            onClick={pickMale}
          >
            {maleLabel}
          </motion.button>

          <motion.button
            type="button"
            className="ws-gender-button"
            whileTap={{ scale: 0.98 }}
            onClick={pickFemale}
          >
            {femaleLabel}
          </motion.button>
        </div>
      </div>

      {hasError && (
        <div
          className="ws-form-error"
          role="alert"
        >
          {errorText}
        </div>
      )}

      <button
        type="submit"
        className="ws-registration-submit"
      >
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;