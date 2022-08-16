import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
const getProductDetail = (id) => {
  return axios.get(`http://127.0.0.1:8000/store/Products/${id}/`);
};
export default function ProductDetail(props) {
  const { id } = useParams();
  const [isClicked, setIsClicked] = React.useState(false);
  const response = useApi(getProductDetail);
  const data = response.data;
  useEffect(() => {
    response.request(id);
  }, []);
  console.log(id);
  return (
    <div className="bg-slate-100 py-7 px-16 h-screen">
      <div className="bg-zinc-50 put-shadow flex gap-2 mx-auto rounded-md px- w-3/4">
        <div className="product-img">
          <img
            className="h-full"
            src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-335257.jpg&fm=jpg"
            alt=""
          />
        </div>

        <div className="p-7 basis-2/5">
          <h1 className="font-extrabold text-3xl text-center">{data.title}</h1>
          <h2 className="font-normal text-xl"> ${data.price}</h2>
          <hr />
          <div className="flex justify-between my-2">
            <p className="text-gray-800">Description</p>
            <p
              className="text-xl font-bold cursor-pointer"
              onClick={() => setIsClicked((old) => !old)}
            >
              +
            </p>
          </div>
          {isClicked && <p>{data.description}</p>}
          <hr />

          <div className="flex items-center py-2">
            <h3 className="italic  ">Stock Available</h3>

            <div className="font-medium italic text-center  table p-1 border-black border-2 rounded-lg ml-3">
              {data.inventory}
            </div>
          </div>

          <div className="quantity flex gap-2">
            <div className="font-medium italic text-center text-3xl px-3  table p-1 border-black border-2 rounded-full ml-3">
              -
            </div>{" "}
            <input type="text" className="w-10 text-center font-extrabold" />
            <button className="btn text-2xl rounded-full">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
