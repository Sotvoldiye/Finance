import React, { useState } from "react";
import Select from "react-select";

function GroupedSelect() {
  const formSpend = [
    { value: "Entertainment", label: "Entertainment" },
    { value: "Bills", label: "Bills"},
    { value: "Groceries", label: "Groceries"},
    { value: "diningout", label: "Dining Out"},
    { value: "Transportation", label: "Transportation"},
    { value: "Personalcare", label: "Personal Care"},
    { value: "Education", label: "Education"},
    { value: "Lifestyle", label: "Lifestyle"},
    { value: "Shopping", label: "Shopping"},
    { value: "General", label: "General"},

  ];


  const [selectedOption, setSelectedOption] = useState(formSpend[0]);

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: '14px',
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",

  }




  return (
    <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
        <label htmlFor="form-select">Budget Category</label>
    <Select
    inputId="form-select"
      value={selectedOption}
      defaultValue={formSpend[2]}
      options={formSpend}
      onChange={(option) => setSelectedOption(option)}
    />
    </div>

  );
}

export default GroupedSelect;
