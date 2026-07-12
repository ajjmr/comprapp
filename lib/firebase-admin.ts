import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key) throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY no configurado");

  const parsed = JSON.parse(key);
  // Vercel a veces almacena la private_key con \n literales — corregir
  if (parsed.private_key) {
    parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  }

  return initializeApp({ credential: cert(parsed) });
}

export const adminDb = () => getFirestore(getAdminApp());
