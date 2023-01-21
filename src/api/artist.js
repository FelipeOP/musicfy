import {
  setDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from "lodash";
import { db } from "../utils";

export class Artist {
  collectionName = "artists";

  async create(image, name) {
    try {
      const artistId = uuidv4();
      const createdDate = new Date();
      const data = { id: artistId, image, name, createdDate };

      const docRef = doc(db, this.collectionName, artistId);
      await setDoc(docRef, data);
    } catch (error) {
      throw error;
    }
  }

  async obtainAll() {
    try {
      const conllectionRef = collection(db, this.collectionName);
      const snapshot = await getDocs(conllectionRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }

  async getArtist(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      return snapshot.data();
    } catch (error) {
      throw error;
    }
  }

  async getLastArtists(limitItems = 10) {
    try {
      const collectionRef = collection(db, this.collectionName);
      const limitRef = limit(limitItems);
      const orderByRef = orderBy("createdDate", "desc");
      const queryRef = query(collectionRef, orderByRef, limitRef);

      const snapshot = await getDocs(queryRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }
}
