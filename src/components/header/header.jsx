import React from "react";
// import "../header/header.css";
// import LogoutIcon from "@mui/icons-material/Logout";
const header = () => {
  return (
    <>
      <div className="flex justify-around items-center fixed w-full bg-white h-16">
        <div className="flex items-center gap-2">
          <img
            src="https://ug.lidc.lasu.edu.ng/ft-includes/assets/img/logo/logo.png"
            className="h-[50px]"
            alt="lasu-img"
          />
          <span>Lagos State University</span>
        </div>
      </div>
    </>
  );
};

export default header;
