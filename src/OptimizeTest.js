import React, {useState, useEffect} from 'react';

const TextView = React.memo(({text}) => {
    useEffect(() => {
        console.log(`text :: updated : ${text}`);
    });
    return (<div>{text}</div>)
});

const CountView = React.memo(({count}) => {
    useEffect(() => {
        console.log(`count :: updated : ${count}`);
    });
    return (<div>{count}</div>);
})

const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [text, setText] = useState("");

    return (
        <div style={{padding: 20}}>
            <div>
                <h2>count</h2>
                <CountView count={count} />
                <button onClick={() => setCount(count + 1)} >+</button>
            </div>
            <div>
                <h2>text</h2>
                <TextView text={text} />
                <input onChange={(e) => setText(e.target.value)} />
            </div>
        </div>
    );
}

export default OptimizeTest