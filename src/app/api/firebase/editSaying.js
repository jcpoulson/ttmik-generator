import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const editSaying = async (oldPostBody, newPostBody) => {
    // level should be a string
    const selectedLevel = doc(db, "levels", oldPostBody.level.toString());

    // Remove the old value from the array
    await updateDoc(selectedLevel, {
        sayings: arrayRemove(oldPostBody)
    });

    // Add the new value to the array
    await updateDoc(selectedLevel, {
      sayings: arrayUnion(newPostBody)
  });
}


export default editSaying;