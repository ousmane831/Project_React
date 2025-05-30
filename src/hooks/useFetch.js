import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [endpoint]);

  return { data, loading, reload: load };
}
