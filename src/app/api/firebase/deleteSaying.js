import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const deleteSaying = async (postBody) => {
    // level should be a string
    const selectedLevel = doc(db, "levels", postBody.level.toString());

    // Atomically remove a region from the "regions" array field.
    await updateDoc(selectedLevel, {
        sayings: arrayRemove(postBody)
    });
}


export default deleteSaying;