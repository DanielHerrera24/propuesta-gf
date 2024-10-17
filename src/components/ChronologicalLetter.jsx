/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import QuestionModal from "./QuestionModal";
import Propuesta from "./Propuesta";
import "./propuesta.css";
import "./corazon.css";

const ChronologicalLetter = ({ onComplete }) => {
  const [moments, setMoments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentMoment, setCurrentMoment] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showPropuesta, setShowPropuesta] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const momentsCollection = collection(db, "memories");
      const momentsSnapshot = await getDocs(momentsCollection);
      const momentsList = momentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMoments(momentsList);

      const questionsCollection = collection(db, "questions");
      const questionsSnapshot = await getDocs(questionsCollection);
      const questionsList = questionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsList);
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAnswerCorrect(null);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      if (currentMoment === moments.length - 1) {
        // Si es la última pregunta, mostramos el mensaje final
        setIsLoading(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setIsLoading(false);
        }, 3000);
        setShowFinalMessage(true);
      } else {
        setIsLoading(true);
        setIsModalOpen(false);
        setTimeout(() => {
          setCurrentMoment(currentMoment + 1);
          setIsLoading(false);
          window.scrollTo({ top: 0, behavior: "instant" }); // Desplazarse a la parte superior
        }, 3000);
      }
    } else {
      setIsAnswerCorrect(true);
    }
  };

  const startPropuesta = () => {
    setShowPropuesta(true);
  };

  const closePropuesta = () => {
    setShowPropuesta(false);
  };

  return (
    <div className="bg-white p-2 mt-10 flex flex-col items-center text-left">
      {moments.length > 0 ? (
        <>
          {isLoading ? (
            <div className="corazon"></div>
          ) : (
            <>
              {!showFinalMessage ? (
                <>
                  <p className="text-lg pb-2">
                    {moments[currentMoment].description}
                  </p>
                  {moments[currentMoment].description2 && (
                    <p className="text-lg pb-2">
                      {moments[currentMoment].description2}
                    </p>
                  )}
                  {moments[currentMoment].description3 && (
                    <p className="text-lg pb-2">
                      {moments[currentMoment].description3}
                    </p>
                  )}
                  {moments[currentMoment].description4 && (
                    <p className="text-lg pb-2">
                      {moments[currentMoment].description4}
                    </p>
                  )}
                  {moments[currentMoment].urls &&
                    moments[currentMoment].urls.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {moments[currentMoment].urls.map((url, index) => (
                          <div
                            key={index}
                            className="w-full sm:w-80 h-auto my-0 flex flex-col items-center"
                          >
                            <img
                              src={url}
                              className="w-full h-auto rounded-lg mb-2"
                            />
                            {moments[currentMoment].descriptionImgs &&
                              moments[currentMoment].descriptionImgs[index] && (
                                <p className="text-center text-sm text-gray-700">
                                  {
                                    moments[currentMoment].descriptionImgs[
                                      index
                                    ]
                                  }
                                </p>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  <button
                    onClick={handleNext}
                    className="bg-green-600 text-white px-4 py-2 my-8 rounded"
                  >
                    Continuar
                  </button>

                  {/* Modal de pregunta */}
                  {questions.length > 0 && (
                    <QuestionModal
                      isOpen={isModalOpen}
                      question={questions[currentMoment]?.question}
                      options={questions[currentMoment]?.options}
                      correctAnswer={questions[currentMoment]?.correctAnswer}
                      onClose={handleCloseModal}
                      onAnswer={handleAnswer}
                    />
                  )}
                  {isAnswerCorrect === false && (
                    <p className="text-red-500">
                      Respuesta incorrecta. Intenta de nuevo.
                    </p>
                  )}
                </>
              ) : (
                !showPropuesta && (
                  <>
                    <p className="text-lg mb-2">
                      ¡Muy bien nenita :D! Has llegado hasta aquí respondiendo
                      correctamente a todas las preguntas ^^, pero queda una más
                      🫢.
                    </p>
                    <p className="text-lg mb-2">
                      ¿Estás lista para la última pregunta? :0
                    </p>
                    <p className="text-lg">
                      Al darle al botón se mostrará una cuenta regresiva de 10
                      segundos, te pediré que cierres tus ojos y yo te diré
                      cuando los abras, si? Tengo una sorpresa para ti🤭
                    </p>
                    <button
                      onClick={startPropuesta}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Pregunta final
                    </button>
                  </>
                )
              )}
              {showPropuesta && <Propuesta onClose={closePropuesta} />}
            </>
          )}
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ChronologicalLetter;
