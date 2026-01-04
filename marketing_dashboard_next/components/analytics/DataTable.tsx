import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface Column<T> {
  key: keyof T
  label: string
  format?: "number" | "currency" | "percentage" | "date"
  align?: "left" | "center" | "right"
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  emptyMessage?: string
}

export function DataTable<T extends object>({
  columns,
  data,
  isLoading,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const formatCell = (value: unknown, format?: Column<T>["format"]) => {
    if (value === null || value === undefined) return "—"

    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
        }).format(Number(value))
      case "percentage":
        return `${Number(value).toFixed(1)}%`
      case "number":
        return new Intl.NumberFormat("en-US").format(Number(value))
      case "date":
        return new Date(String(value)).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      default:
        return String(value)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card">
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header hover:bg-table-header">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                  column.align === "right" && "text-right",
                  column.align === "center" && "text-center",
                )}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index} className="transition-colors hover:bg-table-row-hover">
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className={cn(
                      "text-sm",
                      column.align === "right" && "text-right font-medium",
                      column.align === "center" && "text-center",
                    )}
                  >
                    {formatCell((row as Record<string, unknown>)[column.key as string], column.format)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
