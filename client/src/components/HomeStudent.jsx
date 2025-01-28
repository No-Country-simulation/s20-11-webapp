import {
  Card,
  CardHeader,
  CardTitle
} from "@/Components/ui/card";
import { Link, } from "react-router-dom";
import EventDetailList from "../features/student/components/EventDetailList";

function HomeStudent() {

  // const { events } = useEvents();
  /* const [date, setDate] = useState(new Date()); */

  console.log('events', events)

  return (
    <div className="flex-grow container mx-auto px-4 sm:px-8 pt-4 pb-8">
      <h1 className="text-2xl mb-3">
        ¡Hola, Romina!
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

        {/* <div className="grid grid-cols-2 gap-2 md:flex md:flex-col">
          <div className="calendario bg-blue-500 rounded-md p-4 h-[200px] md:h-[150px]">
            <p>Calendario</p>
          </div>
          <div className="horario bg-green-500 rounded-md p-4 h-[200px] md:h-[150px]">
            <p>Horario</p>
          </div>
        </div> */}
      </div>    
    </div>
  );
}

export default HomeStudent;
