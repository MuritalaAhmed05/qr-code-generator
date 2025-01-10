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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 sm:p-8">
      {/* Glass Container */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <h1 className="text-white font-bold text-3xl sm:text-5xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          QR Code Generator
        </h1>

        {/* Form Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Input Fields Section */}
          <div className="space-y-6">
            {/* Text Input */}
            <div className="space-y-2">
              <label className="text-gray-300 font-medium text-sm">Enter Text/URL:</label>
              <input
                className="w-full rounded-lg border-2 border-white/20 bg-white/5 p-3 font-medium text-white 
                          placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-all duration-300"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Type something..."
              />
            </div>

            {/* Size Input */}
            <div className="space-y-2">
              <label className="text-gray-300 font-medium text-sm">Size (px):</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full rounded-lg border-2 border-white/20 bg-white/5 p-3 font-medium text-white 
                          focus:border-blue-400 focus:outline-none transition-all duration-300"
                min="100"
                max="1000"
              />
            </div>

            {/* Color Input */}
            <div className="space-y-2">
              <label className="text-gray-300 font-medium text-sm">Background Color:</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => {
                    setBgColor(e.target.value);
                    setTxColor(e.target.value);
                  }}
                  className="h-12 w-16 rounded-lg border-2 border-white/20 bg-white/5 p-1 cursor-pointer"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => {
                    setBgColor(e.target.value);
                    setTxColor(e.target.value);
                  }}
                  className="flex-1 rounded-lg border-2 border-white/20 bg-white/5 p-3 font-medium text-white 
                            focus:border-blue-400 focus:outline-none transition-all duration-300"
                  style={{ color: txColor }}
                />
              </div>
            </div>
          </div>

          {/* QR Code Preview Section */}
          <div className="flex flex-col items-center justify-center bg-white/5 rounded-xl p-6">
            {qrCodeUrl ? (
              <div className="space-y-4 w-full">
                <h3 className="text-white font-medium text-center mb-4">Your QR Code</h3>
                <div className="bg-white rounded-lg p-4 shadow-lg transition-transform hover:scale-105 duration-300">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                  />
                </div>
                <a
                  href={qrCodeUrl}
                  download="qrcode.png"
                  className="block w-full text-center py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 
                           text-white font-medium hover:opacity-90 transition-opacity duration-300 shadow-lg"
                >
                  Download QR Code
                </a>
              </div>
            ) : (
              <div className="text-gray-400 text-center">
                <p className="text-lg">Enter text to generate QR code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;