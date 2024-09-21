"use client";

import { Alert } from "@mui/material";

const ErrorAlert = ({
  showError,
  responseContent,
}: {
  showError: boolean;
  responseContent: string;
}) => {
  return (
    <div>
      {showError ? (
        <Alert
          className="absolute top-3 left-[45%]"
          severity="error"
          variant="filled"
        >
          {responseContent}
        </Alert>
      ) : null}
    </div>
  );
};

export default ErrorAlert;
