"use client";

import React, { useState } from "react";
import axios from "axios";
import { Add, Person } from "@mui/icons-material";
import { Dialog, DialogTitle, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

interface CreatUserResponseInterface {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

const CreateUserModal = () => {
  const baseURL = "https://reqres.in/";

  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [responseContent, setResponseContent] =
    useState<CreatUserResponseInterface | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   create a new user ----------------------
  const CreateUser = async () => {
    setLoading(true);
    if (name && job) {
      await axios
        .post(`${baseURL}api/users`, {
          name: name,
          job: job,
        })
        .then((res) => {
          setShowAlert(true);
          setResponseContent(res.data);
          setTimeout(() => {
            setShowAlert(false);
          }, 6000);
        })
        .catch((err) => {
          setShowError(true);
        });
      handleClose();
      setName("")
      setJob("")
    } else {
      alert("فیلد ها خالی هستند");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="w-full">
        <button
          onClick={handleClickOpen}
          type="button"
          className="p-3 rounded-full bg-teal-700 hover:bg-teal-500 text-center text-white border-2 cursor-pointer"
        >
          <Person />
          ایجاد کاربر جدید
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className="rounded-3xl"
      >
        <DialogTitle className="w-full bg-blue-500 flex text-center justify-center items-center text-white font-bold">
          ایجاد کاربر جدید
        </DialogTitle>
        <div className="w-full h-[50vh] p-2 flex flex-col justify-center items-center gap-5">
          <TextField
            label="نام"
            variant="outlined"
            type="text"
            className="w-2/3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="شغل"
            variant="outlined"
            type="text"
            className="w-2/3"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <LoadingButton
            className="rounded-xl w-1/3"
            size="large"
            onClick={() => CreateUser()}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <p className="mx-2 font-semibold">ثبت</p>
            <Add />
          </LoadingButton>
        </div>
      </Dialog>
      <SuccessAlert showAlert={showAlert} responseContent={responseContent} updateResponse={null} />
      <ErrorAlert
        showError={showError}
        responseContent="مشکلی در سرور رخ داده است"
      />
    </div>
  );
};

export default CreateUserModal;
