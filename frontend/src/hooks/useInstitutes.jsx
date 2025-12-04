import { useState, useEffect } from "react";
import { getAllInstitutes, getInstitutos } from "@/services/institutes";
import { agregarInstituto, removeInstituto } from "@/services/services.api";

export const useInstitutes = () => {
  const [addInstitutes, setAddInstitutes] = useState([]);
  const [removeInstitutes, setRemoveInstitutes] = useState([]);

  const [formAdd, setFormAdd] = useState({ institutoId: "" });
  const [formRemove, setFormRemove] = useState({ institutoId: "" });

  const onChangeAdd = (e) => {
    const { name, value } = e.target;
    setFormAdd({ ...formAdd, [name]: value });
  };

  const onChangeRemove = (e) => {
    const { name, value } = e.target;
    setFormRemove({ ...formRemove, [name]: value });
  };

  useEffect(() => {
    const loadData = async () => {
      const all = await getAllInstitutes();
      const mine = await getInstitutos();
      setAddInstitutes(all.data);
      setRemoveInstitutes(mine.data);
    };

    loadData();
  }, []);

  const handleAssign = async () => {
    if (!formAdd.institutoId) return;
    const res = await agregarInstituto(formAdd.institutoId);
    setFormAdd({ institutoId: "" });
    return res;
  };

  const handleRemove = async () => {
    if (!formRemove.institutoId) return;
    const res = await removeInstituto(formRemove.institutoId);
    setFormRemove({ institutoId: "" });
    return res;
  };

  return {
    addInstitutes,
    removeInstitutes,
    formAdd,
    formRemove,
    onChangeAdd,
    onChangeRemove,
    handleAssign,
    handleRemove
  };
};
