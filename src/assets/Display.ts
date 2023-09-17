import styled from "styled-components";

export const Display = styled.div<{width?:string,height?:string,direction?:"column",$position?:'relative' | 'absolute' | 'fixed',background?:string,fontSize?:string,maxheight?:string,$zindex?:string,
                                   gap?:string,$align?:'center' | 'start' | 'end',$padding?:string,top?:string,bottom?:string,borderradius?:string,margin?:string,maxwidth?:string,minwidth?:string,
                                   $justify?:'center' | 'start' | 'end' | 'space-between' | 'space-around',left?:string,right?:string,color?:string,minheight?:string,border?:string}>`
    display:flex;
    box-sizing:border-box;
    font-family:helvetica;
    ${({width}) => width && `width:${width};`}
    ${({height}) => height && `height:${height};`}
    ${({direction}) => direction && `flex-direction:${direction};`}
    ${({gap}) => gap && `gap:${gap};`}
    ${({$align}) => $align && `align-items:${$align};`}
    ${({$justify}) => $justify && `justify-content:${$justify};`}
    ${({$padding})=> $padding && `padding:${$padding};`}
    ${({$position})=> $position && `position:${$position};`}
    ${({top})=> top && `top:${top};`}
    ${({bottom})=> bottom && `bottom:${bottom};`}
    ${({left})=> left && `left:${left};`}
    ${({right})=> right && `right:${right};`}
    ${({background})=> background && `background:${background};`}
    ${({borderradius})=> borderradius && `border-radius:${borderradius};`}
    ${({color})=> color && `color:${color};`}
    ${({fontSize})=> fontSize && `font-size:${fontSize};`}
    ${({minheight})=> minheight && `min-height:${minheight};`}
    ${({maxheight})=> maxheight && `max-height:${maxheight};`}
    ${({maxwidth})=> maxwidth && `max-width:${maxwidth};`}
    ${({minwidth})=> minwidth && `min-width:${minwidth};`}
    ${({border})=> border && `border:${border};`}
    ${({$zindex})=> $zindex && `z-index:${$zindex};`}
    overflow:hidden;
`;