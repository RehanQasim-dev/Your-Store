import { useRef, useState } from "react";

export default (apiFunc) => {
  //   const [data, setData] = useState("");
  let data = useRef("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    console.log("data fetching started");
    setLoading(true);

    try {
      const result = await apiFunc(...args);
      data.current = result.data;
      console.log("data fetching done");
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  };

  return {
    request,
    loading,
    error,
    data,
  };
};
