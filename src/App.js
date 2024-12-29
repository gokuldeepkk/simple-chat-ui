import "./App.css";
import { UserNamePrompt } from "./components/UserNamePrompt";
import { ChatInputSection } from "./components/ChatInputSection";
import { ChatSection } from "./components/ChatSection";
import { useState } from "react";

function App() {
  const [messageSentOut, setMessageSentOut] = useState("");

  return (
    <div>
      <UserNamePrompt />
      <h1 className="text-center p-4">Chat</h1>
      <div className="flex h-screen gap-8 px-8">
        <ChatInputSection messageSent={setMessageSentOut} />
        <ChatSection newMsg={messageSentOut} />
      </div>
    </div>
  );
}

export default App;
