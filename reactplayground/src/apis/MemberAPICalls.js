import { GET_MEMBER_NICKNAME } from '../modules/CheckModule';
import { GET_MANAGER, POST_MANAGER, PUT_MANAGER } from '../modules/ManagerModule';
import { 
    GET_MEMBER
    , POST_LOGIN
    , POST_REGISTER
    , GET_NUMBER
    , GET_MEMBER_ID
    , PUT_MEMBER
    , DELETE_MEMBER
    , GET_MEMBER_NUMBER,
    POST_FIND_PASSWORD,
    GET_MEMBER_LIST
} from '../modules/MemberModule';



import { startLoading, stopLoading } from './../components/common/actions';

export const callGetMemberAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/${memberId}`;

    return async (dispatch, getState) => {

        dispatch(startLoading());
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        try{
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
                }
            })
            .then(response => response.json());

            console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);

            dispatch({ type: GET_MEMBER,  payload: result });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
        dispatch(stopLoading());
        }
    };
}

export const callGetMemberByCodeAPI = ({memberCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/memberdetails/${memberCode}`;

    return async (dispatch, getState) => {

        dispatch(startLoading());
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        try{
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
                }
            })
            .then(response => response.json());

            console.log('[MemberAPICalls] callGetMemberByCodeAPI RESULT : ', result);

            dispatch({ type: GET_MEMBER,  payload: result });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
        dispatch(stopLoading());
        }
    };
}

export const callGetMemberListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/`;

    return async (dispatch, getState) => {

        dispatch(startLoading());
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        try{
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
                }
            })
            .then(response => response.json());

            console.log('[MemberAPICalls] callGetMemberListAPI RESULT : ', result);

            dispatch({ type: GET_MEMBER_LIST,  payload: result });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
        dispatch(stopLoading());
        }
    };
}

export const callLoginAPI = ({form}) => {

    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/login`;
    return async (dispatch, getState) => {

        dispatch(startLoading());
        /* 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능 */
        /* 서버에서 cors 허용을 해주어야 함 */
        /* headers에 Access-Control-Allow-Origin을 *로 해서 모든 도메인에 대해 허용한다. */
        try{

            const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"      
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword
            })
            })
            .then(response => response.json());

            console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
            if(result.status === 200){
                window.localStorage.setItem('accessToken', result.data.accessToken);            
            }
            dispatch({ type: POST_LOGIN,  payload: result });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
        dispatch(stopLoading());
        }
        
    };
}


export const callLogoutAPI = () => {
    

    return async (dispatch, getState) => {            

        dispatch({ type: POST_LOGIN,  payload: '' });        
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
}


export const callRegisterAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/signup`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword,          
                memberNickname: form.memberNickname,          
                memberBirth: form.memberBirth,          
                memberPhonenumber: form.memberPhonenumber,          
                memberAddress: form.memberAddress,          
                memberEmail: form.memberEmail,          
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_REGISTER,  payload: result });
        }        
    };
}

export const callManagerRegisterAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/memberRegist`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword,          
                memberNickname: form.memberNickname,          
                memberBirth: form.memberBirth,          
                memberPhonenumber: form.memberPhonenumber,          
                memberAddress: form.memberAddress,          
                memberEmail: form.memberEmail,          
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callManagerRegisterAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_REGISTER,  payload: result });
        }        
    };
}

export const callGetNumberAPI = ({memberPhonenumber}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/sendMessage/${memberPhonenumber}`;

    return async (dispatch, getState) => {

        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    
                }
            });

            let result;

            if (response.ok) {
                result = await response.json();
            } else {
                result = { message: '발신번호 미등록' };
            }

            console.log('[MemberAPICalls] callGetNumberAPI RESULT : ', result);

            dispatch({ type: GET_NUMBER, payload: result });

        } catch (error) {
            console.error('API call failed:', error);

            const result = { message: '발신번호 미등록' };
            dispatch({ type: GET_NUMBER, payload: result });
        }

    }

}

export const callGetMemberIdAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/memberId/${memberId}`;

    return async (dispatch, getState) => {

        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                }
            });

            let result;

            if (response.ok) {
                result = await response.json();
            } else {
                result = { message: '사용 가능한 아이디입니다' };
            }

            console.log('[MemberAPICalls] callGetMemberIdAPI RESULT : ', result);

            dispatch({ type: GET_MEMBER_ID, payload: result });

        } catch (error) {
            console.error('API call failed:', error);

            const result = { message: '사용 가능한 아이디입니다' };
            dispatch({ type: GET_MEMBER_ID, payload: result });
        }
    }
}

export const callGetMemberNicknameAPI = ({memberNickname}) => {
    const encodedNickname = encodeURIComponent(memberNickname);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/memberNickname/${encodedNickname}`;

    return async (dispatch, getState) => {

        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                }
            });

            let result;

            if (response.ok) {
                result = await response.json();
            } else {
                result = { message: '사용 가능한 닉네임입니다' };
            }

            console.log('[MemberAPICalls] callGetMemberNicknameAPI RESULT : ', result);

            dispatch({ type: GET_MEMBER_NICKNAME, payload: result });

        } catch (error) {
            console.error('API call failed:', error);

            const result = { message: '사용 가능한 닉네임입니다' };
            dispatch({ type: GET_MEMBER_NICKNAME, payload: result });
        }
    }
}

export const callGetMemberNumberIdAPI = ({memberPhonenumber}) => {
    console.log('[API] memberPhonenumber : ', memberPhonenumber)
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/memberPhonenumber/${memberPhonenumber}`;

    return async (dispatch, getState) => {

        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                }
            });

            let result;

            if (response.ok) {
                result = await response.json();
            } else {
                result = { message: '존재하지 않는 아이디입니다' };
            }

            console.log('[MemberAPICalls] callGetMemberNumberIdAPI RESULT : ', result);

            dispatch({ type: GET_MEMBER_NUMBER, payload: result });

        } catch (error) {
            console.error('API call failed:', error);

            const result = { message: '존재하지 않는 아이디입니다' };
            dispatch({ type: GET_MEMBER_NUMBER, payload: result });
        }
    }
}


export const callGetFindPasswordAPI = ({form}) => {
    console.log('[MemberAPICalls] callGetFindPasswordAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/findPassword`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPhonenumber: form.memberPhonenumber,          
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callGetFindPasswordAPI RESULT : ', result);        
        
        if(result.status === 200){
            dispatch({ type: POST_FIND_PASSWORD,  payload: result });
        }        
    };

}

export const callMemberUpdateAPI = ({form}) => {
    console.log('[MemberAPICalls] callMemberUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members`;


    return async (dispatch, getState) => {

        dispatch(startLoading());
        try{

            const formData = new FormData();
            formData.append("memberId", form.memberId);
            formData.append("memberPassword", form.memberPassword);          
            formData.append("memberNickname", form.memberNickname);          
            formData.append("memberBirth", form.memberBirth);          
            formData.append("memberPhonenumber", form.memberPhonenumber);          
            formData.append("memberAddress", form.memberAddress);          
            formData.append("memberEmail", form.memberEmail);


            const result = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: formData
            })
            .then(response => response.json());

            console.log('[MemberAPICalls] callMemberUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_MEMBER,  payload: result });

        }catch (error) {
            console.error('API call failed:', error);
        } finally {
        dispatch(stopLoading());
        }


    }

}


export const callDeleteMemberAPI = ({memberId}) => {
    console.log('[MemberAPICalls] callDeleteMemberAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members`;


    return async (dispatch, getState) => {

        dispatch(startLoading());
        try{

            const formData = new FormData();
            formData.append("memberId", memberId);


            const result = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: formData
            })
            .then(response => response.json());

            console.log('[MemberAPICalls] callDeleteMemberAPI RESULT : ', result);

        dispatch({ type: PUT_MEMBER,  payload: result });

        }catch (error) {
            console.error('API call failed:', error);
        } finally {
        dispatch(stopLoading());
        }


    }

}

export const callManagerStoreByMemberCodeAPI = ({memberCode}) => {

    console.log('[MemberAPICalls] callManagerStoreByMemberCodeAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/managerStore/${memberCode}`;

    return async (dispatch, getState) => {
        let result = null; 

        try{
            result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
                }
            })
            .then(response => response.json());
    
            // console.log('[MemberAPICalls] callManagerStoreByMemberCodeAPI RESULT : ', result);
    
            dispatch({ type: GET_MANAGER,  payload: result });

        }catch(error) {
            result = { result: error.message };
        } finally {
            dispatch({ type: GET_MANAGER, payload: result }); 
        }
        
    }

}


export const callManagerRegistAPI = ({form}) => {

    console.log('[MemberAPICalls] callManagerRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/register`;

    return async (dispatch, getState) => {
        let result = null; 

        try{
            const result = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
                },
                body: JSON.stringify({
                    memberCode: form.memberCode,
                    storeCode: form.storeCode
                })
                })
                .then(response => response.json());
    
                console.log('[MemberAPICalls] callLoginAPI callManagerRegistAPI : ', result);
    
                dispatch({ type: POST_MANAGER,  payload: result });
        }catch (error) {
            dispatch({ type: POST_MANAGER,  payload: error });
            result = { error: error.message };
        } finally {
            dispatch({ type: POST_MANAGER, payload: result }); // 성공 또는 실패 모두 디스패치
        }
    }

}

export const callUpdateManagerAPI = ({form}) => {

    console.log('[MemberAPICalls] callUpdateManagerAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members/modify`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body: JSON.stringify({
                memberCode: form.memberCode,
                storeCode: form.storeCode
            })
            })
            .then(response => response.json());

            console.log('[MemberAPICalls] callUpdateManagerAPI : ', result);

            dispatch({ type: PUT_MANAGER,  payload: result });
    }

    
}


export const callDeleteManagerAPI = ({memberCode}) => {
    console.log('[MemberAPICalls] callDeleteManagerAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/members`;


    return async (dispatch, getState) => {

        dispatch(startLoading());
        try{


            const result = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    memberCode: memberCode,
                })
                })
            .then(response => response.json());

            console.log('[MemberAPICalls] callDeleteManagerAPI RESULT : ', result);

        dispatch({ type: DELETE_MEMBER,  payload: result });

        }catch (error) {
            console.error('API call failed:', error);
        } finally {
        dispatch(stopLoading());
        }


    }

}