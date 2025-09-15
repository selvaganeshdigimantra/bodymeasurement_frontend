// src/screens/History.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("measure_history") || "[]");
    setHistory(items);
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">History</h2>
      {history.length === 0 && <div>No records</div>}
      <div className="space-y-3">
        {history.map((r) => (
          <div key={r.id} className="bg-white/5 p-3 rounded-md flex items-center justify-between">
            <div>
              <div className="font-semibold">Accuracy: {r.accuracy}</div>
              <div className="text-sm opacity-80">{new Date(r.date).toLocaleString()}</div>
            </div>
            <img src={r.image} alt="thumb" className="w-20 h-20 object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
