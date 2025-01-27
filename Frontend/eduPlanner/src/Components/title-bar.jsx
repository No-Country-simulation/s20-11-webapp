import { Button } from "@/Components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function TitleBar({ title }) {
  return (
    <div className="mx-auto sm:mx-0 flex w-full justify-center gap-4 items-center flex-wrap  bg-muted/50 rounded shadow-sm border p-1 sm:w-fit sm:pr-6">
      <Link to=".." relative="path" viewTransition prefetch="intent">
        <Button variant="outline" size="icon" className="">
          <ArrowLeft />
        </Button>
      </Link>
      <div className="text-lg sm:text-xl  text-nowrap ">
        {title}
      </div>
    </div>
  );
}
