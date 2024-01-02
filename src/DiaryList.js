import DiaryItem from "./DiaryItem";
import React from 'react';

const DiaryList = ({onRemove, diaryList, onEdit}) => {
    const renderDiaryItems = (diaryList) => diaryList.map((item) => (
        <DiaryItem key={item.id} {...item} handleContentRemoval={onRemove} handleContentEdit={onEdit}/>
    ));

    return (
        <div className='DiaryList'>
            <h2>일기 리스트</h2>
            <h4>{diaryList.length} 개의 일기가 있습니다.</h4>
            <div>
                {renderDiaryItems(diaryList)}
            </div>
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default React.memo(DiaryList);