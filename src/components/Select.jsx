import React, { useState } from "react";
import Select from "react-select";
import chroma from "chroma-js";

export function Dot() {
  const [selectedOptioned, setSelectedOption] = useState(null);
  console.log(selectedOptioned);
  const colourOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", used: true },
    { value: "blue", label: "Blue", color: "#0052CC" },
    { value: "purple", label: "Purple", color: "#5243AA", used: true },
    { value: "red", label: "Red", color: "#FF5630" },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666", used: true },
  ];
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
      '&:hover':{
        borderColor: 'green',
        borderWidth: '2px'
      }
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

  const formaOptionalLabel = ({ label, used }, { context }) => {
    if (context === "menu") {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "cneter",
          }}
        >
          <span>{label}</span>
          {used && (
            <span style={{ marginLeft: 10, color: "red", fontSize: 12 }}>
              already used
            </span>
          )}
        </div>
      );
    }
    return label;
  };

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
        <label htmlFor="color-select">
        <span>Thehme</span>
      </label>
      <Select
        inputId="color-select"
        defaultValue={colourOptions[1]}
        options={colourOptions}
        styles={colourStyles}
        formatOptionLabel={formaOptionalLabel}
        onChange={(selected) => setSelectedOption(selected)}
      />
</div>
  );
}
