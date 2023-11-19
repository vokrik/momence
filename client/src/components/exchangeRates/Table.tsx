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
        accessorKey: "currency",
        header: "Currency",
        size: 150,
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 200,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 150,
      },
      {
        accessorKey: "rate",
        header: "Rate",
        size: 150,
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
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
