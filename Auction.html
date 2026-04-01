import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔑 Replace this
const eventId = "PASTE_EVENT_ID_HERE";

const itemsRef = collection(db, "events", eventId, "items");

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
