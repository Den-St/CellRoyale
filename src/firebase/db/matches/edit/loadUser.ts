import { playersColors } from './../../../../consts/playersColors';
import { playersSpawnLocations } from './../../../../consts/playersSpawnLocations';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const loadUser = async (matchId:string,playerId:string) => {
    try{
        const documentMatch = doc(db,collectionsKeys.matches,matchId);
        const documentUser = doc(db,collectionsKeys.users,playerId);
        const match = (await getDoc(documentMatch)).data();

        if(match?.loadedPlayers.includes(playerId) || match?.alivePlayers.includes(playerId)) return;

        await Promise.all([
            await updateDoc(documentMatch,{
                playersInQueue:match?.playersInQueue.filter((player:string) => player !== playerId),
                loadedPlayers:[...match?.loadedPlayers,playerId],
                alivePlayers:[...match?.alivePlayers,playerId],
            }),
            await updateDoc(documentUser,{
                location:[],
                matchQueue:''
            })
        ]);

    }catch(err){
        console.error(err);
    }
}