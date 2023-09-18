import { Navigate } from "react-router-dom";
import { Display } from "../../assets/Display"
import { maxPlayersNumber } from "../../consts/maxPlayersNumber";
import { useSearchMatch } from "../../hooks/searchMatch"
import { GameRulesLink, NumberOfPlayers, Rating, SupportLink, ToogleSearchButton } from "./styles";

export const MainSearchPage = () => {
    const {onStartSearch,isSearchStarted,localMatch,matchId,loading,onCancelSearch,isMatchReady,rating} = useSearchMatch();

    if(isMatchReady) return <Navigate to={`/match/${matchId}`}/>
    
    return <Display style={{alignItems:"center",width:"300px",height:'400px',flexDirection:'column',gap:'70px',padding:"40px 20px",background:'white',borderRadius:'20px'}}>
        <Rating>Rating:{rating}</Rating>
        <Display style={{flexDirection:'column',alignItems:'center'}}>
            <Display style={{height:'40px',alignItems:'center',flexDirection:'column',gap:'5px'}}>
                {!loading && !!localMatch?.playersInQueue?.length && isSearchStarted && <><Display>Looking for players</Display><Display>{localMatch?.playersInQueue?.length+`/`+maxPlayersNumber}</Display></>}
            </Display>
            <ToogleSearchButton $search={!isSearchStarted || loading} onClick={isSearchStarted ? onCancelSearch : onStartSearch}>{isSearchStarted ? `Cancel` : `Search`}</ToogleSearchButton>
        </Display>
        {/* <Display style={{gap:'10px'}}><GameRulesLink to={'/gameRules'}></GameRulesLink><SupportLink to={'/support'}></SupportLink></Display> */}
    </Display>
}