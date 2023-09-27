import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { emailPattern } from "../../consts/emailPattern";
import { useLogin } from "../../hooks/login.hook";
import { RegistrationInterface } from "../../types/registration";
import {GoogleOutlined} from '@ant-design/icons';
import { useEffect } from "react";
import { Display } from "../../assets/Display";
import { ChangeSignType, GoogleAuthButton, GoToLogIn, Header, Input, SubmitButton } from "../../assets/Authorization/Components";

export const Login = () => {
    const {success,contextHolder,onSubmit,signInWithGoogle,showError,clearError} = useLogin();
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<RegistrationInterface>();

    useEffect(() => {
        if(errors.email?.message) {
            clearError('email');
            showError(errors.email.message,'email');
        }
        if(errors.password?.message) {
            clearError('password');
            showError(errors.password.message,'password');
        }
    },[errors.email, errors.password]);
    
  if(success) return <Navigate to={'/'}/>
  return <Display>
        <form onSubmit={handleSubmit(onSubmit)}>
            {contextHolder}
            <Display style={{alignItems:"center",borderRadius:'20px',flexDirection:'column',gap:'15px',padding:"35px 50px",background:"white"}}>
                <Header>Log in account</Header>
                <Input {...register('email',{required:"Email is required",pattern:{value:emailPattern,message:"Email must be correct(example@email.com)"}})} placeholder="E-mail"/>
                <Input {...register('password',{required:"Password is required",
                        minLength:{message:"Password must be longer than 10 symbols.",value:10}})}
                        type={"password"} placeholder="Password"/>
                <SubmitButton type={'submit'} value={'Submit'}/>
                <GoogleAuthButton onClick={signInWithGoogle}><GoogleOutlined/></GoogleAuthButton>
                <ChangeSignType>Dont have an account?<GoToLogIn to={'/registration'}>Create account</GoToLogIn></ChangeSignType>
            </Display>
        </form>
    </Display>
}