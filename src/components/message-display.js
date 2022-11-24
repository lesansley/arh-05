import * as React from "react";

const MessagesDisplay = React.forwardRef(({ messages }, ref) => {
  const containerRef = React.useRef();
  React.useLayoutEffect(() => {
    scrollToBottom();
  });

  React.useImperativeHandle(ref, () => ({
    scrollToTop,
    scrollToBottom,
  }));

  function scrollToTop() {
    containerRef.current.scrollTop = 0;
  }
  function scrollToBottom() {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }

  return (
    <div ref={containerRef} role="log">
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.author}</strong>: <span>{message.content}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  );
});

// eslint-disable-next-line no-func-assign

export default MessagesDisplay;
