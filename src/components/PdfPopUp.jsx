import React from "react";

const PdfPopUp = ({ pdf, closePopUp }) => {
  const { title, pdfUrl, description } = pdf;

  return (
    <>
      <div
        className="fixed bg-black/50 top-0 left-0 bottom-0 right-0"
        // onClick={closePopUp}
      >
        <span
          className="font-bold text-white text-lg absolute top-[20px] right-[20px] cursor-pointer"
          onClick={closePopUp}
        >
          X
        </span>
        <div
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%] bg-white h-[80%]"
          onClick={(e) => e.stopPropagation()}
        >
          <embed src={pdfUrl} width="100%" height="100%"  />
          <div className="absolute top-2 right-2">
            <button
              className="bg-slate-400 text-white px-3 py-1 rounded-md"
              onClick={closePopUp}
            >
              Close
            </button>
          </div>
          <div className="text-black absolute bottom-4 left-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm">Description: {description}</p>
            {/* <p className="text-sm">{createdAt.year}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfPopUp;
