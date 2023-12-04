import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { XIcon } from "lucide-react";
import { useState, forwardRef } from "react";
import { Input } from "./Input";

const InputTags = forwardRef(({ value = [], onChange, ...props }, ref) => {
  const [pendingDataPoint, setPendingDataPoint] = useState("");

  const addPendingDataPoint = () => {
    if (pendingDataPoint) {
      const newDataPoints = new Set([...value, pendingDataPoint]);
      onChange(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          value={pendingDataPoint}
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "," || e.key === " ") {
              e.preventDefault();
              addPendingDataPoint();
            }
          }}
          {...props}
          ref={ref}
        />
        <Button type="button" variant="secondary" onClick={addPendingDataPoint}>
          Add
        </Button>
      </div>
      <div className="flex min-h-[2.5rem] flex-wrap items-center gap-2 overflow-y-auto rounded-md border p-2">
        {value.map((item, idx) => (
          <Badge key={idx} variant="secondary">
            {item}
            <button
              type="button"
              className="ml-2 w-3"
              onClick={() => {
                onChange(value.filter((i) => i !== item));
              }}
            >
              <XIcon className="w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
});

InputTags.displayName = InputTags;
export { InputTags };
