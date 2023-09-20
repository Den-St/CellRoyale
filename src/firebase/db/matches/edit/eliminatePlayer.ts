import { nextTurn } from './nextTurn';
import { updateDoc, doc, getDoc, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";
import { matchResultsCollection } from '../../matchResults/matchResult.collection';
import { maxPlayersNumber } from '../../../../consts/maxPlayersNumber';
import { placeToRating } from '../../../../consts/placeToRating';

export const eliminatePlayer = async (matchId?:string,userId?:string) => {
    try{
        if(!matchId || !userId) return;
        const matchDoc = doc(db,collectionsKeys.matches,matchId);
        const userDoc = doc(db,collectionsKeys.users,userId);
        const matchResultQuery = query(matchResultsCollection,where('match','==',matchId),limit(1));
        const [match,matchResult,user] = await Promise.all([
             getDoc(matchDoc),
             (await getDocs(matchResultQuery)).docs,
             getDoc(userDoc),
        ]);
        if(matchResult[0]?.data()?.players.some((player:{player:string,place:number}) => player.player === userId))return;
        const queries = [];
        if(match?.data()?.activePlayer === userId) queries.push(async () => await nextTurn(matchId,userId));
        queries.push(
            async () => await updateDoc(matchDoc,{
                alivePlayers:match?.data()?.alivePlayers.filter((player:string) => player !== userId)
            })
        );

        queries.push(
            async () => await updateDoc(userDoc,{
                location:[],
                color:'',
            })
        );
        const place = maxPlayersNumber - matchResult[0]?.data()?.players.length

        queries.push(async () => await updateDoc(doc(db,collectionsKeys.matchResults,matchResult[0].id),{
            players:[{player:userId,place}, ...matchResult[0]?.data()?.players]
        }));
        
        queries.push(async () => await updateDoc(userDoc,{
            rating:user?.data()?.rating + placeToRating[place]
        }));
        console.log('i',placeToRating[place]);
        await Promise.all(queries?.map(q => q()));
    }catch(err){
        console.error(err);
    }
}