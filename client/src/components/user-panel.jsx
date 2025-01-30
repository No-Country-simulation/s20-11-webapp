import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Form, Link } from "react-router-dom";
import { Button } from "./ui/button";
export function UserPanel({ user }) {
  const fallback = user.email.charAt(0).toUpperCase();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-full cursor-pointer">
          <AvatarImage src={user.photo ?? "#"} alt={user.email} />
          <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={user.photo ?? "#"} alt={user.email} />
              <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.email}</span>
              <span className="truncate text-xs font-normal">{user.role}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ProfileButton />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileButton() {
  return (
    <Link viewTransition prefetch="intent" to="/profile">
      <DropdownMenuItem className="!p-0">
        <Button
          variant="ghost"
          className="w-full p-0 hover:no-underline  h-fit flex !justify-start"
        >
          <User />
          Mi perfil
        </Button>
      </DropdownMenuItem>
    </Link>
  );
}

function LogoutButton() {
  return (
    <Form action="/logout" method="POST">
      <DropdownMenuItem className="!p-0">
        <Button
          variant="ghost"
          className="w-full p-0 hover:no-underline  h-fit flex !justify-start"
        >
          <LogOut className=" h-4 w-4" />
          Cerrar sesión
        </Button>
      </DropdownMenuItem>
    </Form>
  );
}
