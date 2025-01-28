import { Spacer } from "@/Components/layout/spacer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile.jsx";
import { useLoaderData } from "react-router-dom";
import { TitleBar } from "../../../Components/title-bar.jsx";
import { BlockCard } from "../components/schedule-block-card.jsx";
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
      <TitleBar title={`${courseDetails.name} - Horario`} />
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
