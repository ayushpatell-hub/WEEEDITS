const styles: Record<string, string> = {
  pending: "border-yellow-500/40 text-yellow-400",
  in_progress: "border-blue-500/40 text-blue-400",
  review: "border-purple-500/40 text-purple-400",
  completed: "border-green-500/40 text-green-400",
  cancelled: "border-red-500/40 text-red-400",
};

const labels: Record<string, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  review: "In Review",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${
        styles[status] || "border-border text-muted"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}