import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const getOtherPhoto = async () => {
  const docRef = doc(db, "photos", "other-photos");
  const docSnap = await getDoc(docRef);

  const photos = docSnap.data().photos;
  let randomPhoto = photos[Math.floor(Math.random() * photos.length)];
  return randomPhoto
}

export default getOtherPhoto;