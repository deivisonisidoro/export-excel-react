import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";

interface PopsType {
  columns: GridColDef[];
  rows: GridRowsProp;
}
export default function Table({ columns, rows }: PopsType) {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: () => <CustomToolbar columns={columns} rows={rows} />,
        }}
      />
    </div>
  );
}
