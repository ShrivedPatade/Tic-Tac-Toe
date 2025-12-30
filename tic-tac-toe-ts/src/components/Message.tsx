import React from 'react';

interface MessageProps {
  text: string;
  p1Message: string;
  p2Message: string;
}

const Message: React.FC<MessageProps> = ({ text, p1Message, p2Message }) => {
  if (text === "p1w") {
    return (
      <div className="container my-3 winner x">
        <h3>{p1Message}</h3>
      </div>
    );
  }
  if (text === "p2w" || text === "cw") {
    return (
      <div className="container my-3 winner o">
        <h3>{p2Message}</h3>
      </div>
    );
  }
  if (text === "d") {
    return (
      <div className="container my-3 draw">
        <h3>Draw !!</h3>
      </div>
    );
  }
  return (
    <div className="container my-3 opacity-0">
      <h3>{text}</h3>
    </div>
  );
};

export default Message;
