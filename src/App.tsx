import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Connection from './pages/Connection/Connection';
import Book from './pages/Book/Book';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import MyPage from './pages/MyPage/MyPage';

const App = () => {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/book/:bookId" element={<Book />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chatroom/:bookId" element={<ChatRoom />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

export default App;
