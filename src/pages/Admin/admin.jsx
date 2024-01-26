import React, { useContext } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import { Link, useNavigate } from "react-router-dom";
import lasu from "../../Images/lasu.png";
import { useState } from "react";
import FileUploadModal from "../../components/FileUploadModal/FileUploadModal";
import UserContext from "../../contexts/UserContext";
// import Course from "./../Courses/Course"
import VideoPopUp from "../../components/VideoPopUp"; // Import the VideoPopUp component
import "./../../App.css";
import PdfUpload from "../../components/PdfUpload";
import AdminPDfCard from "../../components/PDF/AdminPDfCard";
import PdfPopUp from "../../components/PdfPopUp";

const Admin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video for pop-up
  const [selectedPdf, setSelectedPdf] = useState(null); // State to store the selected pdf for pop-up
  const [showOption, setShowOption] = useState(null); // State to store the selected pdf for pop-up

  // const { videoLists } = useContext(UserContext);
  const { videoDetails, pdfDetails } = useContext(UserContext);
  const { currentUser, logOut } = useContext(UserContext);

  const openVideoPopUp = (video) => {
    setSelectedVideo(video);
  };
  const openPdfPopUp = (pdf) => {
    setSelectedPdf(pdf);
  };

  // Function to close the video pop-up
  const closeVideoPopUp = () => {
    setSelectedVideo(null);
  };
  // Function to close the video pop-up
  const closePdfPopUp = () => {
    setSelectedPdf(null);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = videoDetails.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(currentUser.email);
  // console.log(currentUser);
  // console.log(currentUser);
  const handleLogOut = async () => {
    await logOut();
    alert("You are now Logged Out");
    navigate("/home");
  };
  return (
    <>
      <section className="p-3 bg-white relative h-screen flex justify-around">
        <aside className="bg-purple-400 w-[20%]  rounded-md mr-5 p-4 flex flex-col items-center ">
          <img src={lasu} alt="lasu logo" className="w-[150px] h-[150px]" />
          <div className="h-40 flex flex-col text-white/50 font-semibold text-lg my-10 gap-4 items-start w-4/5">
            <Link to="/admin" className="hover:text-white active:text-white">
              Home
            </Link>
            <Link
              to="/admin-courses"
              className="hover:text-white active:text-white"
            >
              Course
            </Link>
            <Link to="/chat" className="hover:text-white active:text-white">
              Chat Room
            </Link>
            <Link
              to="/admin-pdf"
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
                className="w-[300px] rounded-md border-2 border-purple-500 p-3 h-10"
                placeholder="Search course here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="buttons">
              {/* <small className="text-gray-400">Hi {currentUser?.email}</small> */}
              {/* <button
                title={currentUser.email || "Anonymous"}
                className="bg-purple-400 py-2 font-semibold m-1 px-5 text-white rounded-lg"
              >
                0
              </button> */}
              <button
                className="bg-purple-400 py-2 font-semibold m-1 px-5 text-white rounded-lg"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          </header>
          <div>
            <div className="bg-slate-100 h-[180px] rounded-md mt-4">
              <div className="flex justify-between p-2 items-center">
                <h2 className=" text-purple-500 font-bold">Active course</h2>
                <Link

                  className="border-2 border-purple-400 px-10 py-2 bg-transparent font-bold text-purple-400 rounded-xl"
                  to="/admin-courses"
                >
                  See all
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {filteredVideos.length === 0 ? (
                  <p className="text-center">No Videos Found</p>
                ) : (
                  filteredVideos
                    .slice(0, 4)
                    .map(
                      ({
                        createdAt,
                        title,
                        howLong,
                        id,
                        videoUrl,
                        description,
                      }) => {
                        return (
                          <VideoCard
                            key={id}
                            id={id}
                            thumbnail={videoUrl}
                            title={title}
                            howLong={howLong}
                            totalVideo={createdAt}
                            openVideoPopUp={() =>
                              openVideoPopUp({
                                id,
                                title,
                                howLong,
                                videoUrl,
                                description,
                                createdAt,
                              })
                            }
                          />
                        );
                      }
                    )
                )}
              </div>
            </div>
          </div>
          <div className="bg-slate-100 h-[180px] rounded-md mt-[160px]">
            <div className="flex justify-between p-2 items-center">
              <h2 className=" text-purple-500 font-bold">Active Course Materials</h2>
              <Link
                className="border-2 border-purple-400 px-10 py-2 bg-transparent font-bold text-purple-400 rounded-xl"
                to="/admin-pdf"
              >
                See all
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {pdfDetails.length === 0 ? ( 
                <p className="text-center">No Course Materials Found</p>
              ) : (
                pdfDetails
                  .slice(0, 4)
                  .map(
                    ({
                      title,
                      id,
                      pdfUrl,
                      description,
                    }) => {
                      return (
                        <AdminPDfCard
                          key={id}
                          id={id}
                          url={pdfUrl}
                          title={title}
                          /* 
                             url,
                              title,
                              alt = title,
                              id,
                              openVideoPopUp,
                          */
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

          {showOption && <>
            <button
            className="border-2  border-red-400 h-10 font-bold  rounded-md px-2  text-red-400 bg-white fixed bottom-40 right-10"
            onClick={() => {
               setOpenPdfModal(true)
               setShowOption(null)
            }}
            title="Upload video"
            // onMouseOver={() => setShowToolTip(true)}
          >
            PDF
          </button>
          <button
            className="border-2  border-blue-400  h-10 font-bold  rounded-md px-2 text-blue-400 bg-white fixed bottom-20 right-10"
            onClick={() => {
               setOpenModal(true)
               setShowOption(null)
            }}
            title="Upload video"
            // onMouseOver={() => setShowToolTip(true)}
          >
            Video
          </button>
          </>}
          <button
            className="border-2  border-purple-400 w-10 h-10 font-bold  rounded-md text-2xl text-purple-400 bg-white fixed bottom-5 right-10"
            onClick={() => {
               setShowOption(prev => !prev)
            }}
            title="Upload"
            // onMouseOver={() => setShowToolTip(true)}
          >
            +
          </button>
        </main>
      </section>
        {openModal && <FileUploadModal setOpenModal={setOpenModal} />}
        {openPdfModal && <PdfUpload setOpenModal={setOpenPdfModal} />}
      {/* Render the VideoPopUp component when a video is selected */}
      {selectedVideo && (
        <VideoPopUp video={selectedVideo} closePopUp={closeVideoPopUp} />
      )}
      {selectedPdf && (
        <PdfPopUp pdf={selectedPdf} closePopUp={closePdfPopUp} />
      )}
    </>
  );
};

export default Admin;
