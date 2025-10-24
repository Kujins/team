import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Helper: format session/section data
const formatSections = (entry) => {
  const sectionKeys = Object.keys(entry).filter((key) => Array.isArray(entry[key]) && entry[key].length);

  return sectionKeys
    .map((section) => {
      const dates = entry[section].filter(Boolean).join(", ");
      return `${section}: ${dates || "N/A"}`;
    })
    .join("\n\n");
};

export const exportMFEntriesToPDF = (entries) => {
  const doc = new jsPDF();
  doc.text("Mathavam Flowchart Entries", 14, 10);

  const tableData = entries.map((entry) => [
    entry.childNo || "N/A",
    entry.name || "N/A",
    entry.age || "N/A",
    entry.gender || "N/A",
    entry.date || "N/A",
    entry.activities || "N/A",
    formatSections(entry),
  ]);

  autoTable(doc, {
    head: [["Child No", "Name", "Age", "Gender", "Start Date", "Activities"]],
    body: tableData,
    styles: {
      fontSize: 8,
      cellWidth: "wrap",
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [39, 174, 96], // green header
    },
    startY: 20,
  });

  doc.save("mathavam_flowchart_entries.pdf");
};
