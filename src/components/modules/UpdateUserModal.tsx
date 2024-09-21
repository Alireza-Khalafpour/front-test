"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import { Dialog, DialogTitle, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

interface UpdateUserResponseInterface {
  name: string;
  updatedAt: string;
}

const UpdateUserModal = ({
  idUpdate,
  nameUpdate,
}: {
  idUpdate: number | null;
  nameUpdate: string | null;
}) => {
  const baseURL = "https://reqres.in/";

  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [responseContent, setResponseContent] = useState<UpdateUserResponseInterface | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  // update a user ---------------------------
  const UpdateUser = async () => {
    setLoading(true);
    if (name) {
      await axios
        .patch(`${baseURL}api/users/${idUpdate}`, {
          name: name,
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
    } else {
      alert("فیلد ها خالی هستند");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (nameUpdate && idUpdate) {
      setOpen(true);
    }
  }, [nameUpdate]);

  return (
    <div>
      <div className="w-full"></div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className="rounded-3xl"
      >
        <DialogTitle className="w-full bg-blue-500 flex text-center justify-center items-center text-white font-bold">
          ویرایش <span className="text-rose-700 mx-2"> {nameUpdate} </span>
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

          <LoadingButton
            className="rounded-xl w-1/3"
            size="large"
            onClick={() => UpdateUser()}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <p className="mx-2 font-semibold">ویرایش</p>
            <Edit />
          </LoadingButton>
        </div>
      </Dialog>
      <SuccessAlert showAlert={showAlert} responseContent={null} updateResponse={responseContent} />
      <ErrorAlert
        showError={showError}
        responseContent="مشکلی در سرور رخ داده است"
      />
    </div>
  );
};

export default UpdateUserModal;
