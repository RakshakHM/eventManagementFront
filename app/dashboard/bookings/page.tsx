import { BookingsTable } from "@/components/bookings-table";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
      <BookingsTable />
    </div>
  );
}
