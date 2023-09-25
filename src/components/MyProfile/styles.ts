import { styled } from 'styled-components';
export const UserName = styled.p`
    margin:0;
    font-size:20px;
`;

export const PhotosInput = styled.input`
    opacity:0;
    width:60px;
`;

export const PhotosInputContainer = styled.div`
    position:relative;
    width:60px;
    .anticon{
        position:absolute;
        padding:5px 20px;
        font-size:20px;
        background:#1677ff;
        color:white;
        border-radius:5px;
    }
`;