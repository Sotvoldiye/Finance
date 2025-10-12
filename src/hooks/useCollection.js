import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
export function useCollection(c) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubBudgets = onSnapshot(collection(db, "budgets"), (snapshot) => {
      const budgets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData((prev) => ({ ...prev, budgets }));
    });

    const unsubPots = onSnapshot(collection(db, "pots"), (snapshot) => {
      const pots = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData((prev) => ({ ...prev, pots }));
    });

    const unsubTransactions = onSnapshot(
      collection(db, "transactions"),
      (snapshot) => {
        const transactions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData((prev) => ({ ...prev, transactions }));
      }
    );

    return () => {
      unsubBudgets();
      unsubPots();
      unsubTransactions();
    };
  }, []);
  return { data };
}
