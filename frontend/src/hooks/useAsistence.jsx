import { useEffect, useState } from "react";
import { getInstitutos } from "@/services/institutes";
import { useAuth } from "@/hooks/useAuth";

export const useAsistance = () => {
  const { user } = useAuth();

  const [typeQR, setTypeQR] = useState("");
  const [value, setValue] = useState("");
  const [institutes, setInstitutes] = useState({ data: [] });

  const [form, setForm] = useState({
    institutoId: "",
    Email: "",
    Fecha: "",
    Hora: "",
    Tipo: ""
  });

  const handleSelectType = (type) => {
    setTypeQR(type);
  };

  const handleGenerateQR = () => {
    const now = new Date();

    const qrData = {
      institutoId: form.institutoId,
      email: user.email,
      tipo: typeQR,
      fecha: now.toLocaleDateString(),
      hora: now.toLocaleTimeString()
    };

    setValue(JSON.stringify(qrData));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const loadInstitutes = async () => {
      const response = await getInstitutos();
      setInstitutes(response);
    };
    loadInstitutes();
  }, []);

  return {
    typeQR,
    value,
    institutes,
    form,
    onChange,
    handleSelectType,
    handleGenerateQR
  };
};
