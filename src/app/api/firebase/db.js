import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const getRandomSaying = async (levelNumber) => {
  const docRef = doc(db, "levels", levelNumber);
  const docSnap = await getDoc(docRef);

  const sayings = docSnap.data().sayings;
  let randomSaying = sayings[Math.floor(Math.random() * sayings.length)];
  return randomSaying
}


export default getRandomSaying;
