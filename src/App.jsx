 import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");         // Stores user input
  const [shortUrl, setShortUrl] = useState(""); // Stores the shortened URL

  // Function to send URL to backend
  const handleShorten = async () => {
    if (!url) return alert("Please enter a URL");

    try {
      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl); // Save returned short URL
    } catch (error) {
      console.error(error);
      alert("Failed to shorten URL");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-sans">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">URL Shortener</h1>

        {/* Input for URL */}
        <input
          type="text"
          placeholder="Enter your URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border-2 border-white border-opacity-40 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-black"
        />

        {/* Button to shorten URL */}
        <button
          onClick={handleShorten}
          className="w-full p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Shorten URL
        </button>

        {/* Display the shortened URL */}
        {shortUrl && (
          <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg text-center break-words">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-yellow-300"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;