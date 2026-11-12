import React from "react";

 const summaryColors = {
  "Total Applications": "total-applications",
  "Applied": "status-applied",
  "Interviews": "status-interview",
  "Rejected": "status-rejected",
  "Offers": "status-offered",
};

const SummaryCard = ({ title, value = 0 }) => {

  const colorClass = summaryColors[title] || "";

  return (
    <div
  className="relative flex-1 border rounded-xl p-20 bg-indigo-50 border-indigo-200 text-indigo-700 hover:scale-103 hover:shadow-xl/30 hover:shadow-indigo-600"
  id={colorClass}
>
      <p className="absolute top-2 left-2 text-xl">{title}</p>
      <strong className="absolute left-45 text-4xl">{value}</strong>
    </div>
  );
};

export default SummaryCard;
