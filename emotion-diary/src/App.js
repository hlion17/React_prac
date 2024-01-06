import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
import React, {useEffect, useReducer, useRef} from "react";

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

    localStorage.setItem("diary", JSON.stringify(newState));
    return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

    useEffect(() => {
        const localData = localStorage.getItem("diary");
        if (localData) {
            const diaryList = JSON.parse(localStorage.getItem("diary")).sort((a, b) => parseInt(b.id) - parseInt(a.id));
            dataId.current = parseInt(diaryList[0].id) + 1;

            dispatch({type: "INIT", data: diaryList});
        }
    }, []);

    const [data, dispatch] = useReducer(reducer, []);
    const dataId = useRef(0);

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
                id: targetId,
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
