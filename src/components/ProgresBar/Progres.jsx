import React from "react";
import styles from "./Progres.module.scss";
import { NavLink } from "react-router-dom";
const BudgetProgress = ({ max = 50, spent = 15 }) => {
  const remaining = max - spent;
  const percent = (spent / max) * 100;
  const remain = max - spent;
  return (
    <div className={styles.budgetProgress}>
      <div className={styles.budgetLabel}>Maximum of ${max.toFixed(2)}</div>
      <div className={styles.progressBarWrapper}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className={styles.budget}>
        <div className={styles.spent}>
          <div className={styles.spent_bg}></div>
          <div className={styles.spent_text}>
            <p className={styles.spent_Title}>Spent</p>
            <p className={styles.spent_number}>${max.toFixed(2)}</p>
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
      <div className={styles.LastSpending}>
        <div className={styles.LastSpendingTitle}>
          <h2>Latest Spending</h2>
          <NavLink className={styles.Navlink}>See All <img src="./images/icon-caret-right.svg" alt="" /></NavLink>
        </div>
        <div className={styles.lastSpending_table}>
            <div className={styles.table_body}>
                <div className={styles.body_left}>
                    <img src="./images/avatars/aqua-flow-utilities.jpg" style={{width:'32px', borderRadius:'50%'}} alt="" />
                    <p>James Thompson</p>
                </div>
                <div className={styles.body_right}>
                    <p className={styles.right_tran}>-$5.00</p>
                    <p className={styles.date}>11 Aug 2024</p>
                </div>
            </div>
            <div className={styles.table_body}>
                <div className={styles.body_left}>
                    <img src="./images/avatars/aqua-flow-utilities.jpg" style={{width:'32px', borderRadius:'50%'}} alt="" />
                    <p>James Thompson</p>
                </div>
                <div className={styles.body_right}>
                    <p className={styles.right_tran}>-$5.00</p>
                    <p className={styles.date}>11 Aug 2024</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;
