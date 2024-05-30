// src/components/Connections.js
import { db } from '../firebase-config'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const handleEmployerSubmit = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const program = e.target.program.value;
  const company = e.target.company.value;
  const message = e.target.message.value;

  if (!name || !email || !program || !company || !message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    await addDoc(collection(db, 'employerConnections'), {
      name,
      email,
      program,
      company,
      message,
      timestamp: serverTimestamp()
    });
    alert("Request submitted successfully!");
    e.target.reset(); // Reset the form after successful submission
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to submit request. Please try again later.");
  }
};

export const handleMentorSubmit = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const program = e.target.program.value;
  const company = e.target.company.value;
  const message = e.target.message.value;

  if (!name || !email || !program || !company || !message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    await addDoc(collection(db, 'mentorConnections'), {
      name,
      email,
      program,
      company,
      message,
      timestamp: serverTimestamp()
    });
    alert("Request submitted successfully!");
    e.target.reset(); // Reset the form after successful submission
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to submit request. Please try again later.");
  }
};

