import React, { useEffect, useState } from "react";
import style from "./Transactions.module.scss";
import { useCollectionsData } from "../../hooks/useCollectionsData";
import { PaginationDemo } from "../../components/Pagination";

const ITEMS_PER_PAGE = 10;

const Transactions = () => {
  const { data, isPending } = useCollectionsData();
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState("t");
  const [grouped, setGrouped] = useState({});
  const [sortBy, setSortBy] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTransactions, setPaginatedTransactions] = useState([]);

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions);
    }
  }, [data]);

  useEffect(() => {
    if (transactions.length > 0) {
      const groupedData = transactions.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});
      setGrouped(groupedData);
    }
  }, [transactions]);

  useEffect(() => {
    const filtered = transactions
      .filter((t) => {
        const matchCategory = category === "t" || t.category === category;
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
      });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedTransactions(filtered.slice(startIndex, endIndex));
  }, [transactions, category, searchTerm, sortBy, currentPage]);

  const totalPages = Math.ceil(
    transactions.filter((t) => {
      const matchCategory = category === "t" || t.category === category;
      const matchSearch = t.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    }).length / ITEMS_PER_PAGE
  );

  return (
    <div className={style.transActionsContaniner}>
      <h1 className={style.title}>Transactions</h1>

      <div className={style.transContaniner}>
        {/* 🔍 Navbar */}
        <div className={style.navbar}>
          <div className={style.searchingInputs}>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search transaction"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <div className={style.left_section}>
            <div className={style.allSort}>
              <p>Sort by</p>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
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
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="t">All Transactions</option>
                {Object.entries(grouped).map(([cat]) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 📊 Jadval */}
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Recipient / Sender</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((t) => (
                <tr key={t.id}>
                  <td className={style.img_name}>
                    <img className={style.table_image} src={t.avatar} alt="" />
                    <p>{t.name}</p>
                  </td>
                  <td > {t.category}</td>
                  <td>
                    {new Date(t.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td
                    className={`${style.amount} ${
                      t.amount > 0 ? style.amountPlus : style.amountMinus
                    }`}
                  >
                    {t.amount > 0 ? `+${t.amount}` : t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📄 Pagination */}
        {totalPages > 1 && (
          <PaginationDemo
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
              onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
  onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
