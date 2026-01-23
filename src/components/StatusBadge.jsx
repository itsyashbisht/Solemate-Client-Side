const StatusBadge = ({ status }) => {
  const statusConfig = {
    unconfirmed: {
      bg: "bg-blue-500/20",
      text: "text-blue-300",
      label: "Unconfirmed",
    },
    confirmed: {
      bg: "bg-green-500/20",
      text: "text-green-300",
      label: "Confirmed",
    },
    shipped: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-300",
      label: "Shipped",
    },
    delivered: {
      bg: "bg-purple-500/20",
      text: "text-purple-300",
      label: "Delivered",
    },
  };

  const config = statusConfig[status] || statusConfig.unconfirmed;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
