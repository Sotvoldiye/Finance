import React, { useEffect, useState } from "react";
import style from "./Overview.module.scss";
import { useCollectionsData } from "../../hooks/useCollectionsData";
import { FaCaretRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Chart } from "../../components/Chart/ApexChart";
const Overview = () => {
  const { data, isPending } = useCollectionsData();
  const [pots, setPots] = useState([]);
  const [total, setTotal] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);

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
      setTransactions(data.transactions || []); // Har doim array bo'lishini ta'minlash
    }
  }, [data]);
  console.log(data);

  return (
    <div className={style.overviewContainer}>
      <h1 className={style.overTitle}>Overview</h1>
      <div className={style.overviewContent}>
        <ul className={style.overAmounts}>
          <li className={style.overAmountsItem}>
            <p className={style.currentBalanceTitle}>Current Balance</p>
            <p className={style.currentBalance}>
              ${data && data.balance.current}.00
            </p>
          </li>
          <li className={style.overAmountsItem}>
            <p className={style.currentBalanceTitle}>Income</p>
            <p className={style.currentBalance}>
              ${data && data.balance.income}
            </p>
          </li>
          <li className={style.overAmountsItem}>
            <p className={style.currentBalanceTitle}>Expenses</p>
            <p className={style.currentBalance}>
              ${data && data.balance.expenses}
            </p>
          </li>
        </ul>

        <div className={style.overAllInfos}>
          <div className={style.potsTran}>
            {/* pots start */}
            <div className={style.pots}>
              <div className={style.potsTitleView}>
                <h2 className={style.potsTitle}>Pots</h2>
                <NavLink to="/posts">
                  <p className={style.viewPots}>
                    See Details <FaCaretRight />
                  </p>
                </NavLink>
              </div>

              <div className={style.potsContent}>
                <div className={style.potsContentItem}>
                  <img src="./images/icon-pot.svg" alt="" />
                  <div className={style.itemInto}>
                    <p className={style.itemIntoTotalSaved}>Total Saved</p>
                    <h5 className={style.itemIntoTotalSavedAmount}>${total}</h5>
                  </div>
                </div>

                <div className={style.potsContentItem}>
                  {data &&
                    data.pots.slice(0, 4).map((d) => {
                      return (
                        <div key={d.id} className={style.itemIntoDiv}>
                          <div
                            className={style.itemIntoLine}
                            style={{ backgroundColor: d.theme }}
                          ></div>
                          <div className={style.itemIntoContent}>
                            <p className={style.itemIntoTotalSavedSecond}>
                              {d.name}
                            </p>
                            <h5
                              className={style.itemIntoTotalSavedAmountSecond}
                            >
                              ${d.total}
                            </h5>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* pots end */}
            <div className={style.pots}>
              <div className={style.potsTitleView}>
                <h2 className={style.potsTitle}>Transactions</h2>
                <NavLink to="/transactions">
                  <p className={style.viewPots}>
                    See Details <FaCaretRight />
                  </p>
                </NavLink>
              </div>

              <ul className={style.tranList}>
                {data &&
                  data.transactions.map((t) => {
                    return (
                      <div key={t.id} className={style.tranListItem}>
                        <div className={style.tranItemPer}>
                          <img
                            src={t.avatar}
                            alt={t.name}
                            width={40}
                            height={40}
                          />
                          <h5>{t.name}</h5>
                        </div>
                        <div className={style.tranItemSec}>
                          <div className={style.tranItemSecAmount}>
                            {t.amount < 0 ? (
                              <p style={{ color: "black" }}>
                                -${Math.abs(t.amount)}
                              </p>
                            ) : (
                              <p className={style.green}>+${t.amount}</p>
                            )}
                          </div>

                          {/* date */}
                          <p className={style.tranItemDate}>
                            {new Date(t.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className={style.budgetBills}>
            <div className={style.budgets}>
              <div className={style.budgetsTitle}>
                <h2 className={style.potsTitle}>Budgets</h2>
                <NavLink to="/budgets">
                  <p className={style.viewPots}>
                    See Details <FaCaretRight />
                  </p>
                </NavLink>
              </div>
              <div className={style.spend_container}>
             {data ? (
                <Chart budgetTotal={budgetTotal} budgets={data.budgets} />
              ) : (
                <p>Loading ...</p>
              )}
              <div className={style.spendingBudgetContainer}>
                 {budgets.slice(0,5).map((m) => {

                let theme = m.theme;
                return (
                  <div key={m.id} className={style.spending_status}>
                    <div className={style.left_spend}>
                      <div
                        style={{ backgroundColor: theme }}
                        className={style.spend_Bgcolor}
                      ></div>
                     <div> <div className={style.spend_Name}>{m.category}</div>
                        <p className={style.spend_Money}>
                        <span> ${m.maximum}</span>
                      </p></div>
                    </div>
                    <div>
                    
                    </div>
                  </div>
                );
              })}
              </div>
             
              </div>
 
            </div>

            <div className={style.bills}>
              <div className={style.billsTitleView}>
                <h2 className={style.potsTitle}>Recurring Bills</h2>
                <NavLink to="/recurringbills">
                  <p className={style.viewPots}>
                    See Details <FaCaretRight />
                  </p>
                </NavLink>
              </div>

              <ul className={style.billsList}>
                <li className={style.billsItem}>
                  <p className={style.billsItemName}>Paid Bills</p>
                  <p className={style.billsItemAmount}>$190.00</p>
                </li>
                <li className={style.billsItem}>
                  <p className={style.billsItemName}>Total Upcoming</p>
                  <p className={style.billsItemAmount}>$194.98</p>
                </li>
                <li className={style.billsItem}>
                  <p className={style.billsItemName}>Due Soon</p>
                  <p className={style.billsItemAmount}>$59.98</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
