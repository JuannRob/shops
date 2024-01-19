import { useEffect, useState } from 'react';

import { TApiResponse, IProductsData } from '../ts/interfaces/api.interface';

export const useFetch = (url: string): TApiResponse => {
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [data, setData] = useState<IProductsData>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAPIData = async () => {
      setLoading(true);
      try {
        const apiResponse = await fetch(url);
        const json = await apiResponse.json();
        setStatus(apiResponse.status);
        setStatusText(apiResponse.statusText);
        setData(json);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    getAPIData();
  }, []);

  return { status, statusText, data, error, loading };
};
