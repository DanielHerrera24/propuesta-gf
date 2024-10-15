/* eslint-disable react/prop-types */
import { useState } from "react";

const InteractiveLetter = ({ onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    "Querida Manely,",
    "Cada momento a tu lado es un regalo. Recuerdo nuestro primer encuentro...",
    "Esa vez que fuimos a [lugar especial] y nos reímos tanto...",
    "Y todas las noches de películas que hemos compartido...",
    "Quiero seguir creando recuerdos contigo.",
    "¿Te gustaría ser mi novia?",
    "❤️",
  ];

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete(); // Llama a la función para manejar la finalización
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-lg mb-4">{sections[currentSection]}</p>
      <button
        onClick={handleNextSection}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
      >
        {currentSection < sections.length - 1 ? "Siguiente" : "Finalizar"}
      </button>
    </div>
  );
};

export default InteractiveLetter;
