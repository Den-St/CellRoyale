import { boostersTypesNames } from './../consts/boostersTypesNames';
export const isAvailableCell = (userLocation:number[],destinationCoord:number[],distance:number,indexOfCentralRow:number) => {
    if(userLocation[0] === destinationCoord[0] && userLocation[1] === destinationCoord[1]) return false;
    if(userLocation[0] > indexOfCentralRow - distance && userLocation[0] < indexOfCentralRow + distance && userLocation[0] < indexOfCentralRow){
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= distance &&  userLocation[1] - destinationCoord[1] >= -distance){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] <= distance && userLocation[0] - destinationCoord[0] > 0){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance - (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -distance && userLocation[0] - destinationCoord[0] <= 0 && !(destinationCoord[0] > indexOfCentralRow && userLocation[0] <= indexOfCentralRow)){
            if(userLocation[1] - destinationCoord[1] <= distance - (destinationCoord[0] - userLocation[0])  && userLocation[1] - destinationCoord[1] >= -distance ){
                return true;
            }
        }else if(destinationCoord[0] > indexOfCentralRow && destinationCoord[0] - userLocation[0] <= distance ){
            if(userLocation[1] - destinationCoord[1] <= distance - 1 && userLocation[1] - destinationCoord[1] >= -distance + (destinationCoord[0] - userLocation[0]) - 1){
                return true;
            }
        }
    }else if(userLocation[0] > indexOfCentralRow - distance && userLocation[0] < indexOfCentralRow + distance && userLocation[0] > indexOfCentralRow){
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= distance &&  userLocation[1] - destinationCoord[1] >= -distance){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] <= distance && userLocation[0] - destinationCoord[0] > 0){
            if(userLocation[1] - destinationCoord[1] <= distance - 1 && userLocation[1] - destinationCoord[1] >= -distance - (destinationCoord[0] - userLocation[0]) -1){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -distance && userLocation[0] - destinationCoord[0] <= 0 && !(destinationCoord[0] > indexOfCentralRow && userLocation[0] <= indexOfCentralRow)){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance + (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }else if(destinationCoord[0] > indexOfCentralRow && destinationCoord[0] - userLocation[0] <= distance ){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance - (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
    }
    else if(userLocation[0] < indexOfCentralRow + 1 - distance){
        if(userLocation[0] - destinationCoord[0] <= distance && userLocation[0] - destinationCoord[0] >= 0){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance - (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -distance && userLocation[0] - destinationCoord[0] <= 0){
            if(userLocation[1] - destinationCoord[1] <= distance - (destinationCoord[0] - userLocation[0])  && userLocation[1] - destinationCoord[1] >= -distance ){
                return true;
            }
        }
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance){
                return true;
            }
        }
    }
    else if(userLocation[0] > indexOfCentralRow - 1 + distance){
        if(userLocation[0] - destinationCoord[0] <= distance && userLocation[0] - destinationCoord[0] >= 0){
            if(userLocation[1] - destinationCoord[1] <= distance + (destinationCoord[0] - userLocation[0])  && userLocation[1] - destinationCoord[1] >= -distance ){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -distance && userLocation[0] - destinationCoord[0] <= 0){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance + (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance){
                return true;
            }
        }
    }
    else{
        if(userLocation[0] - destinationCoord[0] <= distance && userLocation[0] - destinationCoord[0] >= 0){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance - (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -distance && userLocation[0] - destinationCoord[0] <= 0){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance + (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= distance && userLocation[1] - destinationCoord[1] >= -distance){
                return true;
            }
        }
    }

    return false;
}
export const isAvailableCellDoubleDistance = (userLocation:number[],destinationCoord:number[],indexOfCentralRow:number) => {
    if(userLocation[0] === destinationCoord[0] && userLocation[1] === destinationCoord[1]) return false;
    if(userLocation[0] > indexOfCentralRow - 2 && userLocation[0] < indexOfCentralRow + 2 && userLocation[0] < indexOfCentralRow){
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= 2 &&  userLocation[1] - destinationCoord[1] >= -2){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] <= 2 && userLocation[0] - destinationCoord[0] > 0){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2 - (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -2 && userLocation[0] - destinationCoord[0] <= 0 && !(destinationCoord[0] > indexOfCentralRow && userLocation[0] <= indexOfCentralRow)){
            if(userLocation[1] - destinationCoord[1] <= 2 - (destinationCoord[0] - userLocation[0])  && userLocation[1] - destinationCoord[1] >= -2 ){
                return true;
            }
        }else if(destinationCoord[0] > indexOfCentralRow && destinationCoord[0] - userLocation[0] <= 2 ){
            if(userLocation[1] - destinationCoord[1] <= 2 - 1 && userLocation[1] - destinationCoord[1] >= -2 + (destinationCoord[0] - userLocation[0]) - 1){
                return true;
            }
        }
    }else if(userLocation[0] > indexOfCentralRow - 2 && userLocation[0] < indexOfCentralRow + 2 && userLocation[0] > indexOfCentralRow){
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= 2 &&  userLocation[1] - destinationCoord[1] >= -2){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] <= 2 && userLocation[0] - destinationCoord[0] > 0){
            if(userLocation[1] - destinationCoord[1] <= 2 - 1 && userLocation[1] - destinationCoord[1] >= -2 - (destinationCoord[0] - userLocation[0]) -1){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -2 && userLocation[0] - destinationCoord[0] <= 0 && !(destinationCoord[0] > indexOfCentralRow && userLocation[0] <= indexOfCentralRow)){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2 + (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }else if(destinationCoord[0] > indexOfCentralRow && destinationCoord[0] - userLocation[0] <= 2 ){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2 - (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
    }
    else if(userLocation[0] < indexOfCentralRow + 1 - 2){
        if(userLocation[0] - destinationCoord[0] <= 2 && userLocation[0] - destinationCoord[0] >= 0){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2 - (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -2 && userLocation[0] - destinationCoord[0] <= 0){
            if(userLocation[1] - destinationCoord[1] <= 2 - (destinationCoord[0] - userLocation[0])  && userLocation[1] - destinationCoord[1] >= -2 ){
                return true;
            }
        }
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2){
                return true;
            }
        }
    }
    else if(userLocation[0] > indexOfCentralRow - 1 + 2){
        if(userLocation[0] - destinationCoord[0] <= 2 && userLocation[0] - destinationCoord[0] >= 0){
            if(userLocation[1] - destinationCoord[1] <= 2 + (destinationCoord[0] - userLocation[0])  && userLocation[1] - destinationCoord[1] >= -2 ){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -2 && userLocation[0] - destinationCoord[0] <= 0){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2 + (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2){
                return true;
            }
        }
    }
    else{
        if(userLocation[0] - destinationCoord[0] <= 2 && userLocation[0] - destinationCoord[0] >= 0){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2 - (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(userLocation[0] - destinationCoord[0] >= -2 && userLocation[0] - destinationCoord[0] <= 0){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2 + (destinationCoord[0] - userLocation[0])){
                return true;
            }
        }
        if(destinationCoord[0] === userLocation[0]){
            if(userLocation[1] - destinationCoord[1] <= 2 && userLocation[1] - destinationCoord[1] >= -2){
                return true;
            }
        }
    }

    return false;
}
export const isAvailableCellBishop = (userLocation:number[],destinationCoord:number[],indexOfCentralRow:number) => {
    if(destinationCoord[0] === userLocation[0]) return true;
    if(destinationCoord[1] === userLocation[1]) return true;

    return isAvailableCell(userLocation,destinationCoord,1,indexOfCentralRow);
}

export const boostersAvailableCellsFunctions:Record<string,(userLocation:number[],destinationCoord:number[],indexOfCentralRow:number) => boolean> = {
    [boostersTypesNames.increaseStepDistance]:(userLocation:number[],destinationCoord:number[],indexOfCentralRow:number) => isAvailableCellDoubleDistance(userLocation,destinationCoord,indexOfCentralRow),
    // [boostersTypesNames.bishopStep]:(userLocation:number[],destinationCoord:number[],indexOfCentralRow:number) => isAvailableCellBishop(userLocation,destinationCoord,indexOfCentralRow)
}