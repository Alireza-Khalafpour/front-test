"use client";

import { Alert } from "@mui/material";

interface CreatUserResponseInterface {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

interface UpdateUserResponseInterface {
  name: string;
  updatedAt: string;
}

const SuccessAlert = ({
  showAlert,
  responseContent,
  updateResponse
}: {
  showAlert: boolean;
  responseContent: CreatUserResponseInterface | null;
  updateResponse: UpdateUserResponseInterface | null;
}) => {
  return (
    <div>
      {showAlert ? (
        <Alert
          className="absolute top-2 left-2 z-10"
          severity="success"
          variant="filled"
        >
          {
            responseContent
            ?
            <div className="flex flex-col gap-1">
            <h3 className="text-xl" > کاربر ایجاد شد. </h3>
            <p> آیدی : {responseContent?.id} </p>
            <p> نام : {responseContent?.name} </p>
            <p> شغل : {responseContent?.job} </p>
            <p>  تاریخ ساخت : {responseContent?.createdAt} </p>
          </div>
          : 
          <div className="flex flex-col gap-1">
          <h3 className="text-xl" > کاربر ویرایش شد. </h3>
          <p> نام : {updateResponse?.name} </p>
          <p>  تاریخ ویرایش : {updateResponse?.updatedAt} </p>
        </div>
          }

        </Alert>
      ) : null}
    </div>
  );
};

export default SuccessAlert;
