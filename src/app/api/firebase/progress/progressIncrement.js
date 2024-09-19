import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const progressIncrement = async () => {
    const docRef = doc(db, "progress", "currentBelt");
    const docSnap = await getDoc(docRef);

    const progressObject = docSnap.data();
    
    const incrementedCount = progressObject.currentCount + 1
    
    await updateDoc(docRef, {
        currentCount: incrementedCount
    })

}


export default progressIncrement;