import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAALZTW4v41SpH826yYgwOnalsb-HA6oII",
  authDomain: "swiftedge-360.firebaseapp.com",
  projectId: "swiftedge-360",
  storageBucket: "swiftedge-360.firebasestorage.app",
  messagingSenderId: "447366600005",
  appId: "1:447366600005:web:2386faf68ec0202d3f1a2c",
  measurementId: "G-RBDE2E67BZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth);
export { app, auth };
