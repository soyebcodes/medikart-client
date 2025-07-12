import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/sales")
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
        setFilteredSales(data);
      });
  }, []);

  const filterByDate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return saleDate >= start && saleDate <= end;
    });

    setFilteredSales(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    XLSX.writeFile(workbook, "sales_report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 16);
    const tableData = filteredSales.map((sale, i) => [
      i + 1,
      sale.medicineName,
      sale.sellerEmail,
      sale.buyerEmail,
      sale.totalPrice,
      new Date(sale.date).toLocaleDateString(),
    ]);
    doc.autoTable({
      head: [["#", "Medicine", "Seller", "Buyer", "Total Price", "Date"]],
      body: tableData,
    });
    doc.save("sales_report.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded self-end"
          onClick={filterByDate}
        >
          Filter
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={exportToPDF}
        >
          Export to PDF
        </button>
      </div>

      <table className="w-full border text-left">
        <thead className="">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Medicine</th>
            <th className="p-2">Seller</th>
            <th className="p-2">Buyer</th>
            <th className="p-2">Total Price</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale, index) => (
            <tr key={sale.id} className="border-t">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{sale.medicineName}</td>
              <td className="p-2">{sale.sellerEmail}</td>
              <td className="p-2">{sale.buyerEmail}</td>
              <td className="p-2">${sale.totalPrice}</td>
              <td className="p-2">
                {new Date(sale.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
