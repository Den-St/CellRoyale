import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Display } from "../../assets/Display"
import { emailPattern } from "../../consts/emailPattern";
import { useRegistration } from "../../hooks/registration.hook";
import { RegistrationInterface } from "../../types/registration";
import { ChangeSignType, GoogleAuthButton, GoToLogIn, Header, Input, PasswordInput, SubmitButton } from "./../../assets/Authorization/Components";
import GoogleOutlined from "@ant-design/icons/GoogleOutlined";
import { wrappedRoutes } from "../../consts/routes";

export const Registration = () => {
    const [confirmPassword,setConfirmPassword] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegistrationInterface>();
    const disabled = watch('password') !== confirmPassword || confirmPassword === '';
    const {signInWithGoogle,onSubmit,success,contextHolder,showError,clearError} = useRegistration(disabled);

    useEffect(() => {
        if(errors.email?.message) {
            clearError('email');
            showError(errors.email.message,'email');
        }
        if(errors.password?.message) {
            clearError('password');
            showError(errors.password.message,'password');
        }
        if(errors.displayName?.message) {
            clearError('displayName')
            showError(errors.displayName.message,'displayName');
        }
        if(watch('password') && disabled){
            clearError('password dont match')
            showError('Passwords dont`t match','password dont match');
        }
    },[errors.email, errors.password, errors.displayName]);
    
    if(success) return <Navigate to={wrappedRoutes.mainSearchPage}/>

    return <Display>
        <form onSubmit={handleSubmit(onSubmit)}>
            {contextHolder}
            <Display style={{borderRadius:'20px',flexDirection:'column',gap:'10px',padding:"35px 50px",background:'white',alignItems:'center'}} >
                <Header>Create account</Header>
                <Input {...register('displayName',{required:"Username is required",})} placeholder="Username"/>
                <Input {...register('email',{required:"Email is required",pattern:{value:emailPattern,message:"Email must be correct(example@email.com)"},})} placeholder="E-mail"/>
                <Display style={{justifyContent:'space-between',gap:'20px'}} >
                    <PasswordInput type={'password'} {...register('password',{required:"Password is required",
                                   minLength:{message:"Password must be longer than 10 symbols.",value:10}})} placeholder="Password"/>
                    <PasswordInput type={'password'} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password"/>
                </Display>
                <Display style={{alignItems:'center',width:'100%',flexDirection:'column',gap:'10px'}}>
                    <SubmitButton type={'submit'} value={'Sign up'}/>
                    <GoogleAuthButton onClick={signInWithGoogle}><GoogleOutlined /></GoogleAuthButton>
                    <ChangeSignType>Already a member? <GoToLogIn to={wrappedRoutes.login}>Log in</GoToLogIn></ChangeSignType>
                </Display>
            </Display>
        </form>
    </Display>
}