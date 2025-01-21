import EventDetailList from "./EventDetailList";
import { useEvents } from "../../../Components/event-provider";
import { ResponsiveOutletModal } from "../../../Components/responsive-outlet-modal";

function EventListCoord() {
    
    const { events } = useEvents();
  
    const baseClasses =
    "select-none justify-center flex flex-col items-center p-2 rounded hover:ring-2  hover:ring-primary cursor-pointer transition-all duration-300 border w-[20rem] md:w-[13rem] shadow text-foreground";
    
    
   
    return (
      <div>
            <h2>Eventos</h2>
            {/* AGREGAR EVENTO */}
            <div className="">
                  <ResponsiveOutletModal
                    to={"create-event"}
                    trigger={
                      <div className={`${baseClasses} bg-background`}>
                        <h3 className="font-bold text-muted-foreground">Agregar anuncio</h3>
                      </div>
                    }
                    title={"Nuevo aununcio"}
                  />
            </div>
            <EventDetailList events={events}/>
    </div>
    );
  }
  
  export default EventListCoord;