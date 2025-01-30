import { Spacer } from "@/components/layout/spacer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile.jsx";
import { useLoaderData } from "react-router-dom";
import { BlockCard } from "../../courses/components/schedule-block-card.jsx"
import { courseService } from "../../courses/services/course.service.js"
import { WEEKDAY_TRANSLATIONS } from "../../courses/utils/weekdays.js"

export async function courseScheduleLoaderStu({ params }) {
  const courseId = params.courseId;
  const courseDetails = await courseService.getCourseDetails(courseId);

  const courseSchedule = await courseService.getCourseSchedule(courseId);
  console.log("courseScheduleStu en loader:", courseSchedule);
  return { courseDetails, courseSchedule };
}



export default function CourseScheduleStudent() {
  const { courseDetails, courseSchedule } = useLoaderData();



  return (
    <>
    <div className="px-4 sm:px-2 sm:pt-10 md:pt-10 ">
      <h2 className="pt-4 text-3xl pb-10 sm:pl-3">Horario Estudiante</h2>
      {/* <TitleBar title={`${courseDetails.name} - Horario`} /> */}
      <Spacer size="4xs" />
        <div>
          <Schedule courseSchedule={courseSchedule} />        
        </div>
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
        <div className="hidden sm:flex md:flex items-center gap-6 sm:gap-5 overflow-x-auto mx-auto w-fit px-1">
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
