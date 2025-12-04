import { useEffect, useState } from "react";
import { getAllRegistros } from "@/services/registers";
import { getAllAusencias } from "@/services/ausencias";
import { getInstitutos } from "@/services/institutes";

export const useDashboardDocente = () => {
  const [registros, setRegistros] = useState([]);
  const [ausencias, setAusencias] = useState([]);
  const [institutos, setInstitutos] = useState([]);

  useEffect(() => {
    const load = async () => {
      const regs = await getAllRegistros();
      const aus = await getAllAusencias();
      const insts = await getInstitutos();

      setRegistros(regs.data || []);
      setAusencias(aus.data || []);
      setInstitutos(insts.data || []);
    };

    load();
  }, []);

  return { registros, ausencias, institutos };
};
