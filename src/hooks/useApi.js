import { useState } from "react";

export default (apiFunc) => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    console.log("loading before=", loading);
    setLoading(true);

    try {
      const result = await apiFunc(...args);
      setData(result.data);
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
