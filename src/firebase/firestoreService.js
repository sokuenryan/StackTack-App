import { db } from './firebase-config';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, setDoc } from 'firebase/firestore';

// Function to save data
export const saveData = async (collectionName, userId, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), { userId, ...data });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Function to get data
export const getData = async (collectionName, userId) => {
  const q = query(collection(db, collectionName), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

// Function to update data in Firestore
export const updateData = async (collection, userId, docId, data) => {
  try {
    const docRef = doc(db, collection, userId, 'bills', docId);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error updating document: ", error);
  };
};

// Function to delete data from Firestore
export const deleteData = async (collection, userId, docId) => {
  try {
    const docRef = doc(db, collection, userId, 'bills', docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};