import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
const getProductDetail = (id) => {
  return axios.get(`http://127.0.0.1:8000/store/Products/${id}/`);
};
export default function ProductDetail(props) {
  const { id } = useParams();
  const response = useApi(getProductDetail);
  const data = response.data;
  useEffect(() => {
    response.request(id);
  }, []);
  console.log(id);
  return (
    <div className=" bg-purple-600 border-2 text-center w-1/2 table-center text-white border-purple-900 mt-5 hover:bg-purple-200 hover:text-purple-800">
      <h1 className="font-bold text-2xl ">{data.title}</h1>
      <h1 className="font-bold text-xl"> {data.description}</h1>
      <h1 className="font-bold text-xl"> {data.price}$</h1>
      <h1 className="font-bold text-xl"> {data.tax}$</h1>
      <div className="font-bold text-xl text-center table p-2 border-black border-2 rounded-lg mx-auto">
        {data.inventory}
      </div>
    </div>
  );
}
