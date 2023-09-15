import { message } from "antd";
import { signInWithEmailAndPassword, AuthErrorCodes, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { googleAuthProvider, googleProvider } from "../firebase/firebaseInit";
import { RegistrationInterface } from "../types/registration";

export const useLogin = () => {
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
        try{
            await signInWithEmailAndPassword(googleAuthProvider,data.email,data.password);
            setSuccess(true);
        }catch(err){
            if(AuthErrorCodes.INVALID_PASSWORD === JSON.parse(JSON.stringify(err)).code 
                || AuthErrorCodes.INVALID_EMAIL === JSON.parse(JSON.stringify(err)).code ){
                showError('Incorrect email or password',"auth")
            }
        }
      }
      const signInWithGoogle = async () => {
        try{
            await signInWithPopup(googleAuthProvider,googleProvider);
            setSuccess(true);
        }catch(err){
            console.error(err);
        }
      }    

    return {success,contextHolder,onSubmit,signInWithGoogle,showError,clearError};
}