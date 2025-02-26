import { ArrowUpRight } from "lucide-react";

export default function Arrow({ size }) {
  return (
    <span className="bg-black inline-flex items-center justify-center rounded-full">
      <ArrowUpRight color="white" size={size} />
    </span>
  );
}
