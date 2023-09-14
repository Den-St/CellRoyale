import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:150px;
    width:100vw;
    height:100vh;
    background-image:url('./../../assets/background.jpg');
    overflow:hidden;
`;

export const LoginLink = styled(Link)`
    color:black;
    text-decoration:none;
    padding:10px;
    border:1px solid black;
    border-radius:15px;
`;
