import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

const uploadPhoto = async (file, fileName) => {
    const storage = getStorage();
    const storageRef = ref(storage, `img/${fileName}`);
    const photoDBRef = doc(db, 'photos', 'app-photos');
    
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(storageRef).then(data => {
            updateDoc(photoDBRef, {
                photos: arrayUnion(data)
            })
        })
    });
}

export default uploadPhoto;
