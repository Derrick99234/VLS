import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import DeleteChat from "./../DeleteChat";

function ChatMessage({ message }) {
  const { currentUser } = useContext(UserContext);

  if (!message) {
    // Handle the case when message is undefined or null
    return null;
  }

  const isSentByCurrentUser = message.user === currentUser.email;
  // console.log(message)

  return (
    <div
      className={`flex items-center m-4 rounded-tr-full rounded-tl-full ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`shadow-lg p-2 rounded-sm ${
          isSentByCurrentUser
            ? "bg-white text-gray-600 border-gray-300"
            : "bg-purple-400 text-white border "
        }`}
      >
        {isSentByCurrentUser ? null : (
          <small className="text-xs bg-purple-100 w-full text-purple-400 p-1 rounded-md ">
            {message.user}
          </small>
        )}
        <p className="">{message.text}</p>
      </div>
      <DeleteChat id={message.id}/>
    </div>
  );
}

export default ChatMessage;
