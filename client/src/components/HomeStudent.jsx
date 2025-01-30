import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import IconCalendario from "../assets/Icon-calendario.svg"
import IconHorario from "../assets/Icon-horario.svg"
import { Link, } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
/* import { calendarService } from "../features/student/services/calendar.service" */
import { EventDetailList } from "../features/student/components/EventDetailList"


//esto lo moví a la carpeta service, archivo eventLoader, junto con el llamado a profileService.getProfileInfo()
/* export async function eventLoader() {
  const events = await calendarService.getEvents();
  return { events };
} */



function HomeStudent() {

  const { events, user } = useLoaderData();
 
  

  return (
    <div className="flex-grow container mx-auto px-4 sm:px-8 pt-4 md:pt-10 pb-8">
      <h1 className="text-3xl mb-3">
          {user.firstName ? `¡Hola, ${user.firstName}!` : "¡Hola!"}
      </h1>
      <h2 className="pt-4 text-2xl pb-4">Próximas evaluaciones</h2>
      <div className="contenedor-general grid grid-cols-1 sm:grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:gap-48">
        {/* Novedades */}
        <EventDetailList events={events}/>
        

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
                    <CardTitle className="text-primary text-2xl">Calendario</CardTitle>              
                  </CardHeader>
                </Card>
              </Link>

              {/* LINK A HORARIO */}
              <Link
                  viewTransition
                  prefetch="intent"
                  className="hover:ring-2 hover:ring-primary rounded-xl transition-all duration-300"
                  to={`/student/calendar`}
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
