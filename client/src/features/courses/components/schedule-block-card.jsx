import { ResponsiveOutletModal } from "@/components/responsive-outlet-modal.jsx";
import { cn } from "@/lib/utils";
import { Utensils } from "lucide-react";
import Almuerzo from "../../../assets/Almuerzo.svg"
import Descanso from "../../../assets/Descanso.svg"
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
    "select-none justify-center flex flex-col items-center rounded hover:ring-2  hover:ring-primary cursor-pointer transition-all duration-300 border w-[260px] sm:w-[7.6rem] md:w-[13rem] shadow text-foreground";

  if (isBreakBlock) {
    return (
      <div className={cn(
        baseClasses,
        "bg-card [&:hover]:ring-[var(--subject-color-dark)] dark:hover:ring-[var(--subject-color-light)] overflow-hidden"
      )}>
        
        <div className="flex flex-row gap-2">
          <h3 className="p-2">{blockLabel}</h3>
          <img src={Descanso} alt="" className="mt-2.5 w-[12px] h-[15px]" />
          {/* <Utensils
            className="text-muted-foreground"
            size={20}
          /> */}          
        </div>
        <p className="bg-card-bottom rounded-none w-full text-center flex justify-center items-center  text-sm p-1">
        {timeRange}      
      </p>
      </div>
    );
  }

  if (isLunchBlock) {
    return (
      <div className={cn(
        baseClasses,
        "bg-[var(--subject-color-light)] dark:bg-[var(--subject-color-dark)] [&:hover]:ring-[var(--subject-color-dark)] dark:hover:ring-[var(--subject-color-light)] overflow-hidden"
      )}>
        
        <div className="flex flex-row gap-2">
          <h3 className="p-2">{blockLabel}</h3>
          <img src={Almuerzo} alt="" className="mt-2.5 w-[12px] h-[15px]" />
          {/* <Utensils
            className="text-muted-foreground"
            size={20}
          /> */}          
        </div>
        <p className="bg-card-bottom rounded-none w-full text-center flex justify-center items-center  text-sm p-1">
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
        "--subject-color-dark": block.subject.color.dark,
        "--subject-color-light": block.subject.color.light,
      }}
      className={cn(
        baseClasses,
        "bg-[var(--subject-color-light)] dark:bg-[var(--subject-color-dark)] [&:hover]:ring-[var(--subject-color-dark)] dark:hover:ring-[var(--subject-color-light)] overflow-hidden"
      )}
    >
      <h3 className="p-2  ">{blockLabel}</h3>
      <p className="bg-black/30 rounded-none w-full text-center flex justify-center items-center  text-sm p-1">
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
          <div className={`${baseClasses} bg-background p-2 `}>
            <h3 className=" text-muted-foreground">{blockLabel}</h3>
            <p className="bg-background/70 rounded-md w-fit  text-sm p-1 px-2">
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
      <h3 className=" text-muted-foreground">{blockLabel}</h3>
      <p className="bg-background/70 rounded-md w-fit text-sm p-1 px-2">
        {timeRange}
      </p>
    </div>
  );
}
