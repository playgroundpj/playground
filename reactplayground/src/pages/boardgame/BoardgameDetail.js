import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetBoardgameAPI } from '../../apis/BoardgameAPICalls';
import { Carousel } from 'react-bootstrap';


function BoardgameDetail() {

    const { boardgameCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boardgame = useSelector(state => state.boardgameReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const [isAuth, setAuth] = useState('');
    const boardgameDetail = boardgame.data;
    const getBoardgameCode = boardgameCode;

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }

    const onClickModifyHandler = (getBoardgameCode) => {
        navigate(`/boardgame/update/${getBoardgameCode}`);
    }

    const onClicReservationHandler = (getBoardgameCode) => {
        navigate(`/boardgame/reservation/${getBoardgameCode}`);
    }
    
    useEffect(
        () => {

            dispatch(callGetBoardgameAPI({boardgameCode}));

        },[]
    )

    useEffect(
        () => {
            if(isLogin !== undefined && isLogin !== null) {
                setAuth(token.auth[0]);
            }   

        },[token]
    )


    return (
        <div className='profileDiv'  >
            <h2> 상세 정보 - {boardgameDetail.boardgameName}</h2>
            <div className='formTotal BoardgameDetialForm'>
                <table>
                    <colgroup>
                        <col style={{width:'50%'}}></col>
                        <col style={{width:'15%'}}></col>
                        <col style={{width:'35%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className='boardgameImg' rowSpan={7}> 
                                    <Carousel>
                                        <Carousel.Item>
                                        <img
                                            className="d-block w-100 custom-img"
                                            src={boardgameDetail.boardgameImgURL1}
                                            alt="First slide"
                                        />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                        <img
                                            className="d-block w-100 custom-img"
                                            src={boardgameDetail.boardgameImgURL1}
                                            alt="Second slide"
                                        />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                        <img
                                            className="d-block w-100 custom-img"
                                            src={boardgameDetail.boardgameImgURL1}
                                            alt="Third slide"
                                        />
                                        </Carousel.Item>
                                    </Carousel>
                                </td>
                        </tr>
                        <tr>
                            
                            <td className='captionCSS'><span>난이도</span>|</td>
                            <td>{boardgameDetail.difficulty}</td>
                        </tr>
                        <tr>
                            <td className='captionCSS'><span>출시일</span>|</td>
                            <td>{boardgameDetail.releaseDate}</td>
                        </tr>
                        <tr>
                            <td className='captionCSS'><span>최소인원</span>|</td>
                            <td>{boardgameDetail.minPlayer}명</td>
                        </tr>
                        <tr>
                            <td className='captionCSS'><span>최대인원</span>|</td>
                            <td>{boardgameDetail.maxPlayer}명</td>
                        </tr>
                        <tr>
                            <td className='captionCSS'><span>게임시간</span>|</td>
                            <td>{boardgameDetail.playtime}분</td>
                        </tr>
                        <tr>
                            <td className='captionCSS'><span>게임설명</span>|</td>
                            <td>{boardgameDetail.boardgameRule}</td>
                        </tr>
                        <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        {(isAuth == 'ROLE_ADMIN') && 
                                        <button className='registerBtn'
                                            onClick = { () => onClickModifyHandler(boardgameCode) }
                                        >   
                                            매장 정보 수정
                                        </button>
                                        }
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

export default BoardgameDetail;