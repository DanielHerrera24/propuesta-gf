/* eslint-disable react/prop-types */
import Modal from "react-modal"; // Asegúrate de instalarlo si aún no lo tienes
import Swal from "sweetalert2";

const QuestionModal = ({
  isOpen,
  question,
  options,
  correctAnswer,
  onClose,
  onAnswer,
}) => {
  const handleAnswer = (answer) => {
    if (answer === correctAnswer) {
      Swal.fire({
        icon: "success",
        title: "¡Correcto! 🎉",
        text: "¡Muy bien, vamos a continuar!",
        confirmButtonText: "Continuemos ^^",
        confirmButtonColor: "#1dad2c",
      }).then((result) => {
        if (result.isConfirmed) {
          onAnswer(true); // Llama a onAnswer con true para avanzar
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Esa no, Manesita 🤭",
        text: "Inténtalo de nuevo :D",
        confirmButtonText: "Está bien",
        confirmButtonColor: "#2c94ea",
      });
      onAnswer(false); // Llama a onAnswer con false para manejar la respuesta incorrecta
    }
  };

  return (
    <Modal className="border-none bg-gradient-to-b from-purple-300 to-blue-300 h-full w-full" isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div className="flex flex-col items-center w-full h-full justify-center text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 font-poppins px-3">{question}</h2>
        <div className="flex flex-col">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="mb-2 bg-blue-500 text-white px-12 py-2 rounded-full"
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 text-black border border-black rounded-full"
        >
          Volver
        </button>
      </div>
    </Modal>
  );
};

export default QuestionModal;
