import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "sonner";
import { login } from "../app/features/userSlice";
export const useRegister = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);

  const register = async (displayName, email, password) => {
    setIsPending(true);
    try {
      const req = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: `https://api.dicebear.com/9.x/adventurer/svg?seed=${displayName}`
      })
      const user = req.user;
      toast.success(`Welcome ${req.user.displayName}`);
      dispatch(login(user));
      setData(user)
    } catch (error) {
        toast.error(error.message)
        console.log(error.message);
        
    } finally {
      setIsPending(false);
    }
  };

  return { data, isPending, register };
};
