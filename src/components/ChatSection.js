import { useEffect, useState } from "react";
import { socket } from "../socket";
import "./styles.css";

export const ChatSection = ({ newMsg }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (newMsg) {
      setMessages((prev) => [
        ...prev,
        { msg: newMsg, user: "You", category: "sent" },
      ]);
    }
  }, [newMsg]);

  useEffect(() => {
    const handleChatMessage = (e) => {
      if (e) {
        setMessages((prev) => [
          ...prev,
          { user: e.user, msg: e.message, category: "received" },
        ]);
      }
    };

    const handleUserConnected = (e) => {
      if (e) {
        setMessages((prev) => [
          ...prev,
          { msg: `${e} Joined`, category: "info" },
        ]);
      }
    };
    socket.on("chat-message", handleChatMessage);
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("chat-message", handleChatMessage);
      socket.off("user-connected", handleUserConnected);
    };
  }, []);

  return (
    <div className="chat-window p-4 border-2 border-gray-300 container overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-container w-full flex ${message.category}`}
        >
          {message.category !== "info" &&
            message.user !== messages[index - 1]?.user && (
              <div className="user">{message.user}</div>
            )}
          <div className="message">{message.msg}</div>
        </div>
      ))}
    </div>
  );
};
