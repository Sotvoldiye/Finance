"use client";
import { useEffect, useState } from "react";

export function ProgressDemo({
  theme,
  target,
  total,
  withdrawAmount = 0,
  addrawAmount = 0,
}) {
  const [progress, setProgress] = useState(0);
  const [changeProgress, setChangeProgress] = useState(0);
  const [isWithdraw, setIsWithdraw] = useState(false);

  useEffect(() => {
    if (!target || target <= 0) return;

    // 🔹 Joriy progress (umumiy foiz)
    const currentPercent = Math.min((total / target) * 100, 100);
    setProgress(currentPercent);

    // 🔹 Qo‘shish yoki yechish holatini aniqlaymiz
    if (withdrawAmount > 0) {
      const newPercent = Math.max(((total - withdrawAmount) / target) * 100, 0);
      setChangeProgress(currentPercent - newPercent);
      setIsWithdraw(true);
    } else if (addrawAmount > 0) {
      const newPercent = Math.min(((total + addrawAmount) / target) * 100, 100);
      setChangeProgress(newPercent - currentPercent);
      setIsWithdraw(false);
    } else {
      setChangeProgress(0);
    }
  }, [target, total, withdrawAmount, addrawAmount]);

  return (
    <div className="w-full flex flex-col gap-[12px] relative">
      <div className="relative w-full h-2 rounded-full bg-[#F8F4F0] overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            backgroundColor: theme.theme || theme,
          }}
        ></div>

        {changeProgress > 0 && (
          <div
            className="absolute top-0 h-full transition-all duration-700"
            style={{
              left: isWithdraw
                ? `${progress - changeProgress}%`
                : `${progress}%`,
              width: `${changeProgress}%`,
              backgroundColor: isWithdraw ? "#C94736" : "#277C78",
              marginLeft: isWithdraw ? "0px" : "2px",
              marginRight: isWithdraw ? "1px" : "0px", // ✅ to‘g‘ri yozilishi
            }}
          ></div>
        )}
      </div>

      <div className="text-sm mt-[13px] f lex justify-between text-[#696868] text-[12px]">
        <p className="font-bold">
          {isWithdraw
            ? (progress - changeProgress).toFixed(0)
            : (progress + changeProgress).toFixed(0)}
          %
        </p>
        <p>Target of ${target}</p>
      </div>
    </div>
  );
}
