import React, { useEffect, useState, useRef, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import store from "../../store";
import {
  fetchMembers,
  createMember,
  updateMember,
  deleteMember,
  Member,
} from "../../store/slices/members";
import "./FamilyManage.scss";

export default function FamilyManage() {
  const { t } = useTranslation("familyManage");
  const dispatch = useDispatch<typeof store.dispatch>();
  const members = useSelector((state: any) => state.members.members);
  const [newMember, setNewMember] = useState<Member>({
    id: 0,
    username: "",
    password: "",
    gender: "",
    birthDate: "",
    age: 0,
    height: 0,
    weight: 0,
  });
  const newMemberRef = useRef(newMember);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    startTransition(() => {
      dispatch(fetchMembers());
    });
  }, [dispatch]);

  useEffect(() => {
    newMemberRef.current = newMember;
  }, [newMember]);

  useEffect(() => {
    if (isSubmitting) {
      if (editingMemberId === null) {
        dispatch(createMember(newMemberRef.current));
      } else {
        dispatch(
          updateMember({ id: editingMemberId, member: newMemberRef.current })
        );
        setEditingMemberId(null);
      }
      setNewMember({
        id: 0,
        username: "",
        password: "",
        gender: "",
        birthDate: "",
        age: 0,
        height: 0,
        weight: 0,
      });
      setIsSubmitting(false);
    }
  }, [isSubmitting, dispatch, editingMemberId]);

  const handleAddMember = () => {
    setIsSubmitting(true);
  };

  const handleUpdateMember = () => {
    setIsSubmitting(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMemberId(member.id);
    setNewMember({ ...member });
  };

  const handleDeleteMember = (id: number) => {
    dispatch(deleteMember(id));
  };

  return (
    <div className="family-manage-container">
      <h1 className="family-manage-header">{t("title")}</h1>
      <p>{t("description")}</p>
      <div className="family-manage-form">
        <label>{t("username")}</label>
        <input
          type="text"
          placeholder={t("username")}
          value={newMember.username || ""}
          onChange={(e) =>
            setNewMember({ ...newMember, username: e.target.value })
          }
        />
        <label>{t("password")}</label>
        <input
          type="password"
          placeholder={t("password")}
          value={newMember.password || ""}
          onChange={(e) =>
            setNewMember({ ...newMember, password: e.target.value })
          }
        />
        <label>{t("gender")}</label>
        <input
          type="text"
          placeholder={t("gender")}
          value={newMember.gender || ""}
          onChange={(e) =>
            setNewMember({ ...newMember, gender: e.target.value })
          }
        />
        <label>{t("birthDate")}</label>
        <input
          type="date"
          placeholder={t("birthDate")}
          value={newMember.birthDate || ""}
          onChange={(e) =>
            setNewMember({ ...newMember, birthDate: e.target.value })
          }
        />
        <label>{t("age")}</label>
        <input
          type="number"
          placeholder={t("age")}
          value={newMember.age !== undefined ? newMember.age : ""}
          onChange={(e) =>
            setNewMember({ ...newMember, age: parseInt(e.target.value) || 0 })
          }
        />
        <label>{t("height")}</label>
        <input
          type="number"
          placeholder={t("height")}
          value={newMember.height !== undefined ? newMember.height : ""}
          onChange={(e) =>
            setNewMember({
              ...newMember,
              height: parseFloat(e.target.value) || 0,
            })
          }
        />
        <label>{t("weight")}</label>
        <input
          type="number"
          placeholder={t("weight")}
          value={newMember.weight !== undefined ? newMember.weight : ""}
          onChange={(e) =>
            setNewMember({
              ...newMember,
              weight: parseFloat(e.target.value) || 0,
            })
          }
        />
        {editingMemberId === null ? (
          <button onClick={handleAddMember}>{t("add")}</button>
        ) : (
          <button onClick={handleUpdateMember}>{t("edit")}</button>
        )}
      </div>
      <ul className="family-manage-list">
        {members.map((member: any) => (
          <li key={member.id}>
            <div className="member-info">
              <span>{member.username}</span>
              <span>{member.gender}</span>
              <span>{member.birthDate}</span>
              <span>
                {member.age} {t("yearsOld")}
              </span>
              <span>{member.height} cm</span>
              <span>{member.weight} kg</span>
            </div>
            <div className="member-actions">
              <button className="edit" onClick={() => handleEditMember(member)}>
                {t("edit")}
              </button>
              <button onClick={() => handleDeleteMember(member.id)}>
                {t("delete")}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
