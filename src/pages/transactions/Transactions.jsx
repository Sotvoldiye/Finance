import React, { useEffect, useState } from "react";
import style from "./Transactions.module.scss";
import { useCollectionsData } from "../../hooks/useCollectionsData";
const Transactions = () => {
  const { data, isPending } = useCollectionsData();
  const [tranactions, setTransActions] = useState([]);
  const [category, setCategory] = useState("t");
  const [grouped, setGrouped] = useState({});
  const [sortBy, setSorBy] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (data && data.transactions) {
      setTransActions(data.transactions);
    }
  }, [data]);
  useEffect(() => {
    if (tranactions.length > 0) {
      const setGroupe = tranactions.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});
      setGrouped(setGroupe);
    }
  }, [tranactions]);

  return (
    <div className={style.transActionsContaniner}>
      <h1>Transactions</h1>
      <div className={style.transContaniner}>
        <div className={style.navbar}>
          <div className={style.searchingInputs}>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search transaction"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className={style.left_section}>
            <div className={style.allSort}>
              {" "}
              <p>Sort by</p>
              <select
                name="latest"
                value={sortBy}
                onChange={(e) => setSorBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A to Z</option>
                <option value="za">Z to A</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
              </select>
            </div>
            <div className={style.allcategory}>
              <p>Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="t">All Transactions</option>
                {Object.entries(grouped).map(([category, items]) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
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
            {tranactions
              .filter((t) => {
                const matchCategory =
                  category === "t" || t.category === category;
                const matchSearch = t.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
                return matchCategory && matchSearch;
              })
              .sort((a, b) => {
                switch (sortBy) {
                  case "latest":
                    return new Date(b.date) - new Date(a.date);
                  case "oldest":
                    return new Date(a.date) - new Date(b.date);
                  case "az":
                    return a.name.localeCompare(b.name);
                  case "za":
                    return b.name.localeCompare(a.name);
                  case "highest":
                    return b.amount - a.amount;
                  case "lowest":
                    return a.amount - b.amount;
                  default:
                    return 0;
                }
              })
              .map((t) => (
                <tr key={t.id}>
                  <td className={style.img_name}>
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
                    <p
                      className={`${style.amount} ${
                        t.amount > 0 ? style.amountPlus : style.amountMinus
                      }`}
                    >
                      {t.amount > 0 ? `+${t.amount}` : t.amount}
                    </p>
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
