import Compu from "@/assets/Compu.png";

const features = [
  "Visualiza tu horario semanal de clases de forma clara y concisa.",
  "Mantente al tanto de tus responsabilidades académicas.",
  "Planifica tus actividades y asegúrate de no perderte ninguna clase.",
];

export function ScheduleSection() {
  return (
    <div className="z-10 container mx-auto flex flex-col">
      <h2 className="text-3xl md:text-4xl lg:text-4xl text-center lg:text-start font-semibold text-primary px-4 pt-10 pb-8 md:pt-20 lg:pt-24 lg:pb-12">
        Horario semanal: Siempre a tiempo
      </h2>
      <div className="bg-muted dark:bg-muted/20 mx-0 lg:mx-20 flex flex-col lg:flex-row gap-10 lg:gap-[100px] items-center lg:pr-[30px] pb-8 lg:pb-0" >
      
        <img src={Compu} alt="" className="w-[383px] h-[408px]" />
        <div className="p-8 lg:p-0 flex flex-col gap-8 lg:gap-[50px]">
          {features.map((feature, index) => (
            <FeatureLine key={index} index={index + 1} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureLine({ index, feature }) {
  return (
    <div className="flex flex-row gap-5 items-center">
      <div className="w-[45px] h-[45px] bg-gradient-to-br from-tertiary to-primary rounded-sm lg:rounded-lg flex flex-row justify-center items-center p-4">
        <p className="text-white text-lg overflow-hidden text-ellipsis">{index}</p>
      </div>
      <p className="text-xl lg:text-2xl">{feature}</p>
    </div>
  );
}
