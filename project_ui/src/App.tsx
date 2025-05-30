import { ToastContainer } from "react-toastify";
import DownloadButton from "./components/DownloadButton/DownloadButton";

function App() {
return (
  <div className="w-[100dvw] h-[100dvh] bg-gray-100 flex items-center justify-center">
  <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
  />
    <DownloadButton />
  </div>
);

}

export default App
