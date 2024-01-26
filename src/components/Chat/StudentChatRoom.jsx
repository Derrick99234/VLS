// src/components/Chat.js
import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import UserContext from "../../contexts/UserContext";
import StudentChatMessage from "./StudentChatMessage";
import { Link } from "react-router-dom";
import lasu from "../../Images/lasu.png";

const StudentChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { currentUser } = useContext(UserContext);
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => doc.data());
      const sortedMessages = messagesData.sort(
        (a, b) => a.timestamp - b.timestamp
      );
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, [messagesRef]);

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      await addDoc(messagesRef, {
        text: newMessage,
        timestamp: new Date(),
        user: currentUser.email,
      });
      setNewMessage("");
    }
  };

  return (
    <section className="p-3 bg-white relative h-screen flex justify-around">
      <aside className="bg-blue-400 w-[20%]  rounded-md mr-5 p-4 flex flex-col items-center ">
        <img src={lasu} alt="lasu logo" className="w-[150px] h-[150px]" />
        <div className="h-40 flex flex-col text-white/50 font-semibold text-lg my-10 gap-4 items-start w-4/5">
          <Link to="/student" className="hover:text-white active:text-white">
            Home
          </Link>
          <Link
            to="/student-courses"
            className="hover:text-white active:text-white"
          >
            Course
          </Link>
          <Link
              to="/student-chat"
              className="hover:text-white active:text-white"
            >
              Chat Room
            </Link>
            <Link
              to="/student-pdf"
              className="hover:text-white active:text-white"
            >
             Course Materials
            </Link>
        </div>
      </aside>
      <main className="p-5 w-[78%] rounded-lg overflow-y-scroll">
        {/* Section for displaying chat messages */}
        <div className="bg-slate-100 h-[80vh] rounded-md mt-4 overflow-y-scroll">
          {messages.map((message, index) => (
            <StudentChatMessage key={index} message={message} />
          ))}
        </div>
        {/* Section for sending new messages */}
        <div className="mt-4">
          <input
            type="text"
            className="w-[80%] rounded-md border-2 border-blue-500 p-3 h-10"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-400 py-2 font-semibold m-1 px-5 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </main>
    </section>
  );
};

export default StudentChatRoom;
