import { collection } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { collectionsKeys } from "../collectionsKeys";

export const matchesCollection = collection(db,collectionsKeys.matches);
 