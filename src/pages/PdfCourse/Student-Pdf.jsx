import React from "react";
import { Link, useNavigate } from "react-router-dom";
import lasu from "../../Images/lasu.png";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
// import StudentCard from "../../components/VideoCard/StudentCard";
// import VideoPopUp from "../../components/VideoPopUp";
import StudentPdfCard from "../../components/PDF/StudentPdfCard";
import PdfPopUp from "../../components/PdfPopUp";

function StudentPdf() {
  // const [openModal, setOpenModal] = useState(false);

  const [selectedPdf, setSelectedPdf] = useState(null);
  const openPdfPopUp = (video) => {
    setSelectedPdf(video);
  };

  // Function to close the video pop-up
  const closePdfPopUp = () => {
    setSelectedPdf(null);
  };
  // const { videoLists } = useContext(UserContext);
  const { pdfDetails, logOut, currentUser } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPdf = pdfDetails.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(currentUser);
  const handleLogOut = async () => {
    await logOut();
    alert("You are now Logged Out");
    navigate("/home");
  };
  return (
    <>
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
          <header className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={
                  currentUser.photoURL ||
                  "https://cdn.pixabay.com/photo/2020/03/24/20/59/car-4965498_640.jpg"
                }
                alt=""
                className="w-12 h-12 rounded-full m-1"
              />
              <div>
                <small className="text-gray-400">Welcome</small>
                <h2 className="m-0 font-bold">
                  {currentUser?.displayName || currentUser?.email}
                </h2>
              </div>
            </div>

            <div>
              <input
                type="text"
                className="w-[300px] rounded-md border-2 border-blue-500 p-3 h-10"
                placeholder="Search course here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="buttons">
              {/* <small className="text-gray-400">Hi {currentUser?.email}</small> */}
              {/* <button className="bg-blue-400 py-2 font-semibold m-1 px-5 text-white rounded-lg">
                0
              </button> */}
              <button
                className="bg-blue-400 py-2 font-semibold m-1 px-5 text-white rounded-lg"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          </header>
          <div className="bg-slate-100 h-[180px] rounded-md mt-4">
            <div className="flex justify-between p-2 items-center">
              <h2 className=" text-blue-500 font-bold">All Course Materials</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {filteredPdf.length === 0 ? (
                <p className="text-center">No Course Materials Found</p>
              ) : (
                filteredPdf.map(
                  ({
                    title,
                    id,
                    pdfUrl,
                    description,
                  }) => {
                    return (
                      <StudentPdfCard
                        key={id}
                        id={id}
                        url={pdfUrl}
                        title={title}
                        openPdfPopUp={() =>
                          openPdfPopUp({
                            id,
                            title,
                            pdfUrl,
                            description,
                          })
                        }
                      />
                    );
                  }
                )
              )}
            </div>
          </div>
        </main>
      </section>
      {selectedPdf && (
        <PdfPopUp pdf={selectedPdf} closePopUp={closePdfPopUp} />
      )}
    </>
  );
}

export default StudentPdf;
