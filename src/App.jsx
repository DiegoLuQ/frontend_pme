import MainHeader from "./components/organismos/MainHeader";
import MainMenu from "./components/moleculas/header/MainMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      navigate('/user/colegios')
    }

  }, [])
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
