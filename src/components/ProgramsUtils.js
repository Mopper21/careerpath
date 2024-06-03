import { db, auth } from '../firebase-config';
import { collection, addDoc } from "firebase/firestore"; 

const toggleForm = (formId) => {
    const form = document.getElementById(formId);
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  };
  

const validateForm = async (userEmail, programName) => {
  // Check if user is logged in
  const user = auth.currentUser;
  if (!user) {
    alert('You need to be logged in to apply for a program.');
    return;
  }

  try {
    // Add application to Firestore
    await addDoc(collection(db, 'application'), {
      email: userEmail,
      programName: programName,
      timestamp: new Date(),
      userId: user.uid 
    });

    alert('You have successfully applied for the program!');
  } catch (error) {
    console.error('Error submitting application:', error);
    alert('Failed to submit application. Please try again.');
  }
};

export { toggleForm, validateForm };
