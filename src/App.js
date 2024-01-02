import "./App.css";
import React, {useCallback, useEffect, useMemo, useReducer, useRef} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const Actions = {
    INIT: 'INIT',
    CREATE: 'CREATE',
    REMOVE: 'REMOVE',
    EDIT: 'EDIT',
};

const reducer = (state, action) => {
    switch (action.type) {
        case Actions.INIT:
            return action.data;
        case Actions.CREATE:
            return [
                {...action.data, created_date: Date.now()},
                ...state
            ];
        case Actions.REMOVE:
            return state.filter(it => it.id !== action.id);
        case Actions.EDIT:
            return state.map(it => (it.id === action.id ? {...it, content: action.content} : it));

        default:
            return state;
    }
}

const createDiaryEntry = (dataId, it) => ({
    author: it.email,
    content: it.body,
    emotion: Math.floor(Math.random() * 3) + 1,
    created_date: Date.now(),
    id: dataId.current++,
});

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    const dataId = useRef(0);

    const getData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
        const initData = res.slice(0, 20).map(it => createDiaryEntry(dataId, it));
        dispatch({type: Actions.INIT, data: initData});
    }

    useEffect(() => {
        getData();
    }, []);

    const handleContentCreate = useCallback((data) => {
        dispatch({type: Actions.CREATE, data: {...data, id: dataId.current}});
        dataId.current += 1;
    }, []);

    const handleContentRemoval = useCallback((id) => {
        dispatch({type: Actions.REMOVE, id});
    }, []);

    const handleContentEdit = useCallback((id, content) => {
        dispatch({type: Actions.EDIT, id, content});
    }, []);

    const memoizedDispatches = useMemo(() => {
        return {handleContentCreate, handleContentRemoval, handleContentEdit}
    }, [])

    const {goodCount, badCount, goodRatio} = useMemo(() => {
        const goodCount = data.filter((it) => it.emotion > 1).length;
        return {
            goodCount,
            badCount: data.length - goodCount,
            goodRatio: goodCount / data.length * 100
        };
    }, [data.length]);

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={memoizedDispatches}>
                <div className="App">
                    <DiaryEditor />
                    <div>전체일기: {data.length}</div>
                    <div>기분좋은 일기 개수: {goodCount}</div>
                    <div>기분나쁜 일기 개수: {badCount}</div>
                    <div>기분좋은 일기 비율: {goodRatio}%</div>
                    <DiaryList />
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
