/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Home = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <h1 className="text-4xl mb-4">¡Hiii, Manesita :D!</h1>
      <p className="text-lg mx-4">
        Este es un regalito solo para ti🤭, espero te guste🤗.
      </p>
      <p className="text-lg mx-4">
        Antes de iniciar, quiero que sepas que me haces muy feliz y que no sé
        cómo agradecerte por todo lo que haz hecho por mi🫶.
      </p>
      <p className="text-lg mx-4">
        Es por eso que quiero demostrarte lo mucho que te quiero con este detallito❤️
      </p>
      {/* <h1 className="text-2xl">Bienvenida</h1> */}
      <button
        onClick={onStart}
        className="bg-white text-green-600 px-4 py-2 mt-4 rounded-lg shadow-lg hover:bg-gray-100"
      >
        Comenzar
      </button>
    </div>
  );
};

export default Home;
