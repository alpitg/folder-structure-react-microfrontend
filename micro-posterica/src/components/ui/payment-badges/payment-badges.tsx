export type PaymentStatus = "pending" | "paid" | "failed" | "Refunded";

const badgeColors: Record<PaymentStatus, string> = {
  pending: "badge-light-warning",
  paid: "badge-light-success",
  failed: "badge-light-danger",
  Refunded: "badge-light-info",
};

const PaymentBadge = ({ status = "pending" }: { status?: PaymentStatus }) => (
  <span className={`badge ${badgeColors[status]}`}>{status}</span>
);

export default PaymentBadge;
