import { useLoaderData, useParams } from "react-router-dom";
import { Spacer } from "../../../components/layout/spacer";
import { TitleBar } from "../../../components/title-bar";
import { requireStudent } from "../../auth/services/auth.service";
import { courseService } from "../../courses/services/course.service";
import { notificationsService } from "../../courses/services/notifications.service";
import EventDetailCalendar from "./EventDetailCalendar";

export async function dayDetailLoader() {
  await requireStudent();

  const currentStudentCourse = await courseService.getCurrentStudentCourse();

  const courseId = currentStudentCourse.data.id;

  const events = await notificationsService.getCourseEvents(courseId);

  return { events: events.data };
}

function DayDetail() {
  const { date } = useParams();
  const { events } = useLoaderData();

  const eventsForSelectedDate = events.filter(
    (event) => event.scheduledFor.split("T")[0] === date
  );

  // Convertir la fecha de la URL a un objeto Date
  const selectedDate = new Date(date)
    .toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    .replace(",", "")
    .replace(/^\w/, (c) => c.toUpperCase());


  return (
    <>
        <TitleBar title={selectedDate}/>
        <Spacer size="3xs"/>
        <EventDetailCalendar events={eventsForSelectedDate} />
    </>
    
  );
}

export default DayDetail;
