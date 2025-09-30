import React, { useEffect, useState } from "react";
import style from "./Transactions.module.scss";
import { useCollectionsData } from "../../hooks/useCollectionsData";
const Transactions = () => {
  const { data, isPending } = useCollectionsData();
  const [tranactions, setTransActions] = useState([]);
  useEffect(() => {
    if (data && data.transactions) {
      setTransActions(data.transactions);
    }
  }, [data]);
  console.log(tranactions);
  console.log(data)
  return (
    <div className={style.transActionsContaniner}>
      <h1>Transactions</h1>
      <div>
        <div>
          <div className={style.searchingInputs}>
            <input type="text" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <p>Sort by</p>
          <select name="latest">
            <option value="1">Latest</option>
          </select>
          <p>Category</p>
          <select>
            <option value="t">All Transactions</option>
          </select>
        </div>
        <table>
  <thead>
    <tr>
      <th>Recipient / Sender</th>
      <th>Category</th>
      <th>Transaction Date</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {tranactions && tranactions.map((t) => (
      <tr key={t.id}>
        <td className={data.img_name}>
          <img className={style.table_image} src={t.avatar} alt="" />
          <p>{t.name}</p>
        </td>
        <td>
          <p>{t.category}</p>
        </td>
        <td>
          <p>
            {new Date(t.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </td>
        <td>
          <p>{t.amount}</p>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default Transactions;
