import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
import React, {useReducer, useRef} from "react";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT":
            return action.data;
        case "CREATE":
            newState = [action.data, ...state];
            break;
        case "REMOVE":
            newState = state.filter(it => it.id !== action.targetId);
            break;
        case "EDIT":
            newState = state.map(it => it.id === action.data.id ? {...action.data} : it);
            break;
        default:
            return state;
    }
    return newState;
};

const dummyData = [
    {
        id: 1,
        emotion: 1,
        content: "대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.",
        date: 1704369223678,
    },
    {
        id: 2,
        emotion: 2,
        content: "환경권의 내용과 행사에 관하여는 법률로 정한다. 정당의 설립은 자유이며, 복수정당제는 보장된다.",
        date: 1704369223679,
    },
    {
        id: 3,
        emotion: 3,
        content: "일반사면을 명하려면 국회의 동의를 얻어야 한다. 위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.",
        date: 1704369223680,
    },
    {
        id: 4,
        emotion: 4,
        content: "감사원은 원장을 포함한 5인 이상 11인 이하의 감사위원으로 구성한다.",
        date: 1704369223681,
    },
    {
        id: 5,
        emotion: 5,
        content: "법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은 헌법재판소에 제청하여 그 심판에 의하여 재판한다.",
        date: 1704369223682,
    },
]

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

    const [data, dispatch] = useReducer(reducer, dummyData);

    const dataId = useRef(6);



    // CREATE
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: "CREATE",
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            }
        });
        dataId.current += 1;
    };

    // REMOVE
    const onRemove = (targetId) => {
        dispatch({type: "REMOVE", targetId});
    }

    // EDIT
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: "EDIT",
            data: {
                targetId: targetId,
                date: new Date(date).getTime(),
                content: content,
                emotion: emotion,
            }
        })
    }

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/edit/:id" element={<Edit/>}/>
                            <Route path="/new" element={<New/>}/>
                            <Route path="/diary/:id" element={<Diary/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

    export default App;
