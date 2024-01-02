import React, {useRef, useState} from "react";

const DiaryItem = ({id, author, content, emotion, created_date, handleContentRemoval, handleContentEdit}) => {
    const [isEditMode, setEditMode] = useState(false);
    const userTextInput = useRef();
    const [userContent, setUserContent] = useState(content);

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
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
                    <button onClick={toggleEditMode}>Cancel Edit</button>
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