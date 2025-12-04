import { useEffect, useState } from "react";
import { getAllRegistros } from "@/services/registers";
import { getAllAusencias } from "@/services/ausencias";
import { getAllDocentes } from "@/services/institutes";

export const useDashboardInstituto = () => {
  const [registros, setRegistros] = useState([]);
  const [ausencias, setAusencias] = useState([]);
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    const load = async () => {
      setRegistros(await getAllRegistros());
      setAusencias(await getAllAusencias());
      const docs = await getAllDocentes();
      setDocentes(docs.data || []);
    };
    load();
  }, []);

  return { registros, ausencias, docentes };
};
