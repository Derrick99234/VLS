import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import DeleteChat from "../DeleteChat";

function StudentChatMessage({ message }) {
  const { currentUser } = useContext(UserContext);

  if (!message) {
    // Handle the case when message is undefined or null
    return null;
  }

  const isSentByCurrentUser = message.user === currentUser.email;

  return (
    <div
      className={`flex items-center m-4 rounded-tr-full rounded-tl-fulll ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`shadow-lg p-2 rounded-sm ${
          isSentByCurrentUser
            ? "bg-white text-gray-600 border-gray-300"
            : "bg-blue-400 text-white border "
        }`}
      >
        {isSentByCurrentUser ? null : (
          <small className="text-xs bg-blue-100 w-full text-blue-400 p-1 rounded-md ">
            {message.user}
          </small>
        )}
        <p className="">{message.text}</p>
      </div>
      {isSentByCurrentUser ? <DeleteChat/> : null}
    </div>
  );
}

export default StudentChatMessage;
