import { createMatchResult } from './../../matchResults/create/createMatchResult';
import { nextTurn } from './nextTurn';
import { updateDoc, doc, getDoc, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";
import { matchResultsCollection } from '../../matchResults/matchResult.collection';
import { maxPlayersNumber } from '../../../../consts/maxPlayersNumber';

export const eliminatePlayer = async (matchId?:string,userId?:string) => {
    try{
        if(!matchId || !userId) return;
        const matchDoc = doc(db,collectionsKeys.matches,matchId);
        const userDoc = doc(db,collectionsKeys.users,userId);
        const matchResultQuery = query(matchResultsCollection,where('match','==',matchId),limit(1));
        const [match,matchResult,] = await Promise.all([
             getDoc(matchDoc),
             (await getDocs(matchResultQuery)).docs
        ]);
        if(!matchResult) console.log('222',matchResult)
        console.log('ttt',matchResult[0]?.data()?.players,matchResult[0]?.data()?.players.some((player:{player:string,place:number}) => player.player === userId));
        if(matchResult[0]?.data()?.players.some((player:{player:string,place:number}) => player.player === userId)){console.log('kk'); return;}
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
        // if(!matchResult.length) {
        //     queries.push(async () => await createMatchResult(matchId,userId));
        // }else if(!matchResult[0]?.data()?.players.includes(userId)){
        queries.push(async () => await updateDoc(doc(db,collectionsKeys.matchResults,matchResult[0].id),{
            players:[{player:userId,place:maxPlayersNumber - matchResult[0]?.data()?.players.length}, ...matchResult[0]?.data()?.players]
        }));
        // }
        await Promise.all(queries?.map(q => q()));

        console.log('vvvv',userId,matchResult);
    }catch(err){
        console.error(err);
    }
}