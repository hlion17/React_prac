import DiaryItem from "./DiaryItem";
import React, {useContext} from 'react';
import {DiaryStateContext} from "./App";

const DiaryList = () => {

    const diaryList = useContext(DiaryStateContext);
    const renderDiaryItems = (diaryList) => diaryList.map((item) => (
        <DiaryItem key={item.id} {...item} />
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