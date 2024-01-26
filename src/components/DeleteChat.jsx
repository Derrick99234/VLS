import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db } from '../firebaseConfig'
import { toast } from 'react-toastify'
// import { deleteObject, ref } from 'firebase/storage'

const DeleteChat = ({ id }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "messages", id));
      toast("Video deleted Succesfully", { type: "success" });
    //   alert('Chat Deleted Already')
    } catch (e) {
      alert(e.message);
      toast("Error deleting Chat", { type: "error" });
    }
    // console.log(id)
  };
  return (
    <>
      <button
        className="bg-red-500/60 p-2 w-10 text-white rounded-md ml-2 text-2xl"
        onClick={handleDelete}
      >
        🗑
      </button>
    </>
  );
};

export default DeleteChat