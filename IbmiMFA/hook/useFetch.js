import { useState, useEffect } from "react";

const useFetch = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Execute the provided fetch function
      const result = await fetchFunction();

      // Handle the result and set data in the state
      setData(result);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
;
  return { data, isLoading, error, refetch };
};

export default useFetch;
