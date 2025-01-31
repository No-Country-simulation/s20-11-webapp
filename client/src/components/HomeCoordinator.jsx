import { Button } from "@/components/ui/button";

function HomeCoordinator() {
  return (
    <main className="container mx-auto px-4 py-8 relative z-10">
      <Button variant="default">Button</Button>
      <h2 className="p-4 text-right">Agregar curso</h2>
      <div className="para-centrar flex justify-center">
        <div className="contenedor-general flex flex-wrap gap-2 md:gap-8 w-[312px] mx-auto md:px-10 md:w-auto md:mx-0">
          <div className="1roA bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>1ro A</p>
          </div>
          <div className="1roB bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>1ro B</p>
          </div>
          <div className="1roC bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>1ro C</p>
          </div>
          <div className="2doA bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>2do A</p>
          </div>
          <div className="2doB bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>2do B</p>
          </div>
          <div className="2do C bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>2do C</p>
          </div>
          <div className="3roA bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>3ro A</p>
          </div>
          <div className="3roB bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>3ro B</p>
          </div>
          <div className="3roC bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>3ro C</p>
          </div>
          <div className="4to A bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>4to A</p>
          </div>
          <div className="4to B bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>4to B</p>
          </div>
          <div className="4to C bg-purple-700 p-4 w-[150px] rounded-md text-center">
            <p>4to C</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomeCoordinator;
