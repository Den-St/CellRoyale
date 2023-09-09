import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { emailPattern } from "../../consts/emailPattern";
import { useLogin } from "../../hooks/login.hook";
import { RegistrationInterface } from "../../types/registration";
import {GoogleOutlined} from '@ant-design/icons';
import { useEffect } from "react";
import { Display } from "../../assets/Display";
import { Link } from "react-router-dom";

export const Login = () => {
    const {success,contextHolder,onSubmit,signInWithGoogle,showError} = useLogin();
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<RegistrationInterface>();

    useEffect(() => {
        if(errors.email?.message) showError(errors.email.message);
        if(errors.password?.message) showError(errors.password.message);
    },[errors.email, errors.password]);
    
  if(success) return <Navigate to={'/'}/>
  return <form onSubmit={handleSubmit(onSubmit)}>
        {contextHolder}
        <Display direction="column" gap={'10px'} width={'250px'} padding={'20px'}>
            <input {...register('email',{required:true, pattern:{message:"Incorrect email form",value:emailPattern}})}
            placeholder="Login"/>
            <input {...register('password',{required:"Incorrect password form", minLength:6})}
            type={"password"} placeholder="Password"/>
            <input type={'submit'} value={'Submit'}/>
            <Link to={'/registration'}>Registration</Link>
            <button onClick={signInWithGoogle}><GoogleOutlined/></button>
        </Display>
    </form>
   
}