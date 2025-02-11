import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
// Mengimpor service account JSON menggunakan assert { type: "json" }
import serviceAccount from "./jahitbajuappsv2-firebase-adminsdk-fbsvc-2222a3ec24.json" assert { type: "json" };

// Inisialisasi Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "jahitbajuappsv2.firebasestorage.app",
});

// Dapatkan akses ke Firebase Storage
const bucket = getStorage().bucket();

export { admin, bucket };
