import { uuidv4 } from "@firebase/util";
import {
  setDoc,
  doc,
  where,
  collection,
  getDocs,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { map } from "lodash";
import { db } from "../utils";

export class Song {
  collectionName = "songs";

  async create(name, album, file) {
    try {
      const id = uuidv4();
      const createAt = new Date();
      const data = {
        id,
        name,
        album,
        file,
        createAt,
      };

      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, data);
    } catch (error) {
      throw error;
    }
  }

  async obtainAllByAlbum(id) {
    try {
      const whereRef = where("album", "==", id);
      const collectionRef = collection(db, this.collectionName);
      const queryRef = query(collectionRef, whereRef);
      const querySnapshot = await getDocs(queryRef);
      return map(querySnapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }

  async getLastSongs(limitItems = 10) {
    try {
      const collectionRef = collection(db, this.collectionName);
      const limitRef = limit(limitItems);
      const orderByRef = orderBy("createAt", "desc");
      const queryRef = query(collectionRef, orderByRef, limitRef);

      const snapshot = await getDocs(queryRef);
      return map(snapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }
}
