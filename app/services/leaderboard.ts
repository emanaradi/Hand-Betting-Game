import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export interface LeaderboardEntry {
  id?: string;
  playerName: string;
  gender: string;
  score: number;
  createdAt: Date;
}

export async function saveScore(
  playerName: string,
  gender: string,
  score: number,
) {
  await addDoc(collection(db, "Leaderboard"), {
    playerName,
    gender,
    score,
    createdAt: Timestamp.now(),
  });
}

export async function getTopScores() {
  const leaderboardQuery = query(
    collection(db, "Leaderboard"),
    orderBy("score", "desc"),
    limit(5),
  );

  const snapshot = await getDocs(leaderboardQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
