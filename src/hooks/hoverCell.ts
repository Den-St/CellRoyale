import { useState } from "react";
import { CellT, CellTypeT } from "../types/cell";

export const useHoverCell = () => {
    const [hoveredCellMessage,setHoveredCellMessage] = useState('');
    const typeToMessage:Record<CellTypeT,string> = {
        'booster':'Activate booster',
        'cell':'Go to cell',
        'player':'Eliminate player'
    };

    const onChangeHoveredCell = (cell:CellT) => {
        if(typeToMessage[cell.type] === hoveredCellMessage) return;
        setHoveredCellMessage(typeToMessage[cell.type]);
    }
    const onClearHoveredCell = () => {
    }

    return {onChangeHoveredCell,onClearHoveredCell,hoveredCellMessage}
}