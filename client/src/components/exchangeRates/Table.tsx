import { Typography } from "@mui/material";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import type { ExchangeRateInfo } from "./model/exchangeRatesService";

type Props = {
  rates: Array<ExchangeRateInfo>;
};
const Table = ({ rates }: Props) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ExchangeRateInfo>[]>(
    () => [
      {
        accessorKey: "country",
        header: "Country",
        size: 50,
      },
      {
        accessorKey: "currency",
        header: "Currency",
        size: 50,
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 50,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 50,
      },
      {
        accessorKey: "rate",
        header: "Rate",
        size: 50,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    enableRowSelection: false,
    enablePagination: false,
    enableColumnFilters: false,
    enableMultiRowSelection: false,
    enableSorting: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    data: rates,
    muiTableBodyCellProps: {
      sx: {
        pl: 3,
        pr: 3,
      },
    },
    muiTableHeadCellProps: {
      sx: {
        pl: 3,
        pr: 3,
      },
    },
    initialState: { density: "compact" },
    enableTableFooter: false,
    enableBottomToolbar: false,
    renderTopToolbarCustomActions: () => (
      <Typography variant="h4" pl={2}>
        All rates
      </Typography>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
