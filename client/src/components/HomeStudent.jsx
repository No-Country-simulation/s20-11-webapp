import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
    <div className="flex-grow container mx-auto px-4 sm:px-8 pt-4 pb-8">
      <h1 className="text-2xl mb-3">
          {user.firstName ? `¡Hola, ${user.firstName}!` : "¡Hola!"}
      </h1>
      <h2 className="pt-4 text-lg">Próximas evaluaciones</h2>
      <div className="contenedor-general grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
        {/* Novedades */}
        <EventDetailList events={events}/>
        

        {/* Calendario y horario */}
        {/* LINK A CALENDARIO */}
        <Link
            viewTransition
            prefetch="intent"
            className="hover:ring-2 hover:ring-primary rounded-xl transition-all duration-300"
            to={`/student/calendar`}
          >
          <Card className="">
            <CardHeader>
              <CardTitle>Calendario</CardTitle>              
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
          <Card className="">
            <CardHeader>
              <CardTitle>Horario</CardTitle>              
            </CardHeader>
          </Card>
        </Link>
        
      </div>    
    </div>
  );
}

export default HomeStudent;
