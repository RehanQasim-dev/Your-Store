import ProductDetail from "../components/DetailItem/ProductDetail";
import React from "react";
import Review from "../components/Review/Review";
import { useParams } from "react-router-dom";
export default function ProductDetailPage() {
  const { id } = useParams();
  return (
    <div className=" mt-5 mx-auto w-3/4">
      <ProductDetail id={id} />
      <Review id={id} />
    </div>
  );
}
