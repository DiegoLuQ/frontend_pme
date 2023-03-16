import MainHeader from "./components/organismos/MainHeader";
import MainMenu from "./components/moleculas/header/MainMenu";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="max-w-[1440px] m-auto mb-5">
      <MainHeader>
        <MainMenu />
      </MainHeader>
      <div className="max-w-[1440px] m-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
