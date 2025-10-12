import React, { useCallback, useEffect, useState } from "react";
import style from "./Posts.module.scss";
import { useCollectionsData } from "../../hooks/useCollectionsData";
import PotModal from "../../components/PotModal/PotModal";
import { ProgressDemo } from "../../components/InputProgres/Progres";

const Posts = () => {
  const { data } = useCollectionsData();
  const [pots, setPots] = useState([]);
  const [addPot, setAddPot] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [withdraw, setWithdraw] = useState(false);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (data && data.pots) {
      setPots(data.pots);
    }
  }, [data]);

  const toggleModal = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleDeleteBudget = (deletedId) => {
    setPots((prev) => prev.filter((b) => b.id !== deletedId));
    setDeleteModal(false);
    setSelectedBudgetId(null);
  };

  const handleDeleteClick = useCallback((id) => {
    setSelectedBudgetId(id);
    setDeleteModal(true);
    setOpenMenuId(null);
  }, []);

  const handleEditClick = (pot) => {
    setSelectedBudget(pot);
    setEditModal(true);
    setOpenMenuId(null);
  };

  const handleWithdrawClick = useCallback((pot) => {
    setWithdraw(pot); // faqat tanlangan pot ma'lumotini saqlaymiz
    setOpenMenuId(null);
  }, []);
    const handleAdddrawClick = useCallback((pot) => {
    setOpenMenuId(null);
    setAdd(pot);
  }, []);

  const handleUpdatedPot = (updatedPot) => {
    setPots((prev) =>
      prev.map((b) => (b.id === updatedPot.id ? updatedPot : b))
    );
  };

  return (
    <div className={style.budgetsContainer}>
      <div className={style.nav}>
        <h1>Pots</h1>
        <button onClick={() => setAddPot(true)}>+ Add New Pot</button>
      </div>

      <div className={style.potsFlexed}>
        {pots.map((p) => (
          <div key={p.id} className={style.potsContainer}>
            <div className={style.PotTitleContainer}>
              <div className={style.PotTitle}>
                <div
                  className={style.PotBgRounded}
                  style={{ backgroundColor: p.theme }}
                ></div>
                <h2>{p.name}</h2>
              </div>
              <button onClick={() => toggleModal(p.id)}>
                <img src="./images/icon-ellipsis.svg" alt="menu" />
              </button>
              {openMenuId === p.id && (
                <div className={style.edit}>
                  <div
                    className={style.editMessage}
                    onClick={() => handleEditClick(p)}
                  >
                    Edit Pot
                  </div>
                  <div className={style.border}></div>
                  <div
                    className={style.deleteMessage}
                    onClick={() => handleDeleteClick(p.id)}
                  >
                    Delete Pot
                  </div>
                </div>
              )}
            </div>

            <div className={style.PotContent}>
              <div className={style.PotContentTitle}>
                <p className={style.ContenTitle}>Total Saved</p>
                <p className={style.ContentTotal}>${p.total.toFixed(2)}</p>
              </div>
              <ProgressDemo theme={p.theme} target={p.target} total={p.total} />
            </div>

            <div className={style.funtionalButton}>
              <button onClick={() => handleAdddrawClick(p)}>
                + Add Money
              </button>
              <button onClick={() => handleWithdrawClick(p)}>Withdraw</button>
            </div>
          </div>
        ))}

        {withdraw && (
          <PotModal
            title={"Withdraw from"}
            category={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet."
            }
            button={"Confirm Withdrawal"}
            setWithdraw={setWithdraw}
            withdraw={withdraw} // ✅ endi faqat tanlangan pot
            id={withdraw.id}
            setAddPot={setWithdraw}
                onUpdated={handleUpdatedPot} // ✅

          />
        )}

        {add && (
          <PotModal
            title={"Add to"}
            category={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet."
            }
            button={"Confirm Withdrawal"}
            setWithdraw={setAdd}
            addraw={add} // ✅ endi faqat tanlangan pot
            id={add.id}
            setAddPot={setAdd}
                onUpdated={handleUpdatedPot} // ✅

          />
        )}

        {addPot && (
          <PotModal
            title="Add New Pot"
            category="Create a pot to set savings targets..."
            button="Add Pot"
            setAddPot={setAddPot}
            setPots={setPots}
            pots={pots}
          />
        )}

        {deleteModal && (
          <PotModal
            setAddPot={setDeleteModal}
            title="Delete Pot"
            category="Are you sure you want to delete this pot?"
            delate="Delete Pot"
            onDeleted={handleDeleteBudget}
            id={selectedBudgetId}
          />
        )}

        {editModal && selectedBudget && (
          <PotModal
            setAddPot={setEditModal}
            title="Edit Pot"
            category="If your saving targets change, feel free to update your pots."
            isEditing
            existingData={selectedBudget}
            onUpdated={handleUpdatedPot}
          />
        )}
      </div>
    </div>
  );
};

export default Posts;
