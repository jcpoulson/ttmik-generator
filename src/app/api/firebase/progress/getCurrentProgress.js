import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const getCurrentProgress = async () => {
  const docRef = doc(db, "progress", "currentBelt");
  const docSnap = await getDoc(docRef);

  const progressObject = docSnap.data();
  return progressObject
}


export default getCurrentProgress;