import { UserT } from './../types/user';
import { useAppSelector } from './redux';
import { useState } from "react";
import { CellT, CellTypeT } from "../types/cell";

export const useHoverCell = () => {
    const userId = useAppSelector(state => state.user.id);
    const [hoveredCellMessage,setHoveredCellMessage] = useState('');
    const typeToMessage:Record<CellTypeT,string> = {
        'booster':'Activate booster',
        'cell':'Go to cell',
        'player':'Eliminate player'
    };

    const onChangeHoveredCell = (cell:CellT) => {
        if(cell.type === 'player'  && userId === (cell.value as UserT).id) return;
        if(typeToMessage[cell.type] === hoveredCellMessage) return;
        setHoveredCellMessage(typeToMessage[cell.type]);
    }
    const onClearHoveredCell = () => {
    }

    return {onChangeHoveredCell,onClearHoveredCell,hoveredCellMessage}
}