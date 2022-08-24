import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import ProductItem from "../CoverItem/ProductItem";
import forwardarrow from "./forwardarrow.svg";
import backword from "./backarrow.svg";
import "./CollectionDetail.css";
export default function CollectionDetail(props) {
  const [pageNo, setPageNo] = React.useState(1);
  const getCollectionDetail = (id, page) => {
    return axios.get(
      `http://127.0.0.1:8000/store/Products/?collection_id=${id}&page=${page}`
    );
  };
  const minus = () => {};
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
  console.log("collection detail item ran");
  const { id } = useParams();
  const response = useApi(getCollectionDetail);
  const nextDisable = !!!response.data.next;
  const previousDisable = !!!response.data.previous;
  const ProductItems =
    response.data.results && response.data.results.map(items_generator);
  useEffect(() => {
    response.request(id, pageNo);
  }, [id, pageNo]);

  return (
    <div className="gridd flex-1">
      {ProductItems}
      <div className="flex mb-4">
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
          onClick={() => setPageNo((old) => old + 1)}
          disabled={nextDisable}
        >
          Next
        </button>
      </div>
    </div>
  );
}
