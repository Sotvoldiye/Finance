import React, { useState, useEffect } from "react";
import style from "./PotModal.module.scss";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { toast } from "sonner";
import { PotDot } from "../SelectPot";
import { ProgressDemo } from "../InputProgres/Progres";

function PotModal({
  title,
  category,
  button = null,
  delate = null,
  setAddPot,
  id,
  onDeleted,
  setPots,
  pots,
  isEditing = false,
  existingData = null,
  onUpdated,
  setWithdraw,
  withdraw,
  addraw,
}) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [theme, setTheme] = useState("#2563eb");
  const [total, setTotal] = useState();
  // 🔁 Tahrirlash holatida mavjud ma’lumotlarni to‘ldirish
  useEffect(() => {
    if (isEditing && existingData) {
      setName(existingData.name);
      setTarget(existingData.target);
      setTheme(existingData.theme);
    }
  }, [isEditing, existingData]);

  //  Yangi pot qo‘shish
  const addPot = async (e) => {
    e.preventDefault();

    if (!name || !target) {
      toast.warning("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      const newPot = {
        name,
        target: Number(target),
        total: 0,
        theme,
        createdAt: new Date(),

      };

      const docRef = await addDoc(collection(db, "pots"), newPot);
      setPots && setPots([...pots, { id: docRef.id, ...newPot }]);
      toast.success("Yangi pot muvaffaqiyatli qo‘shildi!");
      setAddPot(false);
    } catch (error) {
      toast.error("Xatolik yuz berdi: " + error.message);
    }
  };

  //  Pot o‘chirish
  const deleteBudget = async () => {
    if (!id) {
      toast.warning("Xatolik: ID topilmadi!");
      return;
    }

    try {
      await deleteDoc(doc(db, "pots", id));
      toast.success("Pot muvaffaqiyatli o‘chirildi!");
      onDeleted && onDeleted(id);
      setAddPot(false);
    } catch (error) {
      toast.error(`O‘chirishda xatolik: ${error.message}`);
    }
  };
const withdrawFunc = async (e) => {
  e.preventDefault();

  if (!withdraw?.id) {
    toast.warning("Pot topilmadi!");
    return;
  }

  if (!total || total <= 0) {
    toast.warning("To‘g‘ri summa kiriting!");
    return;
  }

  if (total > withdraw.total) {
    toast.warning("Kiritilgan summa mavjud mablag‘dan ko‘p!");
    return;
  }

  try {
    const potRef = doc(db, "pots", withdraw.id);
    const newTotal = withdraw.total - Number(total);

    await updateDoc(potRef, { total: newTotal });

    // 🔥 UI-ni darhol yangilash
    if (onUpdated) {
      onUpdated({ ...withdraw, total: newTotal });
    }

    toast.success("Mablag‘ muvaffaqiyatli yechildi!");
    setAddPot(false);
  } catch (error) {
    toast.error("Xatolik yuz berdi: " + error.message);
  }
};

const addrawFunc = async (e) => {
  e.preventDefault();

  if (!addraw?.id) {
    toast.warning("Pot topilmadi!");
    return;
  }

  if (!total || total <= 0) {
    toast.warning("To‘g‘ri summa kiriting!");
    return;
  }

  if (addraw.total + Number(total) > addraw.target) {
    toast.warning("Kiritilgan summa maqsaddan oshib ketdi!");
    return;
  }

  try {
    const potRef = doc(db, "pots", addraw.id);
    const newTotal = addraw.total + Number(total);

    await updateDoc(potRef, { total: newTotal });

    // 🔥 UI-ni darhol yangilash (oldingi xato joyda `withdraw` ishlatilgan edi)
    if (onUpdated) {
      onUpdated({ ...addraw, total: newTotal });
    }

    toast.success("Mablag‘ muvaffaqiyatli qo‘shildi!");
    setAddPot(false);
  } catch (error) {
    toast.error("Xatolik yuz berdi: " + error.message);
  }
};

  // 🟡 Potni tahrirlash
  const updatePot = async (e) => {
    e.preventDefault();

    if (!existingData?.id) {
      toast.warning("Xatolik: Pot ID topilmadi!");
      return;
    }

    try {
      const potRef = doc(db, "pots", existingData.id);
      const updatedPot = {
        name,
        target: Number(target),
        theme,
      };

      await updateDoc(potRef, updatedPot);

      onUpdated &&
        onUpdated({
          id: existingData.id,
          total: existingData.total,
          ...updatedPot,
        });
      toast.success("Pot muvaffaqiyatli yangilandi!");
      setAddPot(false);
    } catch (error) {
      toast.error("Yangilashda xatolik: " + error.message);
    }
  };
  return (
    <div className={style.modal_overlay}>
      <div className={style.modal}>
        <header>
          <h1>
            {" "}
            {title} {withdraw && `'${withdraw.name}'`}
            {addraw && `'${addraw.name}'`}
          </h1>
          <button
            onClick={() => {
              setAddPot(false);
              if (setWithdraw) setWithdraw(false);
              if (addraw) setAddPot(false);
            }}
          >
            <img src="./images/icon-close-modal.svg" alt="close" />
          </button>
        </header>
        {!withdraw && !addraw && (
          <form onSubmit={isEditing ? updatePot : addPot}>
            <p className={style.category}>{category}</p>

            {(button || isEditing) && (
              <>
                <div className={style.inputGroup}>
                  <label htmlFor="name">Pot Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={style.inputGroup}>
                  <label htmlFor="target">Target</label>
                  <div className={style.input}>
                    $
                    <input
                      id="target"
                      type="number"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                    />
                  </div>
                </div>

                <div className={style.inputGroup}>
                  <PotDot
                    type="color"
                    onChange={(color) => setTheme(color)} // ✅ to‘g‘ri ishlaydi
                    className={style.colorPicker}
                    defaultValue={isEditing ? existingData.theme : null}
                    isEditing={isEditing}
                    existingData={existingData}
                  />
                </div>
              </>
            )}

            {button && (
              <button type="submit" className={style.submitBtn}>
                {button}
              </button>
            )}

            {isEditing && (
              <button type="submit" className={style.submitBtn}>
                Save Changes
              </button>
            )}

            {delate && (
              <button
                type="button"
                onClick={deleteBudget}
                className={style.delete}
              >
                {delate}
              </button>
            )}
          </form>
        )}
        {!addraw && withdraw && (
          <div>
            <form action="">
              <ProgressDemo
                theme={withdraw} // note: our ProgressDemo expects theme object when withdraw used
                target={withdraw.target}
                total={withdraw.total}
                withdrawAmount={total} // <-- Raqamni uzatamiz
              />
              <div className={style.inputGroup}>
                {" "}
                <label htmlFor="target">Target</label>{" "}
                <div className={style.input}>
                  {" "}
                  $
                  <input
                    id="withdraw"
                    type="number"
                    value={total}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTotal(value === "" ? "" : Number(value));
                    }}
                  />
                </div>{" "}
              </div>
              <button
                type="button"
                onClick={(e) => withdrawFunc(e, withdraw)}
                className={style.submitBtn}
              >
                {button}
              </button>
            </form>
          </div>
        )}
        {!withdraw && addraw && (
          <div>
            <form action="">
              <ProgressDemo
                theme={addraw} // note: our ProgressDemo expects theme object when withdraw used
                target={addraw.target}
                total={addraw.total}
                addrawAmount={total} // <-- Raqamni uzatamiz
              />
              <div className={style.inputGroup}>
                {" "}
                <label htmlFor="target">Target</label>{" "}
                <div className={style.input}>
                  {" "}
                  $
                  <input
                    id="withdraw"
                    type="number"
                    value={total}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTotal(value === "" ? "" : Number(value));
                    }}
                  />
                </div>{" "}
              </div>
              <button
                type="button"
                onClick={(e) => addrawFunc(e, addraw)}
                className={style.submitBtn}
              >
                {button}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default PotModal;
