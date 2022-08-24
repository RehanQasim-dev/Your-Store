import axios from "axios";
import React from "react";
import { useEffect } from "react";
import CollectionItem from "../CoverItem/CollectionItem";
import useApi from "../../hooks/useApi";
const getCollections = () => {
  return axios.get("http://127.0.0.1:8000/store/Collections/");
};
export default function Collections() {
  const response = useApi(getCollections);
  function items_generator(item) {
    return (
      <CollectionItem
        title={item.title}
        count={item.count}
        key={item.id}
        id={item.id}
      />
    );
  }
  console.log("response");
  const collectionItems =
    response.data.results && response.data.results.map(items_generator);
  useEffect(() => {
    response.request();
  }, []);

  return <div className="">{collectionItems}</div>;
}
