import { useState } from "react";
import { socket } from "../socket";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "./styles.css";

export const ChatInputSection = ({ messageSent }) => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    if (message === "") {
      toast.error("Message is empty");
      return;
    }
    if (!socket.connected) {
      toast.info("Not connected to netwrok");
      return;
    }
    socket.emit("send-chat-message", message);
    messageSent(message);
    setMessage("");
  };

  return (
    <div className="flex">
      <div className="chat-input flex justify-evenly gap-4">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="border-2 border-gray-300"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          transition={Bounce}
        />
      </div>
    </div>
  );
};
