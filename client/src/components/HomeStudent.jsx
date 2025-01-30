import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLoaderData } from "react-router-dom";
import IconCalendario from "../assets/Icon-calendario.svg";
import IconHorario from "../assets/Icon-horario.svg";
/* import { calendarService } from "../features/student/services/calendar.service" */
import { profileService } from "../features/profile/services/profile.service";
import { EventDetailList } from "../features/student/components/EventDetailList";
import { calendarService } from "../features/student/services/calendar.service";

export async function homeStudentLoader() {
  const [events, user] = await Promise.all([
    calendarService.getEvents(),
    profileService.getProfileInfo(),
  ]);

  return { events, user };
}

function HomeStudent() {
  const { events, user } = useLoaderData();

  return (
    <div className="flex-grow container mx-auto md:mx-0 px-4 sm:px-4 pt-4 md:pt-10 pb-8">
      <h1 className="text-3xl mb-3">
        {user.firstName ? `¡Hola, ${user.firstName}!` : "¡Hola!"}
      </h1>
      <h2 className="pt-4 text-2xl pb-4">Próximas evaluaciones</h2>
      <div className="contenedor-general grid grid-cols-1 sm:grid-cols-1 gap-10 md:grid-cols-[1.5fr,1fr] md:gap-24">
        {/* Novedades */}
        <EventDetailList events={events} cardClassName="md:w-[450px]" />

        {/* Calendario y horario */}
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-2 md:flex-col">
          {/* LINK A CALENDARIO */}
          <Link
            viewTransition
            prefetch="intent"
            className="hover:ring-2 hover:ring-primary rounded-xl transition-all duration-300"
            to={`/student/calendar`}
          >
            <Card className="bg-card w-full sm:w-[327px] md:w-[305px] pb-3 !rounded-md">
              <CardHeader className="flex !flex-row justify-start items-center gap-6">
                <img src={IconCalendario} alt="" className="w-8 h-8" />
                <CardTitle className="text-primary text-2xl">
                  Calendario
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>

          {/* LINK A HORARIO */}
          <Link
            viewTransition
            prefetch="intent"
            className="hover:ring-2 hover:ring-primary rounded-xl transition-all duration-300"
            to={`/student/schedule`}
          >
            <Card className="bg-card w-full sm:w-[327px] md:w-[305px] pb-3 !rounded-md">
              <CardHeader className="flex !flex-row justify-start items-center gap-6">
                <img src={IconHorario} alt="" className="w-8 h-8" />
                <CardTitle className="text-primary text-2xl">Horario</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeStudent;
