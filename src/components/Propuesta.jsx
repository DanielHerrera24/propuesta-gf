import { useEffect, useState } from "react";

const Propuesta = () => {
  const [countdown, setCountdown] = useState(10);
  const [showProposal, setShowProposal] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [buttonSize, setButtonSize] = useState(1); // Tamaño inicial del botón
  const [buttonOffset, setButtonOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowProposal(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Limpia el intervalo al desmontar
  }, []);

  useEffect(() => {
    if (showProposal) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [showProposal]);

  const handleNoClick = () => {
    setButtonSize((prevSize) => prevSize + 0.2);
    setButtonOffset((prevOffset) => prevOffset + 0.8);
  };

  return (
    <div className="flex flex-col items-center mt-10 text-center">
      {thanks ? (
        <h2 className="text-4xl font-bold text-green-600 mt-4">GRACIAS</h2>
      ) : (
        <>
          {showProposal ? (
            <div className="relative">
              <div className="animate-proposal text-4xl font-bold text-red-600 mt-4">
                ¿Te gustaría ser mi novia?
              </div>
              {/* <span className="absolute -bottom-4 -right-20 text-[10px] text-red-600">
                (oficialmente)
              </span> */}
            </div>
          ) : (
            <div className="text-3xl font-bold mt-4">{countdown}</div>
          )}
          {showButtons && (
            <div className="mt-4">
              <button
                onClick={() => setThanks(true)} // Cambia a true al hacer clic en "Sí"
                style={{
                  transform: `scale(${buttonSize}) translateY(${buttonOffset}px)`, // Aumenta tamaño y desplaza hacia abajo
                }}
                className="bg-green-600 text-white px-4 py-2 rounded mx-2"
              >
                Sí
              </button>
              <button
                onClick={handleNoClick}
                className="bg-red-600 text-white px-4 py-2 rounded mx-2"
              >
                No
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Propuesta;
