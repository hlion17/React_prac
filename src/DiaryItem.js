const DiaryItem = ({author, content, emotion, created_date}) => {
    return (
        <div className='DiaryItem'>
            <div className='info'>
                <span>작성자: {author} | 감정점수: {emotion}</span>
                <br />
                <span className='date'>{new Date(created_date).toLocaleDateString()}</span>
                <p className='content'>{content}</p>
            </div>
        </div>
    )
}

export default DiaryItem;