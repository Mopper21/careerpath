import "./App.css";
import {Auth} from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  } from "firebase/firestore";

function App() {
return (
<div className="App">
<Auth />
</div>
  ); 
}

export default App;