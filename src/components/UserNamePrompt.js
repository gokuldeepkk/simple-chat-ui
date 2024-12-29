import { useState } from "react";
import { socket } from "../socket";
import "./styles.css";
import { toast, ToastContainer } from "react-toastify";

export const UserNamePrompt = () => {
  const [name, setName] = useState("");
  const [chatInitiated, setChatInitiated] = useState(false);
  const startChat = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    socket.emit("user-connect", name);
    setChatInitiated(true);
  };

  const DisplayName = () => {
    return (
      <div>
        <h1 className="text-center p-4">Hello {name}</h1>
      </div>
    );
  };

  return (
    <div className="flex justify-around my-4">
      {chatInitiated ? (
        <DisplayName />
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            className="border-2 border-gray-300"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button className="appButton" onClick={startChat}>
            Start Chat
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
};
