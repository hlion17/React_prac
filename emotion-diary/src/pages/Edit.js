import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);

    const [originData, setOriginData] = useState([]);

    useEffect(() => {
        const targetDiary = diaryList.find(it => parseInt(it.id) === parseInt(id));

        if (targetDiary) {
            setOriginData(targetDiary);
        } else {
            navigate("/", {replace: true});
        }
    }, [id, diaryList]);

    return (
        <div className={"Edit"}>
            {originData && <DiaryEditor
                isEdit={true}
                originData={originData}
            />}
        </div>
    );
}

export default Edit;