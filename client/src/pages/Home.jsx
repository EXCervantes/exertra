import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import Map from "../components/Map";

const Home = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default Home;
