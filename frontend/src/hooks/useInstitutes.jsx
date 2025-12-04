import { useState, useEffect } from "react";
import { getAllInstitutes, getInstitutos } from "@/services/institutes";
import { agregarInstituto, removeInstituto } from "@/services/services.api";

export const useInstitutes = () => {
  const [addInstitutes, setAddInstitutes] = useState([]);
  const [removeInstitutes, setRemoveInstitutes] = useState([]);

  const [formAdd, setFormAdd] = useState({ institutoId: "" });
  const [formRemove, setFormRemove] = useState({ institutoId: "" });

  const onChangeAdd = (e) => {
    setFormAdd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onChangeRemove = (e) => {
    setFormRemove((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loadData = async () => {
    const all = await getAllInstitutes();
    const mine = await getInstitutos();
    setAddInstitutes(all.data);
    setRemoveInstitutes(mine.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const handleAssign = async () => {
    if (!formAdd.institutoId) return;

    await agregarInstituto(formAdd.institutoId);

    setFormAdd({ institutoId: "" });

    await loadData();
  };

  const handleRemove = async () => {
    if (!formRemove.institutoId) return;

    await removeInstituto(formRemove.institutoId);

    setFormRemove({ institutoId: "" });

    await loadData();
  };

  return {
    addInstitutes,
    removeInstitutes,
    formAdd,
    formRemove,
    onChangeAdd,
    onChangeRemove,
    handleAssign,
    handleRemove,
  };
};
