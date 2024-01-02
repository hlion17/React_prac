import React, {useContext, useRef, useState} from "react";
import {DiaryDispatchContext} from "./App";

const DiaryItem = ({id, author, content, emotion, created_date}) => {
    const {handleContentRemoval, handleContentEdit} = useContext(DiaryDispatchContext);

    const [isEditMode, setEditMode] = useState(false);
    const userTextInput = useRef();
    const [userContent, setUserContent] = useState(content);

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
    }

    const toggleEditModeWithReset = () => {
        setEditMode(!isEditMode);
        setUserContent(content);
    }

    const handleRemoval = () => {
        if (window.confirm(`Delete item with id ${id}?`)) {
            handleContentRemoval(id);
        }
    }

    const isContentValid = () => {
        if (userContent.length < 5) {
            userTextInput.current.focus();
            return false;
        }
        return window.confirm(`Edit the entry with id ${id}?`);
    }

    const handleEdit = () => {
        if (isContentValid()) {
            handleContentEdit(id, userContent);
            toggleEditMode();
        }
    }

    return (
        <div className='DiaryItem'>
            <div className='info'>
                <span>Author: {author} | Emotion Score: {emotion}</span>
                <br/>
                <span className='date'>{new Date(created_date).toLocaleDateString()}</span>
                <p className='content'>
                    {isEditMode ? (
                            <textarea ref={userTextInput} value={userContent}
                                      onChange={(e) => setUserContent(e.target.value)}/>
                        )
                        : (
                            <>{content}</>
                        )
                    }
                </p>
            </div>
            {isEditMode ? (
                <>
                    <button onClick={toggleEditModeWithReset}>Cancel Edit</button>
                    <button onClick={handleEdit}>Confirm Edit</button>
                </>
            ) : (
                <>
                    <button onClick={handleRemoval}>Delete</button>
                    <button onClick={toggleEditMode}>Edit</button>
                </>
            )}
        </div>
    )
}
export default React.memo(DiaryItem);