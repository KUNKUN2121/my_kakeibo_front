import {
    BrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
  import Home from './pages/Home';
import Detail from "./pages/Detail";
import BtmNav from "./components/BottomNavigation";
import { css } from "@emotion/react";
  
const wapper = css`
    height: 100dvh;
    overflow: hidden;   
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
`;
  
  const App = () => {
    return (
        <div css={wapper}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail' element={<Detail />}>
            <Route path=':id' element={<Detail />} />
          </Route>

        </Routes>
        <BtmNav />
      </BrowserRouter>
      
      </div>
      
    )
  }
  
  export default App;