import React, { useState } from "react";
import "./App.css";
import { uploadFile } from "./services/upload";
import { Toaster, toast } from "sonner";
import { type Data } from "./types";
const APP_STATUS = {
  IDLE: "idle",
  ERROR: "error", // any error
  READY_UPLOAD: "ready_upload", // choose file
  UPLOADING: "uploading", // while upload
  READY_USAGE: "ready_usage", // after upload
} as const;

const BUTTON_TXT = {
  [APP_STATUS.READY_UPLOAD]: "Upload File",
  [APP_STATUS.UPLOADING]: "Uploading File ...",
};
type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];
function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [data, setData] = useState<Data>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return;
    }
    setAppStatus(APP_STATUS.UPLOADING);

    const [err, newData] = await uploadFile(file);
    console.log(newData);
    if (err) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(err.message);
      return;
    }
    setAppStatus(APP_STATUS.READY_USAGE);
    if (newData) {
      setData(newData);
      toast.success("File upload succesful");
    }
  };

  const showButton =
    appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING;

  const showInput = appStatus !== APP_STATUS.READY_USAGE;
  return (
    <>
      <Toaster />
      <h4>Upload Challenge + Search</h4>
      <div>
        {showInput && (
          <form onSubmit={handleSubmit}>
            <label>
              <input
                disabled={appStatus === APP_STATUS.UPLOADING}
                onChange={handleInputChange}
                name="file"
                type="file"
                accept=".csv"
              />
            </label>

            {showButton && (
              <button disabled={appStatus === APP_STATUS.UPLOADING}>
                {BUTTON_TXT[appStatus]}
              </button>
            )}
          </form>
        )}
      </div>
    </>
  );
}

export default App;
