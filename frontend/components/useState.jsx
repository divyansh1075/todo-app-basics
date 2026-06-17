import { useState } from "react";

const Usestate = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1);
    }

    return(
        <div>
            <button onClick={increment}>Click for increment</button>
            <br></br>
             You have clicked count {count} times 

        </div>
)   
}

export default Usestate