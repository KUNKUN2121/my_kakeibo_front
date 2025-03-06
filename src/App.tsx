import {
    BrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
  import Home from './pages/Home';
import Detail from "./pages/Detail";
import BtmNav from "./components/BottomNavigation";
import { css } from "@emotion/react";
import "./styles/global.css";
import Calendar from "./pages/Calender";
import { useState } from "react";
  
const wapper = css`
    
    overflow: hidden;   
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 100dvh;
    overflow-y: hidden;
    
`;
  
  const App = () => {
    // ボトムナビゲーションのvalueを管理
    const [bottomNavValue, setBottomNavValue] = useState(0);
    return (
        <div css={wapper}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail' element={<Detail />}>
            <Route path=':id' element={<Detail />} />
          </Route>
          <Route path='/calender' element={<Calendar />} />

        </Routes>
        <BtmNav bottomNavValue={bottomNavValue} setBottomNavValue={setBottomNavValue} />
      </BrowserRouter>
      
      </div>
      
    )
  }
  
  export default App;