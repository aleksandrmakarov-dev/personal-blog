import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSearchParameters() {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState<any>();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setParams(currentParams);
  }, [searchParams]);

  return params;
}
