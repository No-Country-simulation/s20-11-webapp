import { useLoaderData, useParams } from "react-router-dom";
import { requireStudent } from "../../auth/services/auth.service";
import { courseService } from "../../courses/services/course.service";
import { notificationsService } from "../../courses/services/notifications.service";
import EventDetailCalendar from "./EventDetailCalendar";

export async function dayDetailLoader() {
  await requireStudent();

  const currentStudentCourse = await courseService.getCurrentStudentCourse();

  const courseId = currentStudentCourse.data.id;

  const events = await notificationsService.getCourseEvents(courseId);

  console.log(JSON.stringify(events, null, 2)); //scheduledFor

  return { events: events.data };
}

function DayDetail() {
  const { date } = useParams();
  const { events } = useLoaderData();


  console.log(`From back: ${events[0].scheduledFor.split("T")[0]}`)
  console.log(`Desde Prams: ${date}`)

  const eventsForSelectedDate = events.filter(
    (event) =>
      event.scheduledFor.split("T")[0] === date
  );

  // Convertir la fecha de la URL a un objeto Date
  const selectedDate = new Date(date);

  return (
    <div className="p-4">
      <p className="fecha-seleccionada text-xl">
        {selectedDate
          .toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
          .replace(",", "")
          .replace(/^\w/, (c) => c.toUpperCase())}
      </p>
      <EventDetailCalendar events={eventsForSelectedDate} />
    </div>
  );
}

export default DayDetail;
