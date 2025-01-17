import { Button } from "@/Components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile.jsx";
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
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
      <div className="flex items-center gap-4  ">
        <Link to=".." relative="path" viewTransition prefetch="intent">
          <Button variant="outline" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <div className="text-xl font-bold">
          Horario: <span className="font-normal">{courseDetails.name}</span>
        </div>
      </div>
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
        <Carousel>
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
        <div className="flex  justify-center items-center gap-6 overflow-clip">
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

  const cardBackgroundColor = isBreakBlock
    ? "#d9d7c7"
    : isLunchBlock
    ? "#e0d367"
    : isEmptyBlock
    ? "transparent"
    : block.subject.color;

  return (
    <div
      style={{ backgroundColor: cardBackgroundColor }}
      className="justify-center flex flex-col items-center p-2 rounded hover:ring-2 hover:ring-offset-2 hover:ring-primary cursor-pointer transition-all duration-300 border w-[15rem] shadow text-foreground"
    >
      <h3 className="font-bold dark:text-shadow-outline">{blockLabel}</h3>
      <p className="bg-background/70  rounded-md w-fit font-bold text-sm p-1 px-2">
        {block.timeRange.startTime} - {block.timeRange.endTime}
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
