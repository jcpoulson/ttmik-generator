import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// const getRandomSaying = async () => {
//   const docRef = doc(db, "levels");
//   const docSnap = await getDoc(docRef);

//   const sayings = docSnap.data()
//   console.log(sayings)
// }


// export default getRandomSaying;

const getLevels = async () => {
  const levels = await getDocs(collection(db, "levels"));
  console.log(levels.data());
}

export default getLevels;