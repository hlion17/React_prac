import React, {useState, useEffect} from 'react';

const CountA = React.memo(({count}) => {

    useEffect(() => {
        console.log(`Counter A updated :: count - ${count}`);
    })

    return (<div>{count}</div>)
});

const CountB = React.memo(({obj}) => {

    useEffect(() => {
        console.log(`Counter B updated :: ojb.count - ${obj.count}`);
    })

    return (<div>{obj.count}</div>)
})

const MemoizedCounterB = React.memo(CountB,
    (prevProps, nextProps) => {
        return prevProps.obj.count === nextProps.obj.count
    });

const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1,
    });

    return (
        <div style={{padding: 20}}>
            <div>
                <h2>Counter A</h2>
                <CountA count={count} />
                <button onClick={() => setCount(count)}>A Button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                {/*<CountB obj={obj} />*/}
                <MemoizedCounterB obj={obj} />
                <button onClick={() => setObj({
                    count: obj.count,
                })}>B Button</button>
            </div>
        </div>
    );
}

export default OptimizeTest