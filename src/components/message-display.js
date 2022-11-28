import * as React from "react";

const MessagesDisplay = React.forwardRef(({ messages }, ref) => {
  const containerRef = React.useRef();
  React.useLayoutEffect(() => {
    scrollToBottom();
  });

  //useImperativeHandle passes the custom functions to the parent component through the forwardRef API
  React.useImperativeHandle(ref, () => ({
    scrollToTop,
    scrollToBottom,
  }));

  //Custom function
  function scrollToTop() {
    containerRef.current.scrollTop = 0;
  }

  //Custom function
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

export default MessagesDisplay;
