import { CheckCircle, Clock, XCircle, PartyPopper } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Item {
  status: string;
  role: string;
  changedAt: string;
}

const statusIcon = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Clock className="text-yellow-500" size={18} />;
    case "CONFIRMED":
      return <CheckCircle className="text-blue-600" size={18} />;
    case "COMPLETED":
      return <PartyPopper className="text-green-600" size={18} />;
    case "CANCELLED":
      return <XCircle className="text-red-600" size={18} />;
    default:
      return <Clock size={18} />;
  }
};

const StatusTimeline = ({ history }: { history: Item[] }) => {
  return (
    <div className="relative space-y-6">
      {/* vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

      {history.map((item, index) => (
        <div key={index} className="flex gap-4 items-start">
          {/* icon */}
          <div className="relative z-10 w-10 flex justify-center">
            <div className="bg-background border rounded-full p-1.5">
              {statusIcon(item.status)}
            </div>
          </div>

          {/* content */}
          <div className="space-y-1 pt-0.5">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{item.status}</Badge>
              <span className="text-sm text-muted-foreground">{item.role}</span>
            </div>

            <p className="text-sm text-muted-foreground">
              {new Date(item.changedAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusTimeline;
