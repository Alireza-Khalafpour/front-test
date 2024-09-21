"use client";

import { useAppContext } from "@/utils/AppWrapper";
import { LogoutRounded } from "@mui/icons-material";

const LogoutButton = () => {
    const {setToken} = useAppContext()

    const handleLogout = () => {
        setToken("")
        localStorage.removeItem("token")
    }

  return (
    <div className="">
      <button onClick={() => handleLogout()} type="button" className="p-3 rounded-full bg-red-700 hover:bg-red-500 text-center text-white border-2 cursor-pointer">
        <LogoutRounded /> 
        خروج
      </button>
    </div>
  );
};

export default LogoutButton;
