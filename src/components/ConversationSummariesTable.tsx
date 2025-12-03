import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// Interfaces
interface ConversationSummary {
  user: string;
  summary: string;
}

const columns: ColumnDef<ConversationSummary>[] = [
  {
    accessorKey: "summary",
    header: "Resumen",
    cell: ({ row }) => {
      const summary = row.getValue("summary") as string;
      return (
        <div className="max-w-2xl">
          <p className="text-xs text-gray-700">{summary}</p>
        </div>
      );
    },
  },
];

// Componente principal
export function ConversationSummariesTable({ data }: { data: ConversationSummary[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Card>
        <CardHeader>
          <CardTitle className="text-black">Resumen de Conversaciones</CardTitle>
        </CardHeader>
        <div className="rounded-md border mx-4">
            <Table className="border-none outline-0 overflow-y-auto">
            <TableBody>
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    >
                    No hay resultados.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
    </Card>
  );
}
