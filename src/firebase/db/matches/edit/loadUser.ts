import { playersColors } from './../../../../consts/playersColors';
import { playersSpawnLocations } from './../../../../consts/playersSpawnLocations';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const loadUser = async (matchId:string,playerId:string) => {
    try{
        console.log('loading start');
        const documentMatch = doc(db,collectionsKeys.matches,matchId);
        const documentUser = doc(db,collectionsKeys.users,playerId);
        const [match,user] = await Promise.all([
            (await getDoc(documentMatch)).data(),
            (await getDoc(documentUser)).data()
        ]);
        console.log('loading start 2',match,user);

        if(match?.loadedPlayers.includes(playerId) || match?.alivePlayers.includes(playerId)) return;

        await Promise.all([
            await updateDoc(documentMatch,{
                playersInQueue:match?.playersInQueue.filter((player:string) => player !== playerId),
                loadedPlayers:[...match?.loadedPlayers,playerId],
                alivePlayers:[...match?.alivePlayers,playerId],
            }),
            await updateDoc(documentUser,{
                location:playersSpawnLocations[match?.alivePlayers.length],
                color:playersColors[match?.alivePlayers.length],
                matchQueue:'',
                numberOfMatches:user?.numberOfMatches + 1
            })
        ]);
        console.log('loading start 3',{
            location:playersSpawnLocations[match?.alivePlayers.length],
            color:playersColors[match?.alivePlayers.length],
        });

        return {
            location:playersSpawnLocations[match?.alivePlayers.length],
            color:playersColors[match?.alivePlayers.length],
        }
    }catch(err){
        console.error(err);
    }
}