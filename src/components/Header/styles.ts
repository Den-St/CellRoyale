import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const LogoLink = styled(Link)`
    color:black;
    text-decoration:none;
    position:relative;
`;

export const LogoText = styled.h1`
    margin:0;
    font-size:28px;
    position:absolute;
    top:29%;
    right:20.5%;
    z-index:1;
`;