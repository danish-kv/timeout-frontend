import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex items-center justify-center h-screen bg-red-50">
        <h2 className="text-3xl font-bold text-center text-blue-600 p-4  ">
          Welcome, <span className="text-red-500">username</span>! <br />
          Manage and track your leaves with ease on{" "}
          <span className="font-semibold text-red-500">Timeout</span>.
        </h2>
      </div>
    </>
  );
};

export default Home;
