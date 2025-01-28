import { Pizza } from "lucide-react";
import { ResponsiveOutletModal } from "@/components/responsive-outlet-modal.jsx";
import { formatTime } from "../utils/time";

export function BlockCard({ block }) {
  const isEmptyBlock = block.subject === null;
  const isLunchBlock = block.type === "LUNCH" && block.subject === null;
  const isBreakBlock = block.type === "BREAK" && block.subject === null;

  const blockLabel = isBreakBlock
    ? "Descanso"
    : isLunchBlock
    ? "Almuerzo"
    : isEmptyBlock
    ? "Sin asignar"
    : block.subject?.name;

  const timeRange = `${formatTime(block.timeRange.startTime)} - ${formatTime(
    block.timeRange.endTime
  )}`;

  const baseClasses =
    "select-none justify-center flex flex-col items-center p-2 rounded hover:ring-2  hover:ring-primary cursor-pointer transition-all duration-300 border w-[20rem] md:w-[13rem] shadow text-foreground";

  if (isBreakBlock) {
    return (
      <div className={`${baseClasses} bg-muted/50`}>
        <h3 className="font-bold">{blockLabel}</h3>
        <p className="bg-background/70 rounded-md w-fit font-bold text-sm p-1 px-2">
          {timeRange}
        </p>
      </div>
    );
  }

  if (isLunchBlock) {
    return (
      <div className={`${baseClasses} bg-muted relative`}>
        <Pizza className="absolute top-2 right-2 text-muted-foreground" />
        <h3 className="font-bold">{blockLabel}</h3>
        <p className="bg-background/70 rounded-md w-fit font-bold text-sm p-1 px-2">
          {timeRange}
        </p>
      </div>
    );
  }

  if (isEmptyBlock) {
    return (
      <EmptyBlockCard
        blockId={block.id}
        blockLabel={blockLabel}
        timeRange={timeRange}
        baseClasses={baseClasses}
      />
    );
  }

  //Si no es un tipo de bloque definido anteriormente, se asume que es un bloque de clase.
  return (
    <div
      style={{
        borderLeftWidth: "6px",
        borderLeftColor: block.subject.color,
        "--subject-color-d": block.subject.color,
      }}
      className={`${baseClasses} bg-card hover:ring-[var(--subject-color-d)]`}
    >
      <h3 className="font-bold">{blockLabel}</h3>
      <p className="bg-background/70 rounded-md w-fit font-bold text-sm p-1 px-2">
        {timeRange}
      </p>
    </div>
  );
}

function EmptyBlockCard({ blockLabel, timeRange, baseClasses, blockId }) {
  const isAdmin = true;

  if (isAdmin) {
    return (
      <ResponsiveOutletModal
        to={`assign-class/${blockId}`}
        trigger={
          <div className={`${baseClasses} bg-background`}>
            <h3 className="font-bold text-muted-foreground">{blockLabel}</h3>
            <p className="bg-background/70 rounded-md w-fit font-bold text-sm p-1 px-2">
              {timeRange}
            </p>
          </div>
        }
        title={"Asignar clase"}
        description={`Selecciona una clase para asignar al bloque [${timeRange}]`}
      />
    );
  }

  return (
    <div className={`${baseClasses} bg-background`}>
      <h3 className="font-bold text-muted-foreground">{blockLabel}</h3>
      <p className="bg-background/70 rounded-md w-fit font-bold text-sm p-1 px-2">
        {timeRange}
      </p>
    </div>
  );
}
