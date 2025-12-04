import { useEffect, useState } from "react";
import { getAllAusencias } from "@/services/ausencias";
import { getAllDocentes } from "@/services/institutes";
import { getRegistros } from "@/services/registers";

export const useDashboardInstituto = () => {
  const [registros, setRegistros] = useState([]);
  const [ausencias, setAusencias] = useState([]);
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const regs = await getRegistros();
      const aus = await getAllAusencias();
      const docs = await getAllDocentes();

      setRegistros(regs.data || []);
      setAusencias(aus.data || []);
      setDocentes(docs.data || []);
    };

    load();
  }, []);

  return { registros, ausencias, docentes };
};
