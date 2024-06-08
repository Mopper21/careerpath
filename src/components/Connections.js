//src\components\Connections.js
import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const addEmployerConnection = async (data) => {
  try {
    await addDoc(collection(db, 'employerConnections'), {
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

export const addMentorConnection = async (data) => {
  try {
    await addDoc(collection(db, 'mentorConnections'), {
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};
