import React from "react";
import Calculator from "../component/Calculator/Calculator";
import Header from "../component/Header/Header";

function Home() {
  return (
    <div>
    <Header/>
      <div>
        <Calculator />
      </div>
    </div>
  );
}

export default Home;
