import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetBoardgameByCodeAPIWithoutUrl, callUpdateBoardgameAPI } from '../../apis/BoardgameAPICalls';

function BoardgameEditForm() {
    const { boardgameCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boardgame = useSelector(state => state.boardgameReducer);
    const boardgameDetail = boardgame.data;

    const [form, setForm] = useState({
        boardgameName: '',
        difficulty: '',
        releaseDate: '',
        minPlayer: '',
        maxPlayer: '',
        playtime: '',
        boardgameRule: '',
        boardgameImgURL1: '',
        boardgameImgURL2: '',
        boardgameImgURL3: ''
    });

    useEffect(() => {
        if (boardgameDetail) {
            setForm(boardgameDetail);
        }
    }, [boardgameDetail]);

    useEffect(() => {
        dispatch(callGetBoardgameByCodeAPIWithoutUrl({ boardgameCode }));
    }, [dispatch, boardgameCode]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };


    const onClickModifyHandler = (e)=>{
        e.preventDefault();
        dispatch(callUpdateBoardgameAPI({boardgameCode, form})).then(()=>{
            navigate(`/boardgame/boardgameDetails/${boardgameCode}`);
        })
    }

    const onClickBackHandler = () => {
        navigate(`/`);
    }

    return (
        <div className='registerCSS'>
            <h2>보드게임 수정</h2>
            <hr></hr>
            <div className='formTotal boardgameModifyCSS'>
                <table>
                    <colgroup>
                        <col style={{width:'17%'}}></col>
                        <col style={{width:'83%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td><input type="text" name="boardgameName" value={form.boardgameName} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>난이도</td>
                            <td><input type="text" name="difficulty" value={form.difficulty} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>출시일</td>
                            <td><input type="date" name="releaseDate" value={form.releaseDate} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>최소인원</td>
                            <td><input type="number" name="minPlayer" value={form.minPlayer} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>최대인원</td>
                            <td><input type="number" name="maxPlayer" value={form.maxPlayer} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>게임시간</td>
                            <td><input type="number" name="playtime" value={form.playtime} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>게임설명</td>
                            <td><textarea className='boardgameRule' name="boardgameRule" value={form.boardgameRule} onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>이미지 URL1</td>
                            <td><input type="text" name="boardgameImgURL1" value={form.boardgameImgURL1} readOnly="true" onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>이미지 URL2</td>
                            <td><input type="text" name="boardgameImgURL2" value={form.boardgameImgURL2} readOnly="true" onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td>이미지 URL3</td>
                            <td><input type="text" name="boardgameImgURL3" value={form.boardgameImgURL3} readOnly="true" onChange={onChangeHandler} /></td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className='bottomBtn'>
                                    <button className='registerBtn'
                                        onClick = { onClickModifyHandler }
                                    >   
                                        보드게임 수정
                                    </button>
                                    <button className='backBtn'
                                        onClick = { onClickBackHandler }
                                    >
                                        돌아가기
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}

export default BoardgameEditForm;

