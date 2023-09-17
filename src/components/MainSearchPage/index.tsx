import { Navigate } from "react-router-dom";
import { Display } from "../../assets/Display"
import { useSearchMatch } from "../../hooks/searchMatch"

export const MainSearchPage = () => {
    const {onStartSearch,isSearchStarted,localMatch,matchId,loading,onCancelSearch,isMatchReady} = useSearchMatch();

    if(isMatchReady) return <Navigate to={`/match/${matchId}`}/>
    
    return <Display width={'200px'} direction={'column'} gap={'10px'} $padding={'20px'}>
        {isSearchStarted && <p>searching {localMatch?.playersInQueue?.length}/4</p>}
        <button disabled={isSearchStarted} onClick={onStartSearch}>search</button>
        {isSearchStarted && <button onClick={onCancelSearch}>cancel</button>}
    </Display>
}