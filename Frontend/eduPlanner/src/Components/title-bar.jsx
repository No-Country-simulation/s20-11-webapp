import { Button } from "@/Components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function TitleBar({ title }) {
  return (
    <div className="flex items-center gap-4  ">
    <Link to=".." relative="path" viewTransition prefetch="intent">
      <Button variant="outline" size="icon">
        <ArrowLeft />
      </Button>
    </Link>
    <div className="text-xl font-bold">
        {title}
      </div>
    </div>
  );
}
