import { Spacer } from "@/Components/layout/spacer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile.jsx";
import { Pizza } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import { TitleBar } from "../../../Components/title-bar.jsx";
import { courseService } from "../services/course.service.js";
import { WEEKDAY_TRANSLATIONS } from "../utils/weekdays.js";
export async function courseScheduleLoader({ params }) {
  const courseId = params.courseId;
  const courseDetails = await courseService.getCourseDetails(courseId);

  const courseSchedule = await courseService.getCourseSchedule(courseId);
  return { courseDetails, courseSchedule };
}

export default function CourseSchedule() {
  const { courseDetails, courseSchedule } = useLoaderData();

  return (
    <>
      <TitleBar title={`Horario: ${courseDetails.name}`} />
      <Spacer size="4xs" />
      <div>
        <Schedule courseSchedule={courseSchedule} />
      </div>
    </>
  );
}

function Schedule({ courseSchedule }) {
  const isMobile = useIsMobile();
  const availableDays = Object.keys(courseSchedule);
  return (
    <>
      {isMobile ? (
        <Carousel className="md:hidden">
          <CarouselContent>
            {availableDays.map((day) => (
              <CarouselItem key={day}>
                <DayScheduleCard
                  name={WEEKDAY_TRANSLATIONS[day]}
                  day={courseSchedule[day]}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="hidden md:flex items-center gap-6 overflow-x-auto mx-auto w-fit px-1">
          {availableDays.map((day) => (
            <DayScheduleCard
              key={day}
              name={WEEKDAY_TRANSLATIONS[day]}
              day={courseSchedule[day]}
            />
          ))}
        </div>
      )}
    </>
  );
}
function BlockCard({ block }) {
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
    "justify-center flex flex-col items-center p-2 rounded hover:ring-2  hover:ring-primary cursor-pointer transition-all duration-300 border w-[20rem] md:w-[13rem] shadow text-foreground";

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
      <div className={`${baseClasses} bg-background`}>
        <h3 className="font-bold text-muted-foreground">{blockLabel}</h3>
        <p className="bg-background/70 rounded-md w-fit font-bold text-sm p-1 px-2">
          {timeRange}
        </p>
      </div>
    );
  }

  //Si no es un tipo de bloque definido anteriormente, se asume que es un bloque de clase.
  return (
    <div
      className={`${baseClasses} bg-card hover:ring-[var(--subject-color)]`}
      style={{
        borderLeftWidth: "6px",
        borderLeftColor: block.subject.color,
        "--subject-color": block.subject.color,
      }}
    >
      <h3 className="font-bold">{blockLabel}</h3>
      <p className="bg-background/70 rounded-md w-fit font-bold text-sm p-1 px-2">
        {timeRange}
      </p>
    </div>
  );
}

function DayScheduleCard({ name, day }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 ">
      <h1 className="text-xl font-bold my-2  ">{name}</h1>
      <div className="flex flex-col justify-center items-center gap-1">
        {day.map((block) => (
          <BlockCard key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}

function formatTime(time) {
  return time.substring(0, 5);
}
