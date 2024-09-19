import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const postSaying = async (postBody, level) => {
    // level should be a string
    const selectedLevel = doc(db, "levels", level);
  
    await updateDoc(selectedLevel, {
        sayings: arrayUnion(postBody)
    })
}


export default postSaying;