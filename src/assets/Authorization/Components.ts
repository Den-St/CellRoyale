import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const SubmitButton = styled.input`
    border-radius:10px;
    background:#D9D9D9;
    border:0.5px solid gray;
    outline:none;
    height: 50px;
    padding: 0 40px;
    width:fit-content;
    cursor:pointer;
`;

export const Input = styled.input`
    width: 420px;
    height: 45px;
    padding: 0 0 0 15px;
    box-sizing:border-box;
    border-radius:10px;
    outline:none;
    color:#494949;
    border:0.5px solid gray;
    outline:none;
`;

export const PasswordInput = styled.input`
    width: 200px;
    height: 45px;
    padding: 0 0 0 15px;
    box-sizing:border-box;
    border-radius:10px;
    outline:none;
    border:0.5px solid gray;
    color:#494949;
`;

export const GoogleAuthButton = styled.button`
    border:none;
    width:fit-content;
    background:none;
    font-size:35px;
    
`;

export const Header = styled.h1`
    margin:0;
`;

export const ChangeSignType = styled.span`
   color:#878787;
    display:flex;
    gap:5px;
`;

export const GoToLogIn = styled(Link)`
    color:black;
    text-decoration:underline;
`;