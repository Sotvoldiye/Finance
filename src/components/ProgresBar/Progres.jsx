import React, { useEffect, useState } from "react";
import styles from "./Progres.module.scss";
import { NavLink } from "react-router-dom";
import { useCollectionsData } from "../../hooks/useCollectionsData";

const BudgetProgress = ({ max, theme, tranactions }) => {
  const totalPlus = tranactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalMinus = tranactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const spent = Math.abs(totalPlus + totalMinus);
  const percent = (spent / max) * 100;
  const remain = max - spent;

  const { data } = useCollectionsData();
  const [budgets, setBudgets] = useState([]);
  const [budgetTotal, setBudgetTotal] = useState(0);

  useEffect(() => {
    if (data && data.budgets) {
      setBudgets(data.budgets);
      const totalBudgets = data.budgets.reduce(
        (acc, item) => acc + item.maximum,
        0
      );
      setBudgetTotal(totalBudgets);
    }
  }, [data]);

  return (
    <div className={styles.budgetProgress}>
      <div className={styles.budgetLabel}>Maximum of ${max.toFixed(2)}</div>

      <div className={styles.progressBarWrapper}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percent}%`, backgroundColor: theme }}
        ></div>
      </div>

      <div className={styles.budget}>
        <div className={styles.spent}>
          <div
            className={styles.spent_bg}
            style={{ backgroundColor: theme }}
          ></div>
          <div className={styles.spent_text}>
            <p className={styles.spent_Title}>Spent</p>
            <p className={styles.spent_number}>${spent.toFixed(2)}</p>
          </div>
        </div>

        <div className={styles.remaining}>
          <div className={styles.remaining_bg}></div>
          <div className={styles.remaining_text}>
            <p className={styles.remaining_titile}>Remaining</p>
            <p className={styles.remaining_number}>${remain.toFixed(2)}</p>
          </div>
        </div>
      </div>
      {tranactions.length > 0 && (
        <div className={styles.LastSpending}>
          <div className={styles.LastSpendingTitle}>
            <h2>Latest Spending</h2>
            <NavLink className={styles.Navlink}>
              See All <img src="./images/icon-caret-right.svg" alt="" />
            </NavLink>
          </div>

          <div className={styles.lastSpending_table}>
            {tranactions.slice(0, 3).map((t) => (
              <div className={styles.table_body} key={t.id || t.name}>
                <div className={styles.body_left}>
                  <img
                    src={t.avatar}
                    style={{ width: "32px", borderRadius: "50%" }}
                    alt=""
                  />
                  <p>{t.name}</p>
                </div>
                <div className={styles.body_right}>
                  <p className={styles.right_tran}>
                    {t.amount < 0 ? `-$${Math.abs(t.amount)}` : `+$${t.amount}`}
                  </p>
                  <p className={styles.date}>
                    {new Date(t.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetProgress;
