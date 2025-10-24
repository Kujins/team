import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const formatScoresMultiline = (scores) => {
  if (!scores) return "N/A";
  return Object.entries(scores)
    .map(([category, score]) => `${category}: ${score}`)
    .join("\n"); // newline for multiline cell
};

const getTotalScore = (scores) => {
  if (!scores) return 0;
  return Object.values(scores).reduce((acc, val) => acc + val, 0);
};

export const exportEntriesToPDF = (entries) => {
  const doc = new jsPDF();
  doc.text("CARS Entries", 14, 10);

  const tableData = entries.map((e) => [
    e.childNo,
    e.name,
    e.age,
    e.gender || "N/A",
    e.date,
    e.severity?.label || "N/A",
    formatScoresMultiline(e.scores),
    getTotalScore(e.scores).toFixed(1),
  ]);

  autoTable(doc, {
    head: [
      [
        "Child No",
        "Name",
        "Age",
        "Gender",
        "Date",
        "Severity",
        "Scores",
        "Total Score",
      ],
    ],
    body: tableData,
    styles: { fontSize: 8, cellWidth: 'wrap', overflow: 'linebreak' },
    headStyles: { fillColor: [41, 128, 185] },
    startY: 20,
  });

  doc.save("cars_entries_full_details.pdf");
};
