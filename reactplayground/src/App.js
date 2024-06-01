import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import AppCss from './App.modules.css';
import Layout from './layouts/Layout';
import MyPageLayout from './layouts/MyPageLayout';
import Profile from './pages/member/Profile';
import Main from './pages/Main';
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Error from './pages/Error';
import MemberUpdate from './pages/member/MemberUpdate';
import FindId from './pages/member/FindId';
import FindPassword from './pages/member/FindPassword';
import Notice from './pages/Board_Notice/Notice';
import MemberManage from './pages/admin/MemberManage';
import CreateNotice from './pages/Board_Notice/CreateNotice';
import NoticeDetail from './pages/Board_Notice/NoticeDetail'
import NoticeModify from './pages/Board_Notice/NoticeModify'
import Review from './pages/Board_Review/Review';
import CreateReview from './pages/Board_Review/CreateReview';

function App() {
  return (
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={ <Layout/> }>
            <Route index element={ <Main /> }/>          
            <Route path="mypage/*" element={ <MyPageLayout/> } >
              <Route index element={ <Profile /> } />
              <Route path="profile" element={ <Profile /> } />
              <Route path="profile/memberUpdate" element={ <MemberUpdate /> } />
              <Route path="member" element={ <MemberManage /> } />
            </Route>

            <Route path="board">
              <Route path="notice" element={<Notice/>}/>
              <Route path="notice/create" element={<CreateNotice/>}/>
              <Route path="notice/:noticeCode" element={<NoticeDetail/>}/>
              <Route path="notice/modify/:noticeCode" element={<NoticeModify/>}/>

              <Route path="review" element={<Review/>}/>
              <Route path="review/create" element={<CreateReview/>}/>
            </Route>




          </Route>

          <Route path="/login" element={ <Login/> } />
          <Route path="/register" element={ <Register/> } />
          <Route path="*" element={ <Error/> }/>
          <Route path="/findId" element={ <FindId/> } />
          <Route path="/findPassword" element={ <FindPassword/> } />

        </Routes>      
      </BrowserRouter>
  );
}

export default App;
