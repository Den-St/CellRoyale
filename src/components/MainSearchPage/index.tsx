import { Display } from "../../assets/Display"
import { useSearchMatch } from "../../hooks/searchMatch"

export const MainSearchPage = () => {
    const {onStartSearch,isSearchStarted,match,matchId,loading} = useSearchMatch();

    return <Display width={'200px'} direction={'column'} gap={'10px'} padding={'20px'}>
        {isSearchStarted && <p>searching {match?.playersInQueue?.length}/4</p>}
        <button onClick={onStartSearch}>search</button>
    </Display>
}