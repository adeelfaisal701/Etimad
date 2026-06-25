// import heroImg from "../../assets/hero.jpg";

// function Hero() {
//   return (
//     <div style={{
//       display: "flex",
//       height: "450px"
//     }}>

//       {/* LEFT TEXT */}
      
//      <div style={{
//   width: "25%",
//   background: "#ffffff",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center"
// }}>

//   <div style={{
//     fontFamily: "'Pacifico', cursive",
//     fontSize: "40px",
//     color: "#22666B",
//     WebkitTextStroke: "1px black",
//     textAlign: "center",     // ✅ center text
//     lineHeight: "1.8"        // ✅ equal spacing
//   }}>
//     <div>from here</div>
//     <div>you can</div>
//     <div>grow</div>
//   </div>

// </div>

//       {/* RIGHT IMAGE */}
//       <div style={{ width: "75%" }}>
//         <img
//           src={heroImg}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover"   
//           }}
//         />
//       </div>

//     </div>
//   );
// }

// export default Hero;
import { useEffect, useState } from "react";
import heroImg from "../../assets/hero.jpg";
import heroImg2 from "../../assets/hero2.jpg";
import heroImg3 from "../../assets/hero3.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { title: ["from here", "you can", "grow"], image: heroImg },
  { title: ["secure", "shopping", "experience"], image: heroImg2 },
  { title: ["buy with", "complete", "confidence"], image: heroImg3 },
  { title: ["trusted", "escrow", "protection"], image: heroImg },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          height: 500px;
          overflow: hidden;
          background: white;
        }

        .hero-track {
          display: flex;
          height: 100%;
          transition: transform 700ms ease-in-out;
        }

        .hero-slide {
          display: flex;
          height: 100%;
          flex-shrink: 0;
        }

        /* TEXT PANEL */
        .hero-text-panel {
          width: 100%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 2;
        }

        .hero-title {
          font-family: 'Pacifico', cursive;
          color: #22666B;
          -webkit-text-stroke: 1px black;
          font-size: 2rem;
          text-align: center;
          line-height: 1.6;
        }

        /* IMAGE PANEL — hidden on mobile */
        .hero-image-panel {
          display: none;
          position: relative;
        }

        .hero-image-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.1);
        }

        /* Tablet: show image, split layout */
        @media (min-width: 768px) {
          .hero-text-panel {
            width: 25%;
          }

          .hero-image-panel {
            display: block;
            width: 75%;
          }

          .hero-title {
            font-size: 2.5rem;
          }
        }

        /* Mobile: taller section, larger text */
        @media (max-width: 480px) {
          .hero-section {
            height: 300px;
          }

          .hero-title {
            font-size: 1.6rem;
          }
        }

        /* Arrows */
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.9);
          border: none;
          border-radius: 50%;
          padding: 10px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10;
        }

        .hero-arrow:hover {
          background: white;
        }

        .hero-arrow-left  { left: 12px; }
        .hero-arrow-right { right: 12px; }

        @media (min-width: 768px) {
          .hero-arrow { padding: 12px; }
          .hero-arrow-left  { left: 16px; }
          .hero-arrow-right { right: 16px; }
        }

        /* Dots */
        .hero-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
        }

        .hero-dot {
          height: 10px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          background: rgba(255,255,255,0.8);
          width: 10px;
          padding: 0;
        }

        .hero-dot.active {
          width: 28px;
          background: #22666B;
        }

        @media (max-width: 480px) {
          .hero-dots { bottom: 12px; gap: 8px; }
          .hero-dot  { height: 8px; width: 8px; }
          .hero-dot.active { width: 22px; }
        }
      `}</style>

      <section className="hero-section">
        {/* Track */}
        <div
          className="hero-track"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="hero-slide"
              style={{ width: `${100 / slides.length}%` }}
            >
              {/* Text */}
              <div className="hero-text-panel">
                <div className="hero-title">
                  {slide.title.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="hero-image-panel">
                <img src={slide.image} alt={`Hero Slide ${index + 1}`} />
                <div className="hero-overlay" />
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button className="hero-arrow hero-arrow-left" onClick={prevSlide}>
          <ChevronLeft size={20} />
        </button>
        <button className="hero-arrow hero-arrow-right" onClick={nextSlide}>
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`hero-dot ${current === index ? "active" : ""}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Hero;