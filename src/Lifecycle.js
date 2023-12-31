import {useEffect, useState} from "react";

const UnmountTest = () => {

    useEffect(() => {
        console.log('Test Component Mounted!');
        return () => {
            console.log('Test Component Unmounted!');
        }
    }, [])

    return (<div>Unmount Component Test</div>)
}

const Lifecycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggle = () => setIsVisible(!isVisible);

    useEffect(() => {
        console.log('Mount!')
    }, []);

    useEffect(() => {
        console.log('Updated');
    });

    useEffect(() => {
        console.log(`count is updated: ${count}`);
        if (count > 5) {
            alert('count가 5가 넘었습니다. 1로 초기화 합니다.')
            setCount(1);
        }
    }, [count]);

    useEffect(() => {
        console.log(`text is updated: ${text}`)
    }, [text]);

    return (<div style={{padding: 20}}>
        <div>
            {count}
            <button onClick={() => setCount(count + 1)} >+</button>
        </div>
        <div>
            <input onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest/>}
        </div>
    </div>)
}

export default Lifecycle