import { playersSpawnLocations } from './../../../../consts/playersSpawnLocations';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { playersColors } from '../../../../consts/playersColors';
import { db } from '../../../firebaseInit';
import { collectionsKeys } from '../../collectionsKeys';
import { maxPlayersNumber } from './../../../../consts/maxPlayersNumber';

export const giveUsersMatchInfo = async (matchId:string) => {
    try{
        const documentMatch = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(documentMatch)).data();

        if(!match) return;
        if(match.loadedPlayers?.length !== maxPlayersNumber || match.alivePlayers?.length !== maxPlayersNumber) return;

        const queries:any[] = [];

        match.loadedPlayers.forEach(async (playerId:string,i:number) => {
            const userDoc = doc(db,collectionsKeys.users,playerId);
            queries.push(
                async () => {
                    await updateDoc(userDoc,{
                        location:playersSpawnLocations[i],
                        color:playersColors[i],
                        matchQueue:'',
                    });
                }
            );
        });

        await Promise.all(queries?.map(q => q()));
    }catch(err){
        console.error(err);
    }
}