import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { toast } from "sonner";

export const useCollectionsData = (names) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    async function fetchMultpleCollections() {
        setIsPending(true)
      try {
        const balanceRef = collection(db, "balance");
        const budgetsRef = collection(db, "budgets");
        const potsRef = collection(db, "pots");
        const transactionsRef = collection(db, "transactions");

        const [
          balanceSnapshot,
          budgetsSnapshot,
          potsSnapshot,
          transactionsSnapshot,
        ] = await Promise.all([
          getDocs(balanceRef),
          getDocs(budgetsRef),
          getDocs(potsRef),
          getDocs(transactionsRef),
        ]);

        const balance = {
            id: balanceSnapshot.docs[0].id,
            ...balanceSnapshot.docs[0].data()
        }
        const budgets = budgetsSnapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }))
        const pots = potsSnapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }))
        const transactions = transactionsSnapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }))

        setData({balance, budgets, pots, transactions});
        
      } catch (error) {
        console.log(error.message);
        toast.error("hatolik bor")
        
      } finally {
        setIsPending(false)
      }
    }
    fetchMultpleCollections()
  }, []);
  return {data, isPending}
};
