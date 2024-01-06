import MyHeader from "./MyHeader";
import MyButton from "./MyButton";

import {useNavigate} from "react-router-dom";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import EmotionItem from "./EmotionItem";
import {DiaryDispatchContext} from "../App";

import {getStringDate} from "../util/DateUtils";
import {emotionList} from "../util/Emotion";

const DiaryEditor = ({isEdit, originData}) => {

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(originData.date)));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    const navigate = useNavigate();
    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);
    const contentRef = useRef();
    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("");

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    }, []);

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 저장하시겠습니까?")) {
            if (!isEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, date, content, emotion);
            }
        }

        navigate("/", {replace: true});
    }

    const handleRemove = () => {
        if (window.confirm("정말삭제하시겠습니까?")) {
            onRemove(originData.id);
            navigate("/", {replace: true});
        }
    }

    return (
        <div className={"DiaryEditor"}>
            <MyHeader
                headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                leftChild={<MyButton text={"뒤로가기"} onClick={() => navigate(-1)}/>}
                rightChild={<MyButton text={"삭제하기"} onClick={handleRemove} type={"negative"} />}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className={"input_box"}>
                        <input
                            className={"input_date"}
                            type={"date"}
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className={"input_box emotion_list_wrapper"}>
                        {emotionList.map(it => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className={"input_bot text_wrapper"}>
                        <textarea
                            placeholder={"오늘은 어땟나요?"}
                            ref={contentRef}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className={"control_box"}>
                        <MyButton text={"취소하기"} onClick={e => navigate(-1)} />
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DiaryEditor