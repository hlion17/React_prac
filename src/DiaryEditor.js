import React, {useState, useRef, useContext} from "react";
import {DiaryDispatchContext} from "./App";

// initial state for the diary
const INITIAL_DIARY_STATE = {author: "", content: "", emotion: 1};

const DiaryEditor = () => {

    const {handleContentCreate} = useContext(DiaryDispatchContext);

    const [diary, setDiary] = useState(INITIAL_DIARY_STATE);

    const authorInput = useRef();
    const contentInput = useRef();

    const setDiaryValue = (e) => {
        setDiary({
            ...diary,
            [e.target.name]: e.target.value,
        });
    };

    const resetStylesAndDiaryState = () => {
        alert("저장성공");
        resetStyles([authorInput, contentInput]);
        setDiary(INITIAL_DIARY_STATE);
    };

    const handleSave = (e) => {
        if (!validateInput()) return;
        handleContentCreate(diary);
        resetStylesAndDiaryState();
    };

    const resetStyles = (elements) => {
        for (const element of elements) {
            element.current.classList.remove("warn");
        }
    };

    const validateInput = () => {
        resetStyles([authorInput, contentInput]);
        if (diary.author.length < 1) {
            alert("작성자는 최소 1글자 이상 입력해주세요");
            warnStyle(authorInput);
            return false;
        }
        if (diary.content.length < 5) {
            alert("일기 본문은 최소 5글자 이상 입력해주세요");
            warnStyle(contentInput);
            return false;
        }
        return true;
    };

    const warnStyle = (e) => {
        e.current.focus();
        e.current.classList.add("warn");
    };

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    name="author"
                    ref={authorInput}
                    value={diary.author}
                    onChange={setDiaryValue}
                />
            </div>
            <div>
        <textarea
            name="content"
            ref={contentInput}
            value={diary.content}
            onChange={setDiaryValue}
        ></textarea>
            </div>
            <div>
                <select
                    name="emotion"
                    value={diary.emotion}
                    onChange={setDiaryValue}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>
            <div>
                <button onClick={handleSave}>일기저장하기</button>
            </div>
        </div>
    );
};

export default React.memo(DiaryEditor);
