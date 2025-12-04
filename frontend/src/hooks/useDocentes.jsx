import { useEffect, useState } from "react";
import { getAllDocentes } from "../services/institutes";

export const useDocentes = () => {
  const [docentes, setDocentes] = useState({ data: [] });

  useEffect(() => {
    const fetchDocentes = async () => {
      const response = await getAllDocentes();
      setDocentes(response);
    };

    fetchDocentes();
  }, []);

  return {
    docentes
  };
};
