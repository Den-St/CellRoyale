import { createUser } from '../firebase/db/users/create/createUser';
import { message } from "antd";
import { createUserWithEmailAndPassword, AuthErrorCodes, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { googleAuthProvider, googleProvider } from "../firebase/firebaseInit";
import { RegistrationInterface } from "../types/registration";

export const useRegistration = (disabled:boolean) => {
    const [success,setSuccess] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const showError = (message:string,key:string) => {
        messageApi.open({
          type: 'error',
          content: message,
          key
        });
      }
      const clearError = (key:string) => {
        messageApi.destroy(key);
      }

    const onSubmit:SubmitHandler<RegistrationInterface> = async (data:RegistrationInterface) => {
      if(disabled) return;
        try{
            await createUserWithEmailAndPassword(googleAuthProvider,data.email,data.password);
            if(googleAuthProvider.currentUser === null) return;
            const {displayName, email, photoURL} = googleAuthProvider.currentUser;
            const {creationTime} = googleAuthProvider.currentUser.metadata;
            await createUser({
                              email,
                              displayName: displayName || data.displayName,
                              photoURL,
                              createdAt:creationTime
                            });
            setSuccess(true);
        }catch(err){
            if(AuthErrorCodes.EMAIL_EXISTS === JSON.parse(JSON.stringify(err)).code){
              showError('Email already in use','auth');
            }
        }
      }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(googleAuthProvider,googleProvider);
            if(googleAuthProvider.currentUser === null) return;
            const {displayName, email, photoURL} = googleAuthProvider.currentUser;
            const {creationTime} = googleAuthProvider.currentUser.metadata;
            await createUser({
                              email,
                              displayName,
                              photoURL,
                              createdAt:creationTime
                            });
            setSuccess(true);
        }catch(err){
            console.error(err);
        }
    }

    return {signInWithGoogle,onSubmit,success,contextHolder,showError,clearError};
}