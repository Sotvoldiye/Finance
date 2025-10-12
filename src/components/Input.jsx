import React, { useEffect, useState } from "react";
import Select from "react-select";
import style from "./Input.module.scss";
import { useCollectionsData } from "../hooks/useCollectionsData";

function GroupedSelect({
  onChange,
  defaultValue = [0],
  isEditing = false,        // 🔹 yangi prop
  existingData = {},        // 🔹 tahrirlanayotgan element (masalan: { category: "Bills" })
}) {
  const formSpend = [
    { value: "Entertainment", label: "Entertainment" },
    { value: "Bills", label: "Bills" },
    { value: "Groceries", label: "Groceries" },
    { value: "Dining Out", label: "Dining Out" },
    { value: "Transportation", label: "Transportation" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Education", label: "Education" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Shopping", label: "Shopping" },
    { value: "General", label: "General" },
  ];

  const { data } = useCollectionsData();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    if (data && data.budgets) {
      setBudgets(data.budgets);
    }
  }, [data]);

  const [selectedOption, setSelectedOption] = useState(
    formSpend.find((item) => item.value === defaultValue) || formSpend[0]
  );

  useEffect(() => {
    if (isEditing && existingData?.category) {
      const found = formSpend.find((c) => c.value === existingData.category);
      if (found) setSelectedOption(found);
    } else if (!isEditing && defaultValue) {
      const found = formSpend.find((c) => c.value === defaultValue);
      if (found) setSelectedOption(found);
    } else {
      setSelectedOption(null);
    }
  }, [isEditing, existingData, defaultValue]);

  const handleChange = (option) => {
    setSelectedOption(option);
    if (onChange) onChange(option.value);
  };

  // 🔹 “already used” faqat boshqa budjetlarda chiqadi (o‘zi tahrirlanayotgan emas)
  const formatOptionLabel = ({ label, value }) => {
    const isUsed = budgets.some(
      (b) =>
        b.category === value &&
        (!isEditing || b.category !== existingData.category)
    );

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 14,
        }}
      >
        <span>{label}</span>
        {isUsed && (
          <span style={{ color: "red", fontSize: 12 }}>already used</span>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label className={style.label} htmlFor="form-select">
        Budget Category
      </label>
      <Select
        className={style.select}
        inputId="form-select"
        value={selectedOption}
        options={formSpend}
        onChange={handleChange}
        formatOptionLabel={formatOptionLabel}
        isOptionDisabled={(option) =>
          budgets.some(
            (b) =>
              b.category === option.value &&
              (!isEditing || b.category !== existingData.category)
          )
        }
      />
    </div>
  );
}

export default GroupedSelect;
