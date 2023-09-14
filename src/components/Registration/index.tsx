import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Display } from "../../assets/Display"
import { emailPattern } from "../../consts/emailPattern";
import { useRegistration } from "../../hooks/registration.hook";
import { RegistrationInterface } from "../../types/registration";
import { ChangeSignType, Google, GoToLogIn, Header, Input, PasswordInput, SubmitButton } from "./styles";
import GoogleOutlined from "@ant-design/icons/GoogleOutlined";

export const Registration = () => {
    const [confirmPassword,setConfirmPassword] = useState('');
    const {signInWithGoogle,onSubmit,success,contextHolder,showError,clearError} = useRegistration();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
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
        if(errors.displayName?.message) {
            clearError('displayName')
            showError(errors.displayName.message,'displayName');
        }
    },[errors.email, errors.password, errors.displayName]);
    const disabled = watch('password') !== confirmPassword || confirmPassword === '';
    
    if(success) return <Navigate to={'/'}/>

    return <Display>
        <form onSubmit={handleSubmit(onSubmit)}>
            {contextHolder}
            <Display  borderRadius="20px" direction="column" gap={'10px'}  padding={'35px 50px'} background={'white'}>
                <Header>Create account</Header>
                <Input {...register('displayName',{required:"Username is required",})} placeholder="Username"/>
                <Input {...register('email',{required:"Email is required",pattern:emailPattern,})} placeholder="E-mail"/>
                <Display justify="space-between" >
                    <PasswordInput {...register('password',{required:"Password is required",
                                    minLength:{message:"Password must be longer than 6 symbols.",value:6}})} placeholder="Password"/>
                    <PasswordInput onChange={(e) => setConfirmPassword(e.target.value)}  placeholder="Confirm password"/>
                </Display>
                <Display align="center" width="100%" direction="column" gap={'10px'}>
                    <SubmitButton disabled={disabled} type={'submit'} value={'Submit'}/>
                    <Google onClick={signInWithGoogle}><GoogleOutlined /></Google>
                    <ChangeSignType>Already a member? <GoToLogIn to={'/login'}>Log in</GoToLogIn></ChangeSignType>
                </Display>
            </Display>
        </form>
    </Display>
}