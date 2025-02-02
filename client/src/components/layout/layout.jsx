import { Outlet, useLoaderData } from "react-router";
import { ScrollRestoration } from "react-router-dom";
import { authService } from "../../features/auth/services/auth.service";
import { profileService } from "../../features/profile/services/profile.service";
import Header from "./Header";

export async function layoutLoader() {
  if (authService.isAuthenticated()) {
    const { data } = await profileService.getProfileInfo();

    console.log(`⚠ Layout loader was triggered. `);
    return {
      user: data,
    };
  }

  return { user: null };
}

export default function Layout() {
  const { user } = useLoaderData();

  return (
    <>
      <Header userData={user} />
      <main className="min-h-[calc(100dvh-75px)] bg-gradient-to-b from-background via-secondary/30 to-secondary/10">
        <div className="container px-4 mx-auto py-4 relative z-10">
          <Outlet />
        </div>
      </main>

      <ScrollRestoration />
    </>
  );
}
