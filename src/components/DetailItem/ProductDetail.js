import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { cartActions } from "../../store/Slices/CartSlice";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import useApiLite from "../../hooks/useApiLite";
import { useRef } from "react";
import { reviewActions } from "../../store/Slices/ReviewSlice";
const getProductDetail = (id) => {
  return axios.get(`http://127.0.0.1:8000/store/Products/${id}/`);
};
const addItemToCart = (body) => {
  return axios.post(
    `http://127.0.0.1:8000/store/Carts/${localStorage.getItem(
      "cartId"
    )}/Items/`,
    body
  );
};
export default function ProductDetail(props) {
  const id = props.id;
  const [isClicked, setIsClicked] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);
  const [isAddClicked, setIsAddClicked] = React.useState(false);
  const Dispatch = useDispatch();
  const initialRender = useRef(true);
  const productItemResponse = useApiLite(getProductDetail);
  const cartResponse = useApi(addItemToCart);
  const data = productItemResponse.data.current;
  //event handlers
  const addToCartHandler = async () => {
    setIsAddClicked((old) => !old);
    await cartResponse.request({ product: data.id, quantity: +quantity });
  };
  const plus = () => {
    setQuantity((old) => {
      if (old === data.inventory) {
        return old;
      } else {
        return old + 1;
      }
    });
  };
  const minus = () => {
    setQuantity((old) => {
      if (old === 0) {
        return 0;
      } else {
        return +old - 1;
      }
    });
  };
  const inputChangeHandler = (event) => {
    const value = event.target.value;
    if (value === "") {
      setQuantity(value);
    } else if (value <= 0) {
      setQuantity(0);
    } else if (value > data.inventory) {
      setQuantity(data.inventory);
    } else {
      setQuantity(value);
    }
  };
  //
  useEffect(() => {
    const func = async () => {
      await productItemResponse.request(id);
      console.log(productItemResponse.data);
      Dispatch(
        reviewActions.loadInitials(productItemResponse.data.current.reviews)
      );
    };
    func();
  }, []);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      console.log("response of cartitem", cartResponse.data);
      Dispatch(
        cartActions.addItemToCart({
          id: cartResponse.data.id,
          title: cartResponse.data.product_item.title,
          price: cartResponse.data.product_item.price,
          quantity: +quantity,
        })
      );
    }
  }, [cartResponse.data]);

  return (
    <div className="bg-zinc-50 put-shadow flex gap-2 rounded-md">
      <div className="product-img h-full">
        <img
          className="h-full"
          src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-335257.jpg&fm=jpg"
          alt=""
        />
      </div>

      <div className="p-7 basis-2/5 flex flex-col">
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

          <div className="font-medium italic text-center  table px-2 py-1 border-black border-2 rounded-lg ml-3">
            {data.inventory}
          </div>
        </div>

        <div className="quantity flex gap-3 items-center mt-4">
          <h1 className="text-zinc-700 text-xl italic">Quantity</h1>
          <button
            onClick={minus}
            className="btn-pressed btn-small rounded-full h-9"
          >
            -
          </button>
          <input
            onChange={inputChangeHandler}
            value={quantity}
            type="text"
            className="w-16 px-1 text-center font-extrabold border-2 border-slate-500"
          />
          <button
            onClick={plus}
            className="btn-pressed btn-small rounded-full h-9"
          >
            +
          </button>
        </div>
        <div
          onClick={addToCartHandler}
          className="btn table text-lg font-medium px-3 mt-auto ml-auto"
        >
          Add to cart
        </div>
      </div>
    </div>
  );
}
