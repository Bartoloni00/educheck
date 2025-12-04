import { useEffect, useState } from "react";
import { getAllRegistros } from "@/services/registers";
import { getAllAusencias } from "@/services/ausencias";
import { getAllInstitutes } from "@/services/institutes";

export const useDashboardDocente = () => {
  const [registros, setRegistros] = useState([]);
  const [ausencias, setAusencias] = useState([]);
  const [institutos, setInstitutos] = useState([]);

  useEffect(() => {
    const load = async () => {
      setRegistros(await getAllRegistros());
      setAusencias(await getAllAusencias());
      const insts = await getAllInstitutes();
      setInstitutos(insts.data || []);
    };
    load();
  }, []);

  return { registros, ausencias, institutos };
};
