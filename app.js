// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  increment,
  onSnapshot,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 FIXED CONFIG (no nesting)
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

// Event ID
const eventId = "test-event";
console.log("RUNNING VERSION 2");

// Reference to items
const itemsRef = collection(db, "events", eventId, "items");

// Real-time listener
onSnapshot(itemsRef, (snapshot) => {
  console.log("SNAPSHOT SIZE:", snapshot.size);

  const appDiv = document.getElementById("app");

  if (!appDiv) {
    console.log("APP DIV NOT FOUND");
    return;
  }

  appDiv.innerHTML = "";

  snapshot.forEach((doc) => {
    const item = doc.data();
    console.log("ITEM:", item);

    const el = document.createElement("div");
    el.style.border = "1px solid #ccc";
    el.style.padding = "10px";
    el.style.margin = "10px";

    el.innerHTML = `
  <h2>${item.name}</h2>
  <p>${item.description}</p>
  <strong>Current Bid: $${item.currentBid}</strong>
  <p>Bids: ${item.bidCount}</p>
  <button class="bid-btn" data-id="${doc.id}">Place Bid</button>
`;

    appDiv.appendChild(el);
  });
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("bid-btn")) {
  const itemId = e.target.getAttribute("data-id");

  const itemRef = doc(db, "events", eventId, "items", itemId);

  try {
   await runTransaction(db, async (transaction) => {
  const snap = await transaction.get(itemRef);

  if (!snap.exists()) {
    throw "Item does not exist!";
  }

  const item = snap.data();

  if (item.status !== "open") {
    throw "Bidding closed";
  }

  const newBid = item.currentBid + 10;

  transaction.update(itemRef, {
    currentBid: newBid,
    bidCount: item.bidCount + 1
  });
});

    console.log("Bid placed");

  } catch (err) {
    console.error(err);
  }
}
});
