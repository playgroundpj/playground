import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callLoginAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function LoginModal({setLoginModal}) {

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const onClickLoginHandler = () => {
        console.log('[LoginModal] Login Process Start!!');        
        window.localStorage.removeItem('accessToken');
        
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));

        setLoginModal(false);
        console.log('[LoginModal] Login Process End!!');
        alert('로그인이 완료되었습니다.');
        window.location.reload();
    }
    
    return (        
        <div >
            <div >
                <div >
                    <h1>로그인</h1>
                    <input 
                        type="text" 
                        name='memberId'
                        placeholder="아이디" 
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                    <input 
                        type="password"
                        name='memberPassword' 
                        placeholder="패스워드" 
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                    <button
                        onClick={ onClickLoginHandler }
                    >
                        로그인
                    </button>
                
                </div>
            </div>
        </div>
    )
}

export default LoginModal;