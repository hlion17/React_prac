import { useState, useRef } from "react";

const DiaryEditor = ({ onCreate }) => {
  /**
   * React States
   */
  const [diary, setDiary] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  /**
   * React DOM Refs
   */
  const authorInput = useRef();
  const contentInput = useRef();

  /**
   * Handler Object
   * - StateHandler: 관련 상태(State)를 업데이트 하거나 저장
   * - StyleHandler: 관련 DOM Style 변경
   */
  const StateHandler = {
    setValue: (e) => {
      setDiary({
        ...diary,
        [e.target.name]: e.target.value,
      });
    },
    save: (e) => {
      if (!validateInput()) return;
      onCreate(diary.author, diary.content, diary.emotion);
      alert("저장성공");
      setDiary({ author: "", content: "", emotion: 1 });
    },
  };

  const StyleHandler = {
    warnStyle: (e) => {
      e.current.focus();
      e.current.classList.add("warn");
    },
    resetStyle: (e) => {
      e.current.classList.remove("warn");
    },
    resetStyleAll: (elements) => {
      for (const element of elements) {
        element.current.classList.remove("warn");
      }
    },
  };

  /**
   * Functions
   */
  const validateInput = () => {
    StyleHandler.resetStyleAll([authorInput, contentInput]);

    if (diary.author.length < 1) {
      alert("작성자는 최소 1글자 이상 입력해주세요");
      StyleHandler.warnStyle(authorInput);
      return false;
    }
    if (diary.content.length < 5) {
      alert("일기 본문은 최소 5글자 이상 입력해주세요");
      StyleHandler.warnStyle(contentInput);
      return false;
    }

    StyleHandler.resetStyleAll([authorInput, contentInput]);
    return true;
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          ref={authorInput}
          value={diary.author}
          onChange={StateHandler.setValue}
        />
      </div>
      <div>
        <textarea
          name="content"
          ref={contentInput}
          value={diary.content}
          onChange={StateHandler.setValue}
        ></textarea>
      </div>
      <div>
        <select
          name="emotion"
          value={diary.emotion}
          onChange={StateHandler.setValue}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div>
        <button onClick={StateHandler.save}>일기저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
