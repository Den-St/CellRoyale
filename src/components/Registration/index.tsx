import { Display } from "../../assets/Display"

export const Registration = () => {
    
    return <Display direction="column" gap={'10px'}>
        <input placeholder="email"/>
        <input placeholder="password"/>
        <button>SUBMIT</button>
    </Display>
}