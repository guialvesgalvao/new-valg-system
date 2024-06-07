import { ExportingEvent } from "devextreme/ui/data_grid";
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

export function exportDataGrid (e: ExportingEvent, fileExportName: string) {
  if (e.format === 'xlsx') {
console.log('xlsx')

  }
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save(`${fileExportName}.pdf`);
    }).catch((e) => console.log(e))
  }
}