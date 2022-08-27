import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import ProductItem from "../CoverItem/ProductItem";
import forwardarrow from "./forwardarrow.svg";
import backword from "./backarrow.svg";
import "./CollectionDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/Slices/uiSlice";
export default function CollectionDetail(props) {
  const [pageNo, setPageNo] = React.useState(1);
  const search = useSelector((state) => state.Ui.search);
  const Dispatch = useDispatch();
  const initialRender = React.useRef(true);
  const getCollectionDetail = (id, page, search) => {
    return axios.get(
      `http://127.0.0.1:8000/store/Products/?collection_id=${id}&page=${page}&search=${search}`
    );
  };
  function items_generator(item) {
    return (
      <ProductItem
        title={item.title}
        inventory={item.inventory}
        price={item.price}
        id={item.id}
        key={item.id}
      />
    );
  }
  const { id } = useParams();
  const response = useApi(getCollectionDetail);
  const nextDisable = !!!response.data.next;
  const previousDisable = !!!response.data.previous;
  const ProductItems =
    response.data.results && response.data.results.map(items_generator);
  const plus = (event) => {
    setPageNo((old) => old + 1);
  };
  const minus = (event) => {
    setPageNo((old) => old - 1);
  };

  useEffect(() => {
    response.request(id, pageNo, "");
  }, [id, pageNo]);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (!initialRender.current) {
      console.log("search request sent");
      response.request(id, pageNo, search);
    }
  }, [search]);
  alert(response.loading);
  return (
    <div>
      <h1 className="text-3xl ">loading={`${response.loading}`}</h1>
      <h1 className="text-3xl ">loading={`${!!response.data}`}</h1>

      <div className="gridd flex-1">{ProductItems}</div>
      <div className="flex mb-5 mt-5 ">
        {/* <img
          src={backword}
          alt="back"
          className=""
          onClick={() => setPageNo((old) => old - 1)}
        /> */}
        {/* <img
          src={forwardarrow}
          alt="forward"
          className="ml-auto"
          onClick={() => setPageNo((old) => old + 1)}
        /> */}
        <button
          className={`${previousDisable ? "disable" : ""} btn `}
          onClick={() => setPageNo((old) => old - 1)}
          disabled={previousDisable}
        >
          back
        </button>
        <button
          className={`${nextDisable ? "disable" : ""} btn ml-auto`}
          onClick={() => {
            setPageNo((old) => old + 1);
          }}
          disabled={nextDisable}
        >
          Next
        </button>
      </div>
    </div>
  );
}
