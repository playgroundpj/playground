import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import MyPageLayout from './layouts/MyPageLayout';
import Profile from './pages/member/Profile';
import Main from './pages/Main';
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Error from './pages/Error';
import RegisterMenu from './pages/menu/RegisterMenu';
import Boardgame from './pages/boardgame/BoardGame';
import Menu from './pages/menu/Menu';
import SearchGame from './pages/boardgame/SearchGame';
import SearchMenu from './pages/menu/SearchMenu';
import RegisterGame from './pages/boardgame/RegisterGame';
import BoardgameDetail from './pages/boardgame/BoardgameDetail'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="mypage" element={<MyPageLayout />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="boardgame" element={<Boardgame />} />
          <Route path="boardgame/register" element={<RegisterGame />} /> 
          <Route path="boardgame/search" element={<SearchGame />} />
          <Route path="boardgame/:id" element={<BoardgameDetail />} /> {/* BoardgameDetail 라우트 추가 */}
          <Route path="menu" element={<Menu />} />
          <Route path="menu/register" element={<RegisterMenu />} />
          <Route path="menu/search" element={<SearchMenu />} />
          <Route path="register-game" element={<RegisterGame />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
