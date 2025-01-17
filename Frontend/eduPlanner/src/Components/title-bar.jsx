import { Button } from "@/Components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function TitleBar({ title }) {
  return (
    <div className="mx-auto sm:mx-0 flex flex-col  sm:flex-row items-center gap-4  bg-secondary rounded shadow-sm border p-1 w-fit sm:pr-6">
      <Link to=".." relative="path" viewTransition prefetch="intent">
        <Button variant="outline" size="icon" className="">
          <ArrowLeft />
        </Button>
      </Link>
      <div className="text-lg sm:text-xl sm:font-bold text-nowrap ">{title}</div>
    </div>
  );
}
