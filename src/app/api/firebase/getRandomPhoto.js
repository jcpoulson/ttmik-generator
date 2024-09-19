import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const getRandomPhoto = async () => {
  const docRef = doc(db, "photos", "app-photos");
  const docSnap = await getDoc(docRef);

  const photos = docSnap.data().photos;
  let randomPhoto = photos[Math.floor(Math.random() * photos.length)];
  return randomPhoto
}


const getAllPhotos = async () => {
  const docRef = doc(db, "photos", "app-photos");
  const docSnap = await getDoc(docRef);

  const photos = docSnap.data().photos;
  return photos
}


export {
  getRandomPhoto,
  getAllPhotos
}