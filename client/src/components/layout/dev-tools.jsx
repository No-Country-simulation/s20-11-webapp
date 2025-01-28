import { Eye } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../features/auth/context/AuthContext";

export function CurrentUserInLocalStorage() {
  const [isOpen, setIsOpen] = useState(false);

  const auth = useAuth();
  return (
    <div className=" bg-foreground/80 text-background  rounded shadow absolute bottom-20 right-20 w-[25rem] overflow-y-auto z-50">
      {isOpen && <pre className="p-2">{JSON.stringify(auth, null, 2)}</pre>}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" cursor-pointer text-xs bg-primary p-1 text-center flex justify-center gap-2 items-center"
      >
        <span>Datos del usuario autenticado en LocalStorage </span>
        <Eye />
      </div>
    </div>
  );
}
