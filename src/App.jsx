/* eslint-disable no-undef */
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Gallery from './components/Gallery';
import MemoryModal from './components/MemoryModal';
import ChronologicalLetter from './components/ChronologicalLetter';

const App = () => {
  const [currentStage, setCurrentStage] = useState('home');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStart = () => setCurrentStage('letter'); // Cambia a 'letter'

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCompleteLetter = () => {
    setCurrentStage('thankYou'); // O la etapa que desees después de la carta
  };

  return (
    <div className="min-h-screen">
      {currentStage === 'home' && <Home onStart={handleStart} />}
      {currentStage === 'letter' && (
        <ChronologicalLetter onComplete={handleCompleteLetter} />
      )}
      {currentStage === 'gallery' && (
        <>
          <Gallery photos={photos} onPhotoClick={handlePhotoClick} />
          {selectedPhoto && (
            <MemoryModal 
              isOpen={isModalOpen} 
              onRequestClose={() => setIsModalOpen(false)} 
              photo={selectedPhoto} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
