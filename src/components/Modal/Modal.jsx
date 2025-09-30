import React from "react";
import style from "./MOdal.module.scss";
function Modal({
  title,
  category,
  setAddBudget,
  type= null,
  Dot = null,
  GroupedSelect = null,
  delate,
  retry= null,
  button= null,
}) {
  return (
    <div className={style.modal_overlay}>
      <div className={style.modal}>
        <header>
          <h1>{title}</h1>
          <button onClick={() => setAddBudget(false)}>
            <img src="./images/icon-close-modal.svg" alt="" />
          </button>
        </header>
        <p className={style.category}>{category}</p>
        <form>
          {GroupedSelect && <GroupedSelect />}
        { type &&
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="number">Maximum Spend</label>
            <div className={style.input}>
              $
              <input
                id="number"
                name="number"
                type={type}
                placeholder="e.g.200"
                required
              />
            </div>
          </div>
}
          {Dot && <Dot />} {button && <button>{button}</button>}
          {delate && <button className={style.delete}>{delate}</button>}
          {retry && <button className={style.retry}>{retry}</button>}
        </form>
      </div>
    </div>
  );
}

export default Modal;
