import React, { useEffect, useState } from "react";
import Select from "react-select";
import chroma from "chroma-js";
import { useCollectionsData } from "../hooks/useCollectionsData";

export function PotDot({
  onChange,
  defaultValue = [0],
  isEditing = false, // 🔹 edit rejimi
  existingData = {}, // 🔹 tahrirlanayotgan element (masalan: { theme: '#FF8B00' })
}) {
  const colourOptions = [
    { value: "ocean", label: "Green", color: "#277C78" },
    { value: "blue", label: "Yellow", color: "#F2CDAC" },
    { value: "purple", label: "Cyan", color: "#82C9D7" },
    { value: "red", label: "Navy", color: "#C94736" },
    { value: "orange", label: "Purple", color: "#826CB0" },
    { value: "yellow", label: "Turquoise", color: "#597C7C" },
    { value: "green", label: "Brown", color: "#93674F" },
    { value: "forest", label: "Magneta", color: "#934F6F" },
    { value: "slate", label: "Blue", color: "#3F82B2" },
    { value: "silver", label: "Grey", color: "#97A0AC" },
    { value: "army", label: "Army", color: "#7F9161" },
    { value: "pink", label: "Pink", color: "#AF81BA" },
    { value: "gold", label: "Gold", color: "#CAB361" },
    { value: "orange", label: "Orange", color: "#BE6C49" },
];

  const [selectColor, setSelectColor] = useState(
    colourOptions.find((item) => item.value === defaultValue) ||
      colourOptions[0]
  );

  const { data } = useCollectionsData();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    if (data && data.budgets) {
      setBudgets(data.budgets);
    }
  }, [data]);

  useEffect(() => {
    if (defaultValue) {
      const found = colourOptions.find((c) => c.color === defaultValue);
      if (found) setSelectColor(found);
    }
  }, [defaultValue]);

  const handleChange = (option) => {
    setSelectColor(option);
    if (onChange) onChange(option.color);
  };

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",
    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      borderColor: "red",
      "&:hover": {
        borderColor: "green",
        borderWidth: "2px",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  // 🔹 “already used” faqat boshqa budjetlarda chiqadi (o'zi tahrirlanayotgan emas)
  const formaOptionalLabel = ({ label, color }) => {
    const isUsed = budgets.some(
      (b) =>
        b.theme === color &&
        (!isEditing || b.theme !== existingData.theme)
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
          <span style={{ marginLeft: 10, color: "red", fontSize: 12 }}>
            already used
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        fontSize: 14,
      }}
    >
      <label htmlFor="color-select">
        <span style={{ fontSize: 12, color: "#696868" }}>Theme</span>
      </label>
      <Select
        inputId="color-select"
        options={colourOptions}
        styles={colourStyles}
        value={selectColor}
        formatOptionLabel={formaOptionalLabel}
        onChange={handleChange}
        isOptionDisabled={(option) =>
          budgets.some(
            (b) =>
              b.theme === option.color &&
              (!isEditing || b.theme !== existingData.theme)
          )
        }
      />
    </div>
  );
}
