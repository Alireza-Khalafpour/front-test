"use client";

import { useAppContext } from "@/utils/AppWrapper";
import { Login } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorAlert from "../modules/ErrorAlert";

const LoginPage = () => {
  const baseURL = "https://reqres.in/";
  const router = useRouter();
  const { setToken } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [responseContent, setResponseContent] = useState<string>("");
  const [email, setEmail] = useState<string>("eve.holt@reqres.in");
  const [password, setPassword] = useState<string>("cityslicka");

  // Login function ----------------
  const handleSignin = async () => {
    setLoading(true);
    if (email && password) {
      await axios
        .post(`${baseURL}api/login`, {
          email: email,
          password: password,
        })
        .then((e) => {
          setToken(e?.data?.token);
          localStorage.setItem("token", e?.data?.token);
          router.push("/dashboard/user-management");
        })
        .catch((error) => {
          setResponseContent(error?.response?.data?.error);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        });
    } else {
      setResponseContent("فیلد ها را به درستی تکمیل کنید");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    setLoading(false);
  };

  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="h-full w-full flex justify-center items-center text-center">
        <div className="card m-auto flex flex-col justify-center items-center gap-8 border-2 shadow-2xl shadow-indigo-500/50  border-blue-400 md:h-[60%] md:w-[30%] w-[85%] h-[85%] rounded-xl">
          <h1 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-400 p-2">
            خوش آمدید
          </h1>
          <TextField
            label="ایمیل"
            variant="outlined"
            type="email"
            className="w-2/3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="گذرواژه"
            variant="outlined"
            type="password"
            className="w-2/3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
            className="rounded-xl w-2/3"
            size="large"
            onClick={() => handleSignin()}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <p className="mx-4 font-semibold">ورود</p>
            <Login />
          </LoadingButton>
          <ErrorAlert showError={showError} responseContent={responseContent} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
