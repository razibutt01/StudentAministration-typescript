import { useEffect, useState } from "react";
import type { Student } from "../components/ComponentTypes";

const useFetch = (url: string) => {
  const [data, setData] = useState<Student[]>([]);
  const [isPending, setpending] = useState(true);
  const [error, seterror] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((list) => {
        setData(list);
        setpending(false);
        seterror(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          seterror(err.message);
          setpending(false);
        }
      });
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
