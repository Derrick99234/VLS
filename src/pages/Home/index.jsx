import React from "react";
import Header from "../../components/header/header";
import Card from "../../components/Card/card.jsx";
import AdminCard from "../../components/Card/AdminCard.jsx";
// import { useNavigate } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center text-center gap-8 items-center flex-col bg-gradient-to-tl from-purple-400 to-blue-300 h-screen">
        <div className="text-white">
          <h1 className="text-[30px] font-bold align-middle">
            Virtual Learning And Management system
          </h1>
          <em> BUILT BY .....</em>
        </div>
        <div className="gap-x-6 flex justify-between items-center">
          <Card />
          <AdminCard />
        </div>
      </div>
    </>
  );
};

export default Index;
