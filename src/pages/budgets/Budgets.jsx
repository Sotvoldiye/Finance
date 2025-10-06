import React, { useEffect, useState } from "react";
import style from "./Budgets.module.scss";
import { Chart } from "../../components/Chart/ApexChart";
import { useCollectionsData } from "../../hooks/useCollectionsData";
import { Dot } from "../../components/Select";
import Input from "../../components/Input";
import Progres from "../../components/ProgresBar/Progres";
import BudgetProgress from "../../components/ProgresBar/Progres";
import Modal from "../../components/Modal/Modal";
import GroupedSelect from "../../components/Input";

const Budgets = () => {
  const { data, isPending } = useCollectionsData();
  const [pots, setPots] = useState([]);
  const [total, setTotal] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [tranactions, setTransactions] = useState([]);
  const [budgetTotal, setBudgetTotal] = useState(0);
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
    if (data && data.transactions) {
      setTransactions(data.transactions);
    }
  }, [data]);

  // modal uchun
  const [addBudget, setAddBudget] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [edditBudget, setEditBudget] = useState(false);
  const [deleteModal, setDelete] = useState(false);
  const toggleModal = () => {
    setEditBudget((prev) => !prev); // toggle holati
  };
  return (
    <div className={style.budgetsContainer}>
      <div className={style.nav}>
        <h1>Budgets</h1>
        <button onClick={() => setAddBudget(true)}>+ Add Budgets</button>
      </div>
      <div className={style.budget_grid}>
        <div>
          <div className={style.budget_Chart}>
            {" "}
            {data ? (
              <Chart budgetTotal={budgetTotal} budgets={data.budgets} />
            ) : (
              <p>Loading ...</p>
            )}
            <div className={style.spend}>
              <h2 className={style.spending_Month}>Spendding Summary</h2>
              <div>
                <div className={style.spending_status}>
                  <div className={style.left_spend}>
                    <div className={style.spend_Bgcolor}></div>
                    <p className={style.spend_Name}>Entertainment</p>
                  </div>
                  <div>
                    <p className={` ${style.spend_Money}`}>
                      $15.00 <span>of $50.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.budget_status}>
          {budgets.map((m) => {
            const budgetTransactions = tranactions.filter(
              (t) => t.category === m.category
            );
            if (budgetTransactions.length === 0) return null;

            return (
              <div key={m.id} className={style.status_cart}>
                <div className={style.status_cart_Header}>
                  <h1 className={style.status_title}>
                    <p style={{ backgroundColor: m.theme }}></p>
                    {m.category}
                  </h1>
                  <button onClick={toggleModal}>
                    {edditBudget ? (
                      <img src="./images/icon-ellipsis.svg" alt="" />
                    ) : (
                      <img src="./images/icon-ellipsis.svg" alt="" />
                    )}
                  </button>
                  {edditBudget && (
                    <div className={style.edit}>
                      <div
                        className={style.editMessage}
                        onClick={() => setEditModal(true)}
                        on
                      >
                        Edit Budget
                      </div>{" "}
                      <div
                        className={style.deleteMessage}
                        onClick={() => setDelete(true)}
                      >
                        Delete Budget
                      </div>
                    </div>
                  )}
                  {addBudget && (
                    <Modal
                      setAddBudget={setAddBudget}
                      title={"Add New Budget"}
                      type={"number"}
                      category={
                        "Choose a category to set a spending budget. These categories can help you monitor spending."
                      }
                      Dot={Dot}
                      GroupedSelect={GroupedSelect}
                      button={"Add Budget"}
                    />
                  )}
                  {editModal && (
                    <Modal
                      setAddBudget={setEditModal}
                      title={"Edit Budget"}
                      type={"number"}
                      category={
                        "As your budgets change, feel free to update your spending limits."
                      }
                      Dot={Dot}
                      GroupedSelect={GroupedSelect}
                      button={"Save Changes"}
                    />
                  )}
                  {deleteModal && (
                    <Modal
                      setAddBudget={setDelete}
                      title={"Delete ‘Entertainment’?"}
                      type={null}
                      category={
                        "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
                      }
                      Dot={null}
                      GroupedSelect={null}
                      button={null}
                      delate={"Yes, Confirm Deletion"}
                      retry={"No, Go Back"}
                    />
                  )}
                </div>
                <div className="flex gap-2">
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
    </div>
  );
};

export default Budgets;
