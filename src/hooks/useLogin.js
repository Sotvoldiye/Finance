import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "sonner";
import { login, logout } from "../app/features/userSlice";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signIn = async (email, password) => {
    setIsPending(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      dispatch(login(user));

      setData(user);

      toast.success(`Xush kelibsiz, ${user.displayName}!`);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return { data, isPending, signIn };
};
