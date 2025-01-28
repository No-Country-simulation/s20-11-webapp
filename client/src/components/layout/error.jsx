import { Link, useRouteError } from "react-router-dom";
import { Spacer } from "../layout/spacer";
import { Button } from "../ui/button";
export function Error() {
  let error = useRouteError();

  console.error(error);

  return (
    <div className=" h-dvh grid place-items-center">
      <div className="border p-9 rounded-xl shadow ">
        <div>
          <h1 className="text-5xl font-bold justify-center flex items-center gap-2">
            Error{" "}
            <pre className="text-destructive text-7xl">{error.status}</pre>
          </h1>
          <p className="text-muted-foreground text-center">
            {error.statusText}
          </p>
        </div>
        <Spacer size="3xs" />
        <Link viewTransition to={-1} relative="path">
          <Button className="w-full" size={"lg"}>
            Volver a un lugar seguro
          </Button>
        </Link>
      </div>
    </div>
  );
}
