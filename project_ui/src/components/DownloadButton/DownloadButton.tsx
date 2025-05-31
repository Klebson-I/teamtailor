import { useState } from "react";
import { toast } from "react-toastify";
import { fetchEmployees } from "./utils";

const DownloadButton = () => {
  const [isFetching, setIsFetching] = useState(false);
  const notifySuccess = () => toast.success("File successfully downloaded");
  const notifyError = () => toast.error("Error when file generation");

  const onClickHandler = async () => {
    try {
        if (isFetching) return;
      setIsFetching(true);
      await fetchEmployees();
      notifySuccess();
    } catch (e) {
      notifyError();
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <button
      className="bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500 rounded-full shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-300 w-96 h-40 cursor-pointer flex items-center justify-center gap-4"
      onClick={onClickHandler}
      disabled={isFetching}
    >
        {
            isFetching
            ? <span className="loading loading-dots loading-xl bg-white"></span>
            : <span className="text-4xl text-fuchsia-50">Download</span>
        }
    </button>
  );
};

export default DownloadButton;
