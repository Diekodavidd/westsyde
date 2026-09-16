import { motion } from "framer-motion";
import "../styles/sections.css";

function Merch() {
  const merchItems = [
    {
      image: "https://res.cloudinary.com/zy7u4nqi/image/upload/v1789513649/WhatsApp_Image_2026-09-15_at_22.40.03_1_i0qfvp.jpg",
      alt: "Stag emblem",
    },
    {
      image: "https://res.cloudinary.com/zy7u4nqi/image/upload/v1789513649/WhatsApp_Image_2026-09-15_at_22.40.03_2_l8xmmg.jpg",
      alt: "Stag hoodie",
    },
    {
      image: "https://res.cloudinary.com/zy7u4nqi/image/upload/v1789513651/WhatsApp_Image_2026-09-15_at_22.40.04_4_mouskm.jpg",
      alt: "Stag crop tees",
    },
    {
      image: "https://res.cloudinary.com/zy7u4nqi/image/upload/v1789513651/WhatsApp_Image_2026-09-15_at_22.40.04_3_mwwfyb.jpg",
      alt: "Crest crop collection",
    },
     {
      image: "https://res.cloudinary.com/zy7u4nqi/image/upload/v1789513650/WhatsApp_Image_2026-09-15_at_22.40.04_2_gegn2g.jpg",
      alt: "Stag polo tees",
    },
  ];

  return (
    <section id="merch" className="ws-merch">
      <div className="ws-merch__inner">
        <motion.div
          className="ws-merch__heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h6>Celebration merch</h6>

            <h2>The stag</h2>

            <p>
              A one-year emblem, not a logo — drawn only for the anniversary
              drop. The crest stays the crest.
            </p>
          </div>
        </motion.div>

        <div className="ws-merch__grid">
          {merchItems.map((item, index) => (
            <motion.div
              className="ws-merch__card"
              key={item.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
            >
              <img
                className="lighten"
                src={item.image}
                alt={item.alt}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Merch;