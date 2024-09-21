import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-2 justify-center items-center ">
      <CircularProgress color="inherit" />
      <p>لطفا صبر کنید...</p>
    </div>
  );
}
