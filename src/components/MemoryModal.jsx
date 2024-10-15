/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from 'react-modal';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const MemoryModal = ({ isOpen, onRequestClose, photo }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const photoRef = doc(db, 'memories', photo.id);
    
    await updateDoc(photoRef, {
      comments: arrayUnion(comment)
    });

    setComment('');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2 className="text-xl">{photo.description}</h2>
      <img src={photo.url} alt={photo.description} className="w-full h-auto rounded-lg" />
      
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input 
          type="text" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Deja un comentario" 
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="mt-2 bg-purple-600 text-white px-4 py-2 rounded">Enviar</button>
      </form>
      
      <button onClick={onRequestClose} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
        Cerrar
      </button>
    </Modal>
  );
};

export default MemoryModal;
