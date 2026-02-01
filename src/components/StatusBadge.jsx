const StatusBadge = ({status}) => {
   const statusConfig = {
      CREATED: {
         bg: "bg-blue-500/20",
         text: "text-blue-300",
         label: "CREATED",
      },
      PROCESSING: {
         bg: "bg-green-500/20",
         text: "text-green-300",
         label: "PROCESSING",
      },
      OUT_FOR_DELIVERY: {
         bg: "bg-yellow-500/20",
         text: "text-yellow-300",
         label: "OUT FOR DELIVERY",
      },
      DELIVERED: {
         bg: "bg-purple-500/20",
         text: "text-purple-300",
         label: "DELIVERED",
      },
      CANCELLED: {
         bg: "bg-red-500/20",
         text: "text-red-300",
         label: "CANCELLED",
      }
   };

   const config = statusConfig[status] || statusConfig.CREATED;

   return (
      <span
         className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
      {config.label}
    </span>
   );
};

export default StatusBadge;
