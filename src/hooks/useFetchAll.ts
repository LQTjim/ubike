import fetchAllSiteInfo, { siteInfo } from "@/lib/fetchAllSiteInfo";
import { useState, useEffect } from "react";
export type loadingStatus = "idle" | "pending" | "succeeded" | "failed";
export default function useFetchAll() {
  const [data, setData] = useState<siteInfo[]>([]);
  const [status, setStatus] = useState<loadingStatus>("idle");
  useEffect(() => {
    setStatus("pending");
    fetchAllSiteInfo()
      .then((data) => {
        setData(data);
        setStatus("succeeded");
      })
      .catch((err) => {
        console.log(err);
        setStatus("failed");
      });
    return () => {};
  }, []);

  return { data, status };
}
