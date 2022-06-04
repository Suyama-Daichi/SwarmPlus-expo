import { auth } from "@/libs/firebase";
import { onAuthStateChanged, User } from "@firebase/auth";
import { useState, useEffect } from "react";

export const useInitialize = () => {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          // setUser();
        }
        setLoading(false)
      });
      return () => unsubscribe();
    }, []);

  return {user, loading}
}