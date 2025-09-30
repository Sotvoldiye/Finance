import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export function useCollection(c) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, c), (snapshot) => {
      const data = [];
      snapshot.forEach((d) => {
        data.push({ id: d.id, ...d.data() });
      });
      setData(data);
    });
    return () => unsubscribe();
  }, [c]);

  return { data };
}
