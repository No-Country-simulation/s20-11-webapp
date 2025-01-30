import { Spacer } from "@/components/layout/spacer";
import { TitleBar } from "@/components/title-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight, Lock, Mail, Pencil, User } from "lucide-react";
import { Form, Outlet, useLoaderData } from "react-router-dom";
import { requireAuthenticated } from "../../auth/services/auth.service";
import { profileService } from "../services/profile.service";

export async function profileLoader() {
  await requireAuthenticated();

  const { data } = await profileService.getProfileInfo();

  return {
    user: data,
  };
}

export async function profileAction({ request }) {
  await requireAuthenticated();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return { error: "No file selected" };
  }

  // Validate file type and size if needed
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed" };
  }

  await profileService.uploadProfilePhoto(file);

  return null;
}

export default function Profile() {
  const { user } = useLoaderData();

  const parseFullName = (firstName, lastName) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return firstName || lastName || "Sin Definir";
  };

  const fallback = user.email.charAt(0).toUpperCase();

  return (
    <>
      <TitleBar title="Perfil" />
      <Spacer size="xs" />
      <main className="grid sm:grid-cols-2 gap-4">
        <section className="flex flex-col  items-center sm:items-start ">
          <div className="mx-12 w-fit relative">
            <Avatar className="!size-36  rounded-full cursor-pointer">
              <AvatarImage src={user.profilePhoto} alt={`Foto de perfil`} />
              <AvatarFallback className="!text-[64px] !font-normal ">
                {fallback}
              </AvatarFallback>
            </Avatar>
            <UploadProfilePhoto />
          </div>
          <Spacer size="xs" />

          <div className="flex flex-col gap-7 w-full">
            <ProfileCard
              Icon={User}
              label="Nombre"
              value={parseFullName(user.firstName, user.lastName)}
              canModify={true}
            />
            <ProfileCard Icon={Mail} label="Correo" value={user.email} />
            <ProfileCard
              Icon={Lock}
              label="Contraseña"
              value={"********"}
              canModify={true}
            />
          </div>
          <Outlet />
        </section>
      </main>
    </>
  );
}

function UploadProfilePhoto() {
  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="absolute bottom-0 right-0"
    >
      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        name="file"
        className="hidden"
        onChange={(e) => e.target.form.requestSubmit()}
      />
      <label
        htmlFor="avatar-upload"
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "ring-offset-background transition-colors focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          "h-10 w-10"
        )}
      >
        <Pencil className="h-4 w-4" />
      </label>
    </Form>
  );
}

function ProfileCard({ Icon, label, value, canModify = false }) {
  return (
    <Card
      className={cn(
        "p-1 px-6  !rounded-sm flex items-center justify-between w-full sm:min-w-[522px] md:max-w-[522px]",
        canModify &&
          "hover:ring-2 hover:ring-primary transition-all duration-300 cursor-pointer"
      )}
    >
      <CardHeader className="flex !flex-row items-center gap-4 !p-1">
        <Icon strokeWidth={2.5} className="text-primary" />
        <div className="flex flex-col gap-2">
          <CardTitle className="text-sm text-muted-foreground !font-normal">
            {label}
          </CardTitle>
          <CardDescription className="!text-foreground !text-xl">
            {value}
          </CardDescription>
        </div>
      </CardHeader>
      {canModify && <ChevronRight />}
    </Card>
  );
}
