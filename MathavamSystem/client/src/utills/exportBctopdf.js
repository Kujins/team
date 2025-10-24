import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import sections from "../components/questionsData"; // Make sure this exports `sections` array

const answerLabels = {
  "1": "Never",
  "2": "Sometimes",
  "3": "Often",
  "5": "Always",
  "NA": "N/A",
};

const getTotalScore = (scores) => {
  if (!scores) return 0;
  return Object.values(scores).reduce((acc, val) => acc + val, 0);
};

export const exportBctopdf = (entries) => {
  const doc = new jsPDF();

  entries.forEach((entry, index) => {
    if (index !== 0) doc.addPage();

    doc.setFontSize(12);
    doc.text(`Child No: ${entry.childNo}`, 14, 14);
    doc.text(`Name: ${entry.name}`, 14, 22);
    doc.text(`Age: ${entry.age}`, 14, 30);
    doc.text(`Gender: ${entry.gender || "N/A"}`, 14, 38);
    doc.text(`Date: ${entry.date}`, 14, 46);
    doc.text(`Severity: ${entry.severity?.label || "N/A"}`, 14, 54);
    doc.text(`Total Score: ${getTotalScore(entry.scores).toFixed(1)}`, 14, 62);

    let startY = 70;

    sections.forEach((section) => {
      const questions = section.questions;
      const answers = entry[section.key];

      if (!answers) return;

      const tableData = questions.map((q, i) => {
        const raw = answers[i] || "N/A";
        const label = answerLabels[raw] || "N/A";
        return [q, raw, label];
      });

      autoTable(doc, {
        startY,
        head: [[section.title, "Answer", "Label"]],
        body: tableData,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [63, 81, 181], textColor: 255 },
        theme: "striped",
        margin: { left: 14, right: 14 },
      });

      startY = doc.previousAutoTable.finalY + 10;
    });
  });

  doc.save("BehaviorChecklist_Details.pdf");
};
