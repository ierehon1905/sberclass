import React, { useCallback, useEffect, useState } from "react";

type Options = {
  skip?: boolean;
};

export const useResolver = (fn: () => Promise<any>, options: Options = {}) => {
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // @ts-ignore
  const call = useCallback(() => {
    setLoading(true);
    setCalled(true);

    fn()
      .then(res => {
        const { result, error } = res;

        if (error) {
          setError(error);
          setData(null);
        }

        setData(result);
        setError(null);
      })
      .catch(e => {
        setError(e);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  useEffect(() => {
    if (!options.skip) {
      call();
    }
  }, [call, options.skip]);

  return {
    refetch: call,
    data,
    error,
    called,
    loading,
  };
};
