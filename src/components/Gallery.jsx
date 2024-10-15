/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Gallery = ({ onPhotoClick }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photosCollection = collection(db, 'memories');
      const photosSnapshot = await getDocs(photosCollection);
      const photosList = photosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPhotos(photosList);
    };

    fetchPhotos();
  }, []);

  return (
    <div className="sm:grid sm:grid-cols-3 gap-4 p-4">
      {photos.map(photo => (
        <div key={photo.id} onClick={() => onPhotoClick(photo)} className="cursor-pointer transition-transform transform hover:scale-105">
          <img src={photo.url} alt={photo.description} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
