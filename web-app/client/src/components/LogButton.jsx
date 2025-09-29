import React from "react";

const LogButton = ({ addLog }) => {
  const handleClick = () => {
    const timestamp = new Date().toLocaleTimeString();
    addLog(`New log added at ${timestamp}`);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Log</button>
    </div>
  );
};

export default LogButton;
