import "../styles/sections.css";

function JoinSection() {
  return (
    <section id="join" className="ws-join">
      <div className="ws-join__inner">
        <div className="ws-join__content">
          <div className="ws-join__eyebrow">
            <img
              src="https://res.cloudinary.com/zy7u4nqi/image/upload/v1789514035/hh_e5otfm.png"
              alt="WestSyde splash"
            />

            <span>
              Every member carries it
            </span>
          </div>

          <h2>Once WestSyde, always WestSyde.</h2>

          <p>
            Questions about a game, a seat or the panel go to the Game Master
            in the family group. Reserves, keep your phone close on the night —
            seats open fast at roll call.
          </p>

          <a href="#games" className="ws-join__button">
            Register for a game
          </a>
        </div>

        <div className="ws-join__image">
          <img
            className="lighten"
            src="https://res.cloudinary.com/zy7u4nqi/image/upload/v1789511693/WhatsApp_Image_2026-09-15_at_22.40.02_euqmve.jpg"
            alt="PinkSyde of WestSyde"
          />
        </div>
      </div>
    </section>
  );
}

export default JoinSection;