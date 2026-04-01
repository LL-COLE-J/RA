// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 STEP 1 — PASTE YOUR REAL CONFIG HERE
const firebaseConfig = {
  const firebaseConfig = {
  apiKey: "AIzaSyCCQLIzqaFsjp6krMRt5kgMoPZtE_af9ws",
  authDomain: "raiseaura-site.firebaseapp.com",
  projectId: "raiseaura-site",
  storageBucket: "raiseaura-site.firebasestorage.app",
  messagingSenderId: "244577348867",
  appId: "1:244577348867:web:92e392a70a8199801f0d36"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔑 STEP 2 — PASTE YOUR EVENT ID HERE
const eventId = "B96ooD5xwF7qMiSW5ot"; // ← yours from screenshot

// Reference to items
const itemsRef = collection(db, "events", eventId, "items");

// 🔥 STEP 3 — REAL-TIME LISTENER
onSnapshot(itemsRef, (snapshot) => {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = "";

  snapshot.forEach((doc) => {
    const item = doc.data();

    const el = document.createElement("div");
    el.style.border = "1px solid #ccc";
    el.style.padding = "10px";
    el.style.margin = "10px";

    el.innerHTML = `
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <strong>Current Bid: $${item.currentBid}</strong>
      <p>Bids: ${item.bidCount}</p>
    `;

    appDiv.appendChild(el);
  });
});
