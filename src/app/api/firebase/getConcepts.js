import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// const getRandomSaying = async () => {
//   const docRef = doc(db, "levels");
//   const docSnap = await getDoc(docRef);

//   const sayings = docSnap.data()
//   console.log(sayings)
// }


// export default getRandomSaying;

const getConcepts = async () => {
  let concepts = [];

  const conceptsRequest = await getDocs(collection(db, "grammarConcept"));
  conceptsRequest.forEach(concept => {
    concepts.push(concept.data());
  })

  // return concepts
  return concepts;
}

export default getConcepts;