import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../assets/medikart.png";

const neutralColor = "#4b5563"; // gray-600

const neutralStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: neutralColor,
  },
  section: { marginBottom: 10 },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: neutralColor,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#d1d5db", // light gray border
    paddingBottom: 4,
    marginBottom: 4,
  },
  cell: { flex: 1 },
  totalRow: { marginTop: 10, fontWeight: "bold", textAlign: "right" },
  logo: { width: 80, height: 80, marginBottom: 10, alignSelf: "center" },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: "#9ca3af", // lighter gray for footer
    textAlign: "center",
  },
});

const InvoiceDocument = ({ paymentIntent, items }) => {
  const styles = neutralStyles;
  const total = items.reduce(
    (acc, item) =>
      acc +
      item.quantity *
        item.pricePerUnit *
        (1 - (item.discountPercentage || 0) / 100),
    0
  );

  return (
    <Document>
      <Page style={styles.page}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image src={Logo} style={styles.logo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Invoice - MediKart</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
          <Text>Email: {paymentIntent?.receipt_email || "N/A"}</Text>
          <Text>Transaction ID: {paymentIntent?.id}</Text>
          <Text>Status: {paymentIntent?.status}</Text>
        </View>

        <View style={{ ...styles.row, fontWeight: "bold" }}>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Company</Text>
          <Text style={styles.cell}>Qty</Text>
          <Text style={styles.cell}>Unit Price</Text>
          <Text style={styles.cell}>Discount</Text>
          <Text style={styles.cell}>Total</Text>
        </View>

        {items.map((item) => (
          <View style={styles.row} key={item._id}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.company || "N/A"}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}>${item.pricePerUnit.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.discountPercentage || 0}%</Text>
            <Text style={styles.cell}>
              $
              {(
                item.quantity *
                item.pricePerUnit *
                (1 - (item.discountPercentage || 0) / 100)
              ).toFixed(2)}
            </Text>
          </View>
        ))}

        <Text style={styles.totalRow}>Grand Total: ${total.toFixed(2)}</Text>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
};

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentIntent, items } = location.state || {};

  useEffect(() => {
    if (!paymentIntent || !items) {
      navigate("/");
    }
  }, [paymentIntent, items, navigate]);

  const printInvoice = () => window.print();

  return (
    <div className="bg-white text-gray-700 min-h-screen p-8">
      <h1
        className="text-3xl font-bold text-center mb-8"
        style={{ color: neutralColor }}
      >
        Invoice
      </h1>

      {paymentIntent && items && (
        <>
          <div className="bg-gray-50 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <img
                src={Logo}
                alt="MediKart Logo"
                className="mx-auto mb-4"
                style={{ width: 120 }}
              />
            </div>

            <div
              className="mb-4 space-y-1 border-b border-gray-300 pb-4"
              style={{ color: neutralColor }}
            >
              <p>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Email:</strong> {paymentIntent.receipt_email || "N/A"}
              </p>
              <p>
                <strong>Transaction ID:</strong> {paymentIntent.id}
              </p>
              <p>
                <strong>Status:</strong> {paymentIntent.status}
              </p>
            </div>

            <div className="max-h-[400px] overflow-y-auto rounded-md border border-gray-300">
              <table className="w-full table-auto border-collapse">
                <thead
                  className="bg-gray-200 sticky top-0"
                  style={{ color: neutralColor }}
                >
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 text-left">
                      Name
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-left">
                      Company
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-center">
                      Qty
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-right">
                      Unit Price
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-right">
                      Discount %
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const total =
                      item.quantity *
                      item.pricePerUnit *
                      (1 - (item.discountPercentage || 0) / 100);
                    return (
                      <tr
                        key={item._id}
                        className="even:bg-gray-100"
                        style={{ color: neutralColor }}
                      >
                        <td className="border border-gray-400 px-4 py-2">
                          {item.name}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item.company || "N/A"}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-right">
                          ${item.pricePerUnit.toFixed(2)}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-right">
                          {item.discountPercentage || 0}%
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-right">
                          ${total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr
                    className="bg-gray-200 font-bold"
                    style={{ color: neutralColor }}
                  >
                    <td
                      colSpan={5}
                      className="border border-gray-400 px-4 py-2 text-right"
                    >
                      Grand Total:
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-right">
                      $
                      {items
                        .reduce(
                          (acc, item) =>
                            acc +
                            item.quantity *
                              item.pricePerUnit *
                              (1 - (item.discountPercentage || 0) / 100),
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <PDFDownloadLink
              document={
                <InvoiceDocument paymentIntent={paymentIntent} items={items} />
              }
              fileName={`Invoice-${paymentIntent.id}.pdf`}
              className="btn btn-neutral"
              style={{
                backgroundColor: neutralColor,
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                textDecoration: "none",
              }}
            >
              {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
            </PDFDownloadLink>

            <button
              onClick={printInvoice}
              className="btn btn-neutral"
              style={{
                backgroundColor: neutralColor,
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
              }}
            >
              Print Invoice
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoicePage;
