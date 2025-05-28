import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/user");
  }
}