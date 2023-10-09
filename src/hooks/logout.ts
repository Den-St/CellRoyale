import { signOut } from 'firebase/auth';
import { useState } from "react";
import { googleAuthProvider } from '../firebase/firebaseInit';

export const useLogout = () => {
    const [logout,setLogout] = useState(false);
    const onLogout = () => {
      signOut(googleAuthProvider).then(() => setLogout(true));
    }

    return {onLogout,logout};
}