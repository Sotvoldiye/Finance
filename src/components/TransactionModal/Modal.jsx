import React, { useState } from "react";
import style from "./Modal.module.scss";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "sonner";

export default function Modal({
  title,
  setAddTransaction,
  button = null,
  deleteText = null,
  id,
  isEditing = false,
  existingData = {},
  onAdded,
  onUpdated,
  onDeleted,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    isEditing ? existingData.category || "" : ""
  );
  const [amount, setAmount] = useState(
    isEditing ? existingData.amount || "" : ""
  );
  const [name, setName] = useState(isEditing ? existingData.name || "" : "");

  // 🔹 Qo‘shish / yangilash funksiyasi
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !amount || !name) {
      toast.warning("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      if (isEditing && id) {
        const docRef = doc(db, "transactions", id);
        await updateDoc(docRef, {
          category: selectedCategory,
          amount: Number(amount),
          name,
          updatedAt: new Date(),
        });

        if (onUpdated)
          onUpdated({
            id,
            category: selectedCategory,
            amount: Number(amount),
            name,
          });

        toast.success("Ma'lumot muvaffaqiyatli yangilandi!");
      } else {
        const docRef = await addDoc(collection(db, "transactions"), {
          category: selectedCategory,
          amount: Number(amount),
          name,
          date: new Date().toISOString(),
          avatar: "./assets/images/avatars/default.jpg",
        });

        if (onAdded)
          onAdded({
            id: docRef.id,
            category: selectedCategory,
            amount: Number(amount),
            name,
            date: new Date().toISOString(),
            avatar: "./assets/images/avatars/default.jpg",
          });

        toast.success("Ma'lumot muvaffaqiyatli qo‘shildi!");
      }

      setAddTransaction(false);
    } catch (error) {
      toast.error("Xatolik yuz berdi: " + error.message);
    } finally {
      setSelectedCategory("");
      setAmount("");
      setName("");
    }
  };

  const handleDelete = async () => {
    if (!id) {
      toast.warning("Xatolik: ID topilmadi!");
      return;
    }

    try {
      await deleteDoc(doc(db, "transactions", id));
      toast.success("Ma'lumot muvaffaqiyatli o‘chirildi!");
      if (onDeleted) onDeleted(id);
      setAddTransaction(false);
    } catch (error) {
      toast.error("O‘chirishda xatolik: " + error.message);
    }
  };

  return (
    <div className={style.modal_overlay}>
      <div className={style.modal}>
        <header>
          <h1>{title}</h1>
          <button onClick={() => setAddTransaction(false)}>
            <img src="./images/icon-close-modal.svg" alt="close" />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <label>Recipient / Sender</label>
          <input
            type="text"
            placeholder="e.g. Ethan Clark"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Category</label>
          <input
            type="text"
            placeholder="e.g. Dining Out"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          />

          <label>Amount</label>
          <input
            type="number"
            placeholder="e.g. -32.5"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {button && <button type="submit">{button}</button>}

          {deleteText && (
            <button
              type="button"
              onClick={handleDelete}
              className={style.delete}
            >
              {deleteText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
