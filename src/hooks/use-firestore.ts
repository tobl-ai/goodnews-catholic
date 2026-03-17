"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  type QueryConstraint,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UseCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

export function useCollection<T extends DocumentData>(
  collectionName: string,
  queryConstraints: QueryConstraint[] = []
): UseCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as T[];
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return { data, loading, error };
}
