// import DeletePdf from "../DeletePdf";
import React from "react";
function StudentPdfCard({
  url,
  title,
  alt = title,
  openPdfPopUp,
}) {
  return (
    <>
      <div className="shadow-lg bg-white h-[230px] w-[220px] flex items-end justify-center mt-10 rounded-lg relative p-2 ">
      <embed
          src={url}
          alt={alt}
          type="application/pdf"
          className="w-[200px] h-[130px] object-fill absolute top-[-30px] rounded-md"
        />
        {/* <embed src="path_of_your_pdf/your_pdf_file.pdf" type="application/pdf"   height="700px" width="500"> */}

        <div>
          <h2 className="whitespace-nowrap text-ellipsis w-[200px] overflow-hidden font-semibold mb-2">
            {title}
          </h2>
          <div className="flex gap-2 mt-2">
            <button
              className="rounded-md bg-blue-400 text-white w-full py-2 "
              onClick={openPdfPopUp}
            >
              view
            </button>
            {/* // <DeletePdf id={id} url={url} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentPdfCard;
