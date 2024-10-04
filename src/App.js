import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [txColor, setTxColor] = useState("#ffffff");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const createQrCode = async () => {
    try {
      const bgColorWithoutHash = bgColor.replace("#", "");
      const qrCodeUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColorWithoutHash}`;
      setQrCodeUrl(qrCodeUrl);
    } catch (e) {
      console.error("Error creating QR code", e);
    }
  };
  useEffect(() => {
    if (word) {
      createQrCode();
    }
  }, [word, size, bgColor]);
  return (
    <div className="flex flex-col justify-center items-center px-9 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen">
      <h1 className="text-white font-bold text-[2rem] sm:text-[3rem] mb-9">QR Code Generator</h1>
      <div className="flex flex-col w-full sm:w-[20%] py-3">
        <label className="text-gray-500 font-bold text-xs sm:text-sm">Enter word/text: </label>
        <input
          className="w-full rounded-lg outline-none border-2 border-gray-500 bg-blue-400 p-2 font-bold text-white pl-3"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full sm:w-[20%] py-3">
        <label className="text-gray-500 font-bold text-xs sm:text-sm">Size (px): </label>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full rounded-lg outline-none border-2 border-gray-500 bg-blue-400 p-2 font-bold text-white pl-3"
        />
      </div>
      <div className="flex flex-col w-full sm:w-[20%] py-3">
        <label className="text-gray-500 font-bold text-xs sm:text-sm">Background color (hex): </label>
        <input
          type="text"
          value={bgColor}
          onChange={(e) => {
            setBgColor(e.target.value);
            setTxColor(e.target.value);
          }}
          className="w-full rounded-lg outline-none border-2 border-gray-500 bg-blue-400 p-2 font-bold pl-3"
          style={{ color: txColor }}
        />
      </div>
      {qrCodeUrl && (
        <div className="mt-7">
          <h3 className="text-white font-bold pb-4">Your QR Code:</h3>
          <img src={qrCodeUrl} alt="Generated QR Code" />
          <div className="flex justify-center items-center">
            <a href={qrCodeUrl} download="qrcode.png" className="self-center mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Download QR Code
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
