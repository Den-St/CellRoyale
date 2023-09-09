import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Display } from "../../assets/Display"
import { emailPattern } from "../../consts/emailPattern";
import { useRegistration } from "../../hooks/registration.hook";
import { RegistrationInterface } from "../../types/registration";

export const Registration = () => {
    const {signInWithGoogle,onSubmit,success,contextHolder,showError} = useRegistration();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationInterface>();
    useEffect(() => {
        if(errors.email?.message) showError(errors.email.message);
        if(errors.password?.message) showError(errors.password.message);
    },[errors.email, errors.password]);
    
    if(success) return <Navigate to={'/'}/>

    return <form onSubmit={handleSubmit(onSubmit)}>
        {contextHolder}
        <Display direction="column" gap={'10px'} width={'250px'} padding={'20px'}>
            <input {...register('email',{required:true, pattern:emailPattern})} placeholder="email"/>
            <input {...register('password',{required:true, minLength:6})} placeholder="password"/>
            <input type={'submit'} value={'Submit'}/>
            <button onClick={signInWithGoogle}>google</button>
        </Display>
    </form>
}