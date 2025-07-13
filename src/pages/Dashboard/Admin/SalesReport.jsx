import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: 1,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    paddingVertical: 2,
  },
  cell: {
    width: "16.6%",
    fontSize: 10,
  },
});

const SalesReportPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Sales Report</Text>
      <View style={styles.tableHeader}>
        {["#", "Medicine", "Seller", "Buyer", "Price", "Date"].map((h, i) => (
          <Text key={i} style={styles.cell}>
            {h}
          </Text>
        ))}
      </View>
      {data.map((sale, i) => (
        <View key={i} style={styles.tableRow}>
          <Text style={styles.cell}>{i + 1}</Text>
          <Text style={styles.cell}>{sale.medicineName}</Text>
          <Text style={styles.cell}>{sale.sellerEmail}</Text>
          <Text style={styles.cell}>{sale.buyerEmail}</Text>
          <Text style={styles.cell}>${sale.totalPrice}</Text>
          <Text style={styles.cell}>
            {new Date(sale.date).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://medikart-server-pjna.onrender.com/api/sales")
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
        setFilteredSales(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterByDate = () => {
    if (!startDate || !endDate) return;

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

  const exportToPDF = async () => {
    const blob = await pdf(<SalesReportPDF data={filteredSales} />).toBlob();
    saveAs(blob, "sales_report.pdf");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📈 Sales Report</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex items-end">
          <button onClick={filterByDate} className="btn btn-primary w-full">
            Filter
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="btn btn-success" onClick={exportToExcel}>
          Export to Excel
        </button>
        <button className="btn btn-error" onClick={exportToPDF}>
          Export to PDF
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredSales.length === 0 ? (
        <p className="text-center text-gray-500">No sales data found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Medicine</th>
                <th>Seller</th>
                <th>Buyer</th>
                <th>Total Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{sale.medicineName}</td>
                  <td>{sale.sellerEmail}</td>
                  <td>{sale.buyerEmail}</td>
                  <td>${sale.totalPrice}</td>
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
