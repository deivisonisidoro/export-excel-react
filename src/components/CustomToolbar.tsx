import GetAppIcon from "@mui/icons-material/GetApp";
import { Button } from "@mui/material";
import {
  GridColDef,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface PopsType {
  columns: GridColDef[];
  rows: GridRowsProp;
}

interface ExportRow {
  [header: string]: any;
}

export default function CustomToolbar({ columns, rows }: PopsType) {
  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // Convert data with headers to sheet
    const dataWithHeaders: ExportRow[] = rows.map((row) => {
      const obj: ExportRow = {};
      columns
        .filter((column) => column.headerName)
        .forEach((column) => {
          if (column.headerName) obj[column.headerName] = row[column.field];
        });
      return obj;
    });
    // Convert data with headers to sheet
    const ws = XLSX.utils.json_to_sheet(dataWithHeaders);

    // Create workbook and add sheet with data
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    // Write workbook to buffer in xlsx format
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Convert buffer to Blob with specified MIME type
    const data = new Blob([excelBuffer], { type: fileType });

    // Save data as a file with specified filename
    FileSaver.saveAs(data, "fileName" + fileExtension);
  };

  return (
    <GridToolbarContainer>
      <Button variant="text" startIcon={<GetAppIcon />} onClick={exportToExcel}>
        Exportar
      </Button>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}
