import { useState, useEffect } from 'react';
import axios from 'axios';

const DUMMY_URL = 'https://dummyjson.com';

export const useDummyJSON = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true);
        const response = await axios.get(`${DUMMY_URL}${endpoint}`, { params });
        setData(response.data);
      } catch(err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return {data, loading, error};
}

