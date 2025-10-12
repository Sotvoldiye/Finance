import React, { useEffect, useState, useCallback } from "react";
import style from "./Budgets.module.scss";
import { Chart } from "../../components/Chart/ApexChart";
import { useCollectionsData } from "../../hooks/useCollectionsData";
import { Dot } from "../../components/Select";
import Input from "../../components/Input";
import BudgetProgress from "../../components/ProgresBar/Progres";
import Modal from "../../components/Modal/Modal";
import GroupedSelect from "../../components/Input";

const Budgets = () => {
  const { data, isPending } = useCollectionsData();
  const [pots, setPots] = useState([]);
  const [total, setTotal] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [addBudget, setAddBudget] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleModal = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (data && data.pots) {
      setPots(data.pots);
      const totalSum = data.pots.reduce((acc, item) => acc + item.total, 0);
      setTotal(totalSum);
    }
    if (data && data.budgets) {
      setBudgets(data.budgets);
      const totalBudgets = data.budgets.reduce(
        (acc, item) => acc + item.maximum,
        0
      );
      setBudgetTotal(totalBudgets);
    }
    if (data) {
      setTransactions(data.transactions || []);
    }
  }, [data]);

  // ✅ DELETE modal
  const handleDeleteClick = useCallback((id) => {
    setSelectedBudgetId(id);
    setDeleteModal(true);
    setOpenMenuId(null);
  }, []);

  // ✅ EDIT modal
  const handleEditClick = useCallback(
    (id) => {
      const budgetToEdit = budgets.find((b) => b.id === id);
      setSelectedBudgetId(id);
      setSelectedBudget(budgetToEdit);
      setEditModal(true);
      setOpenMenuId(null);
    },
    [budgets]
  );

  const handleDeleteBudget = (deletedId) => {
    setBudgets((prev) => prev.filter((b) => b.id !== deletedId));
    setDeleteModal(false);
    setSelectedBudgetId(null);
  };

  const handleUpdatedBudget = (updatedBudget) => {
    setBudgets((prev) =>
      prev.map((b) =>
        b.id === updatedBudget.id ? { ...b, ...updatedBudget } : b
      )
    );
  };

  return (
    <div className={style.budgetsContainer}>
      <div className={style.nav}>
        <h1>Budgets</h1>
        <button onClick={() => setAddBudget(true)}>+ Add Budgets</button>
      </div>

      <div className={style.budget_grid}>
        {/* -------- Left (Chart + Summary) -------- */}
        <div>
          <div className={style.budget_Chart}>
            {data ? (
              <Chart
                key={budgetTotal + budgets.length}
                budgetTotal={budgetTotal}
                budgets={data.budgets}
              />
            ) : (
              <p>Loading ...</p>
            )}
            <div className={style.spend}>
              <h2 className={style.spending_Month}>Spending Summary</h2>
              <div>
                {budgets.map((m) => {
                  const budgetTransactions = (transactions || []).filter(
                    (t) => t.category === m.category
                  );
                  const totalPlus = budgetTransactions
                    .filter((t) => t.amount > 0)
                    .reduce((sum, t) => sum + t.amount, 0);
                  const totalMinus = budgetTransactions
                    .filter((t) => t.amount < 0)
                    .reduce((sum, t) => sum + t.amount, 0);
                  const spent = Math.abs(totalPlus + totalMinus);

                  return (
                    <div key={m.id} className={style.spending_status}>
                      <div className={style.left_spend}>
                        <div
                          style={{ backgroundColor: m.theme }}
                          className={style.spend_Bgcolor}
                        ></div>
                        <p className={style.spend_Name}>{m.category}</p>
                      </div>
                      <div>
                        <p className={style.spend_Money}>
                          ${spent.toFixed(2)} <span>of ${m.maximum}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* -------- Right (Budgets List) -------- */}
        <div className={style.budget_status}>
          {budgets.map((m) => {
            const budgetTransactions = (transactions || []).filter(
              (t) => t.category === m.category
            );

            return (
              <div key={m.id} className={style.status_cart}>
                <div className={style.status_cart_Header}>
                  <h1 className={style.status_title}>
                    <p style={{ backgroundColor: m.theme }}></p>
                    {m.category}
                  </h1>
                  <button onClick={() => toggleModal(m.id)}>
                    <img src="./images/icon-ellipsis.svg" alt="ellipsis" />
                  </button>

                  {openMenuId === m.id && (
                    <div className={style.edit}>
                      <div
                        className={style.editMessage}
                        onClick={() => handleEditClick(m.id)} // ✅ FIXED: p.id -> m.id
                      >
                        Edit Budget
                      </div>
                      <div className={style.border}></div>
                      <div
                        className={style.deleteMessage}
                        onClick={() => handleDeleteClick(m.id)} // ✅ FIXED: p.id -> m.id
                      >
                        Delete Budget
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <BudgetProgress
                    max={m.maximum}
                    theme={m.theme}
                    tranactions={budgetTransactions}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* -------- ADD MODAL -------- */}
      {addBudget && (
        <Modal
          setAddBudget={setAddBudget}
          title="Add New Budget"
          type="number"
          category="Choose a category to set a spending budget. These categories can help you monitor spending."
          Dot={Dot}
          GroupedSelect={GroupedSelect}
          button="Add Budget"
          onAdded={(newBudget) => setBudgets((prev) => [...prev, newBudget])}
          isEditing={false}
        />
      )}

      {/* -------- EDIT MODAL -------- */}
      {editModal && (
        <Modal
          setAddBudget={setEditModal}
          title="Edit Budget"
          type="number"
          category="As your budgets change, feel free to update your spending limits."
          Dot={Dot}
          GroupedSelect={GroupedSelect}
          isEditing={true}
          existingData={selectedBudget}
          button="Save Changes"
          onUpdated={handleUpdatedBudget}
          id={selectedBudgetId}
        />
      )}

      {/* -------- DELETE MODAL -------- */}
      {deleteModal && (
        <Modal
          setAddBudget={setDeleteModal}
          title="Delete Budget?"
          category="Are you sure you want to delete this budget? This action cannot be reversed."
          delate="Yes, Confirm Deletion"
          retry="No, Go Back"
          id={selectedBudgetId}
          onDeleted={handleDeleteBudget}
        />
      )}
    </div>
  );
};

export default Budgets;
