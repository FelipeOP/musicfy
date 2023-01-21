import { v4 as uuidv4 } from "uuid";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  getDoc,
  where,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils";
import { map } from "lodash";

export class Album {
  collectionName = "albums";

  async create(name, image, artist) {
    try {
      const id = uuidv4();
      const createAt = new Date();
      const data = {
        id,
        name,
        image,
        artist,
        createAt,
      };
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, data);
    } catch (error) {
      throw error;
    }
  }

  async obtainAll() {
    try {
      const collectionRef = collection(db, this.collectionName);
      const querySnapshot = await getDocs(collectionRef);
      return map(querySnapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }

  async getAlbum(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const querySnapshot = await getDoc(docRef);
      return querySnapshot.data();
    } catch (error) {
      throw error;
    }
  }

  async getAlbumsByArtist(artistId) {
    try {
      const whereRef = where("artist", "==", artistId);
      const collectionRef = collection(db, this.collectionName);
      const queryRef = query(collectionRef, whereRef);

      const querySnapshot = await getDocs(queryRef);
      return map(querySnapshot.docs, (doc) => doc.data());
    } catch (error) {
      throw error;
    }
  }

  async getLastAlbums(limitItems = 10) {
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
