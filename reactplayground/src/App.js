import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import NoticeDetail from './pages/Board_Notice/NoticeDetail';
import NoticeModify from './pages/Board_Notice/NoticeModify';
import RegisterMenu from './pages/menu/RegisterMenu';
import Boardgame from './pages/boardgame/BoardGame';
import Menu from './pages/menu/Menu';
import SearchGame from './pages/boardgame/SearchGame';
import SearchMenu from './pages/menu/SearchMenu';
import RegisterGame from './pages/boardgame/RegisterGame';
import BoardgameDetail from './pages/boardgame/BoardgameDetail'; 
import MemberDetails from './pages/admin/MemberDetails';
import MemberModify from './pages/admin/MemberModify';
import MemberRegister from './pages/admin/MemberRegister';
import Shop from './pages/shop/Shop';
import ShopDetail from './pages/shop/ShopDetail';
import ShopRegister from './pages/shop/ShopRegister';
import ShopModify from './pages/shop/ShopModify';
import MenuDetail from './pages/menu/MenuDetail';
import Reservation from './pages/reservation/Reservation';
import MyReservation from './pages/reservation/MyReservation';
import BoardgameEditForm from './pages/boardgame/BoardGameEditForm';
import UpdateMenu from './pages/menu/UpdateMenu';

function App() {
  return (
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={ <Layout/> }>
            <Route index element={ <Boardgame /> }/>          
            <Route path="mypage" element={ <MyPageLayout/> } >
              <Route index element={ <Profile /> } />
              <Route path="profile" element={ <Profile /> } />
              <Route path="myreservation" element={ <MyReservation /> } />
              <Route path="memberUpdate" element={ <MemberUpdate /> } />
              <Route path="member" element={ <MemberManage /> } />
              <Route path="member/:memberCode" element={ <MemberDetails/>} />
              <Route path="member/memberModify/:memberCode" element={ <MemberModify/>} />
              <Route path="member/memberRegist" element={ <MemberRegister/>} />
            </Route>

            <Route path="board">
              <Route path="notice" element={<Notice/>}/>
              <Route path="notice/create" element={<CreateNotice/>}/>
              <Route path="notice/:noticeCode" element={<NoticeDetail/>}/>
              <Route path="notice/modify/:noticeCode" element={<NoticeModify/>}/>
            </Route>

            <Route path="boardgame" element={<Boardgame />} />
            <Route path="boardgame/register" element={<RegisterGame />} /> 
            <Route path="boardgame/search" element={<SearchGame />} />
            <Route path="boardgame/boardgameDetails/:boardgameCode" element={<BoardgameDetail />} /> 
            <Route path="menu" element={<Menu />} />
            <Route path="menu/menuDetails/:menuCode" element={<MenuDetail />} /> 
            <Route path="menu/register" element={<RegisterMenu />} />
            <Route path="menu/update/:menuCode" element={<UpdateMenu />} />
            <Route path="menu/search" element={<SearchMenu />} />
            <Route path="register-game" element={<RegisterGame />} />
            <Route path="/boardgame/regist" element={<RegisterGame />} />
            {/* <Route path="/boardgame/:boardgameCode" element={<BoardgameDetail />} /> */}
            <Route path="/boardgame/update/:boardgameCode" element={<BoardgameEditForm />} />



            <Route path="shop" element={ <Shop/>} />
            <Route path="shop/shopDetails/:shopCode" element={<ShopDetail/>}/>
            <Route path="shop/reservation/:shopCode" element={<Reservation/>}/>
            <Route path="shop/regist" element={ <ShopRegister/>} />
            <Route path="shop/update/:shopCode" element={<ShopModify/>} />
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