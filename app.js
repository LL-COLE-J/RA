// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 STEP 1 — PASTE YOUR REAL CONFIG HERE
const firebaseConfig = {
  apiKey: "PASTE_REAL_API_KEY",
  authDomain: "PASTE_REAL_AUTH_DOMAIN",
  projectId: "PASTE_REAL_PROJECT_ID",
  storageBucket: "PASTE_REAL_BUCKET",
  messagingSenderId: "PASTE_REAL_ID",
  appId: "PASTE_REAL_APP_ID"
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
