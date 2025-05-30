import { fetchEmployees } from "./utils";
import { toast } from 'react-toastify';

const DownloadButton = () => {
    const notifySuccess = () => toast.success("File successfully downloaded");
    const notifyError = () => toast.error("Error when file generation");

    const onClickHandler = async () => {
        try {
            await fetchEmployees();
            notifySuccess()
        } catch (e) {
            notifyError();
        }
    };

    return (
        <button 
            className="bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500 rounded-full shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-300 w-96 h-40 cursor-pointer" 
            onClick={onClickHandler}
        >
            <span className="text-4xl text-fuchsia-50">Download</span>
        </button>
    )
};

export default DownloadButton;