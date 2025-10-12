import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export function useCollectionsData() {
  const [data, setData] = useState({
    pots: [],
    budgets: [],
    transactions: [],
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 🔐 foydalanuvchini kuzatish
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return; // foydalanuvchi aniqlanmagan bo‘lsa, kutamiz

    // 🧩 real-time snapshotlar
    const unsubPots = onSnapshot(
      query(collection(db, "pots"), where("userId", "==", user.uid)),
      (snapshot) => {
        const pots = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData((prev) => ({ ...prev, pots }));
      }
    );

    const unsubBudgets = onSnapshot(
      query(collection(db, "budgets"), where("userId", "==", user.uid)),
      (snapshot) => {
        const budgets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData((prev) => ({ ...prev, budgets }));
      }
    );

    const unsubTransactions = onSnapshot(
      query(collection(db, "transactions"), where("userId", "==", user.uid)),
      (snapshot) => {
        const transactions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData((prev) => ({ ...prev, transactions }));
      }
    );

    // 🔄 unsub funksiyalarni qaytarish
    return () => {
      unsubPots();
      unsubBudgets();
      unsubTransactions();
    };
  }, [user]);

  return { data };
}
