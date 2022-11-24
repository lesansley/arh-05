import * as React from "react";
import "./App.css";
import MessagesDisplay from "./components/message-display";
import allMessages from "./data/messages";

function App() {
  const messageDisplayRef = React.useRef();
  const [messages, setMessages] = React.useState(allMessages.slice(0, 8));
  const addMessage = () =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : null;
  const removeMessage = () =>
    messages.length > 0
      ? setMessages(allMessages.slice(0, messages.length - 1))
      : null;

  const scrollToTop = () => messageDisplayRef.current.scrollToTop();
  const scrollToBottom = () => messageDisplayRef.current.scrollToBottom();

  return (
    <div style={{ maxHeight: 200 }} className="messaging-app">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={addMessage}>add message</button>
        <button onClick={removeMessage}>remove message</button>
      </div>
      <hr />
      <div>
        <button onClick={scrollToTop}>scroll to top</button>
      </div>
      <MessagesDisplay ref={messageDisplayRef} messages={messages} />
      <div>
        <button onClick={scrollToBottom}>scroll to bottom</button>
      </div>
    </div>
  );
}

export default App;
