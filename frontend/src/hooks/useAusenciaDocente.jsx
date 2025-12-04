import { useState, useEffect } from "react";
import { getInstitutos } from "@/services/institutes";
import { createAusencia } from "@/services/ausencias";
import { useNavigate } from "react-router-dom";

export const useAusenciaDocente = () => {
  const [institutes, setInstitutes] = useState({ data: [] });
  const [form, setForm] = useState({
    institutoId: "",
    fechaAusencia: "",
    motivo: "",
    descripcion: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadInsts = async () => {
      const response = await getInstitutos();
      setInstitutes(response);
    };
    loadInsts();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createAusencia(form);
    navigate("/");
  };

  return {
    institutes,
    form,
    onChange,
    onSubmit,
  };
};
