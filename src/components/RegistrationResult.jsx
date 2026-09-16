function RegistrationResult({
  resultKicker,
  resultSeat,
  resultBody,
  closeModal,
}) {
  return (
    <div className="ws-registration-result">
      <div className="ws-registration-result__seat">
        <div className="ws-registration-result__kicker">
          {resultKicker}
        </div>

        <div className="ws-registration-result__number">
          {resultSeat}
        </div>
      </div>

      <p className="ws-registration-result__body">
        {resultBody}
      </p>

      <button
        type="button"
        className="ws-registration-result__button"
        onClick={closeModal}
      >
        Done
      </button>
    </div>
  );
}

export default RegistrationResult;