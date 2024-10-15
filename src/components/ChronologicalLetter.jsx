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
    <div className="bg-white p-2 mt-10 flex flex-col items-center">
      {moments.length > 0 ? (
        <>
          {isLoading ? (
            <div className="corazon"></div>
          ) : (
            <>
              {!showFinalMessage ? (
                <>
                <p className="text-lg">
                    {moments[currentMoment].texto}
                  </p>
                  {/* <p className="text-lg">
                    {moments[currentMoment].description}
                  </p>
                  {moments[currentMoment].description2 && (
                    <p className="text-lg">
                      {moments[currentMoment].description2}
                    </p>
                  )}
                  {moments[currentMoment].description3 && (
                    <p className="text-lg">
                      {moments[currentMoment].description3}
                    </p>
                  )}
                  {moments[currentMoment].description4 && (
                    <p className="text-lg">
                      {moments[currentMoment].description4}
                    </p>
                  )} */}
                  {moments[currentMoment].url && (
                    <img
                      src={moments[currentMoment].url}
                      alt="Moment"
                      className="w-full sm:w-80 h-auto rounded-lg my-4"
                    />
                  )}
                  <button
                    onClick={handleNext}
                    className="bg-green-600 text-white px-4 py-2 rounded"
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
                    {/* <p className="text-lg mb-2">
                      ¡Muy bien nenita :D! Has llegado hasta aquí respondiendo
                      correctamente a todas las preguntas ^^, pero queda una más
                      🫢.
                    </p> */}
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
        <p>Cargando regalito...❤️</p>
      )}
    </div>
  );
};

export default ChronologicalLetter;
