import { useIsMobile } from "@/hooks/use-mobile.jsx";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Spacer } from "../../../components/layout/spacer";
import { TitleBar } from "../../../components/title-bar";
import { requireStudent } from "../../auth/services/auth.service";
import { courseService } from "../../courses/services/course.service";
import { notificationsService } from "../../courses/services/notifications.service";
import { subjectService } from "../../courses/services/subject.service";
import { profileService } from "../../profile/services/profile.service";
import EventDetailCalendar from "../components/EventDetailCalendar";
import "../styles/Calendario.css"; // Estilos que perzonalicé del componente de shadcn

export async function studentCalendarLoader() {
  await requireStudent();

  const currentStudentCourse = await courseService.getCurrentStudentCourse();

  const courseId = currentStudentCourse.data.id;

  const [events, subjects, user] = await Promise.all([
    notificationsService.getCourseEvents(courseId),
    subjectService.getSubjects(courseId),
    profileService.getProfileInfo(),
  ]);

  return {
    events: events.data,
    subjects: subjects.data,
    user: user.data,
    course: currentStudentCourse.data,
  };
}
export async function studentCalendarAction() {}

export default function StudentCalendar() {
  // const { events } = useEvents();
  const { events, user, subjects, course } = useLoaderData();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const highlightedDates = Array.from(
    new Set(events.map((event) => new Date(event.scheduledFor).toDateString())) // 🔥 Convierte a Date
  ).map((dateStr) => new Date(dateStr));

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (
        highlightedDates.some((d) => d.toDateString() === date.toDateString())
      ) {
        return date.toDateString() === new Date().toDateString()
          ? "highlight react-calendar__tile--active"
          : "highlight";
      }
    }
    return null;
  };

  const eventsForSelectedDate = events.filter(
    (event) =>
      new Date(event.scheduledFor).toDateString() === date.toDateString()
  );

  const handleDateClick = (selectedDate) => {
    setDate(selectedDate);

    if (isMobile) {
      // 🔥 Aseguramos que la fecha tenga hora 00:00 en zona horaria local
      const adjustedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      const formattedDate = adjustedDate.toISOString().split("T")[0];

      navigate(`/student/calendar/${formattedDate}`);
    }
  };

  return (
    <div className="md:pt-12 sm:px-4 md:px-0">
      <div className="calendario-y-novedades flex flex-row sm:flex-col gap-40 sm:gap-20 md:flex-row md:gap-40">
        <div>
          <TitleBar title={"Calendario"} />
          <Spacer size="3xs" />
          <Calendar
            onChange={handleDateClick}
            value={date}
            locale="es-ES"
            tileClassName={tileClassName}
            formatShortWeekday={(locale, date) => {
              const weekdays = ["L", "M", "M", "J", "V", "S", "D"];
              return weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1]; // 🔥 Reorganiza los días
            }}
            formatMonthYear={(locale, date) =>
              date
                .toLocaleDateString("es-ES", {
                  month: "long",
                  year: "numeric",
                })
                .replace(/^./, (str) => str.toUpperCase())
                .replace("de ", "")
            }
          />
        </div>

        <div className="titulo-y-eventos hidden sm:block md:pt-12 md:w-full">
          <p className="fecha-seleccionada text-2xl ">
            {date
              .toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })
              .replace(",", "")
              .replace(/^\w/, (c) => c.toUpperCase())}
          </p>
          <div className="listado-eventos pt-4 text-sm sm:w-full w-[595px]">
            <EventDetailCalendar events={eventsForSelectedDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
