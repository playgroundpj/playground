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

import Notice from './pages/Board_Notice/Notice';
import CreateNotice from './pages/Board_Notice/CreateNotice';

function App() {
  return (
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={ <Layout/> }>
            <Route index element={ <Main /> }/>          
            <Route path="mypage" element={ <MyPageLayout/> } >
              <Route index element={ <Profile /> } />
              <Route path="profile" element={ <Profile /> } />
              <Route path="profile/memberUpdate" element={ <MemberUpdate /> } />
              
            </Route>

            <Route path="board">
              <Route path="notice" element={<Notice/>}/>
              <Route path="notice/create" element={<CreateNotice/>}/>
              
            </Route>

          </Route>

          <Route path="/login" element={ <Login/> } />
          <Route path="/register" element={ <Register/> } />
          <Route path="*" element={ <Error/> }/>

        </Routes>      
      </BrowserRouter>
  );
}

export default App;
