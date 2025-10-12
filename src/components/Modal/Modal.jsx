import React, { useState } from "react";
import style from "./MOdal.module.scss";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; // 🔹 updateDoc qo'shildi
import { db } from "../../firebase/config";
import { toast } from "sonner";

function Modal({
  title,
  category,
  setAddBudget,
  type = null,
  Dot = null,
  GroupedSelect = null,
  delate,
  retry = null,
  button = null,
  id,
  isEditing = false,
  existingData = {},
  onDeleted,
  onAdded,
  onUpdated,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    isEditing ? existingData.category || "" : ""
  );
  const [maximum, setMaximum] = useState(
    isEditing ? existingData.maximum || "" : ""
  );
  const [dot, setDot] = useState(isEditing ? existingData.theme || null : null);

  // 🔹 Yangi yoki mavjud ma’lumotni saqlash
  const addBudget = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !maximum) {
      toast.warning("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      if (isEditing && id) {
        // 🔹 Mavjud ma’lumotni yangilash
        const docRef = doc(db, "budgets", id);
        await updateDoc(docRef, {
          category: selectedCategory,
          maximum: Number(maximum),
          theme: dot,
          updatedAt: new Date(),
          userId: auth.currentUser.uid, // 🔑 Foydalanuvchi bilan bog‘lash
        });

        if (onUpdated) {
          onUpdated({
            id,
            category: selectedCategory,
            maximum: Number(maximum),
            theme: dot,
          });
        }

        toast.success("Ma'lumot muvaffaqiyatli yangilandi!");
      } else {
        // 🔹 Yangi ma’lumot qo‘shish
        const docRef = await addDoc(collection(db, "budgets"), {
          category: selectedCategory,
          maximum: Number(maximum),
          theme: dot,
          createdAt: new Date(),
        });

        if (onAdded) {
          onAdded({
            id: docRef.id,
            category: selectedCategory,
            maximum: Number(maximum),
            theme: dot,
            createdAt: new Date(),
          });
        }

        toast.success("Ma'lumot muvaffaqiyatli qo‘shildi!");
      }

      setAddBudget(false);
    } catch (error) {
      toast.error(`Xatolik yuz berdi: ${error.message}`);
    } finally {
      setMaximum("");
      setSelectedCategory("");
      setDot(null);
    }
  };

  // 🔹 O‘chirish funksiyasi
  const deleteBudget = async () => {
    if (!id) {
      toast.warning("Xatolik: ID topilmadi!");
      return;
    }

    try {
      await deleteDoc(doc(db, "budgets", id));
      toast.success("Ma'lumot muvaffaqiyatli o‘chirildi!");

      if (onDeleted) onDeleted(id);

      setAddBudget(false);
    } catch (error) {
      toast.error(`O‘chirishda xatolik: ${error.message}`);
    }
  };

  return (
    <div className={style.modal_overlay}>
      <div className={style.modal}>
        <header>
          <h1>{title}</h1>
          <button onClick={() => setAddBudget(false)}>
            <img src="./images/icon-close-modal.svg" alt="close" />
          </button>
        </header>

        <form onSubmit={addBudget}>
          <p className={style.category}>{category}</p>

          {GroupedSelect && (
            <GroupedSelect
              onChange={(value) => setSelectedCategory(value)}
              defaultValue={isEditing ? existingData.theme : null}
              isEditing={isEditing}
              existingData={existingData}
            />
          )}

          {type && (
            <div className={style.inputGroup}>
              <label
                style={{ fontSize: 12, color: "#696868" }}
                htmlFor="number"
              >
                Maximum Spend
              </label>
              <div className={style.input}>
                $
                <input
                  id="number"
                  name="number"
                  type={type}
                  placeholder="e.g. 500"
                  value={maximum}
                  onChange={(e) => setMaximum(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* 🔹 Rangi tanlash */}
          {Dot && (
            <Dot
              onChange={(color) => setDot(color)} // ✅ to‘g‘rilandi
              defaultValue={isEditing ? existingData.theme : null}
              isEditing={isEditing}
              existingData={existingData}
            />
          )}

          {button && <button type="submit">{button}</button>}

          {delate && (
            <button
              type="button"
              onClick={deleteBudget}
              className={style.delete}
            >
              {delate}
            </button>
          )}

          {retry && (
            <button
              type="button"
              onClick={() => setAddBudget(false)}
              className={style.retry}
            >
              {retry}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Modal;
