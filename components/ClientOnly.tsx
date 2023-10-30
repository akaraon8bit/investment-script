"use client";
import React, { useCallback, useEffect, useState } from "react";
import useTheme from "./hooks/useTheme";
import { Loader } from "@mantine/core";
import useCompany from "./hooks/useCompany";
import { toast } from "react-hot-toast";
import axios from "axios";

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { onInitialMode, mode } = useTheme();
  const { onCompany, company } = useCompany();
  const [isReady, setIsReady] = useState(false);

  const getCompany = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/company", { pass: "edeywork" });
      if (data.error) throw new Error(data.error);
      const companyData: CompanyProps = data;
      onCompany(companyData);
      // console.log(companyData);
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [onCompany]);

  const fetchData = useCallback(async () => {
    if (isReady) {
      onInitialMode();
      await getCompany();
    }
  }, [getCompany, isReady, onInitialMode]);

  useEffect(() => {
    fetchData();
    setIsReady(true);
  }, [fetchData]);

  if (!company || !isReady) {
    return (
      <div
        className="h-[100vh] w-full flex items-center 
        justify-center bg-black"
      >
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default ClientOnly;
