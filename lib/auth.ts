import { cookies } from "next/headers";

export async function getServerSession() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    const user = (await cookieStore).get("user")?.value;

    if (!token || !user) {
        return null;
    }

    return {
        token,
        user: JSON.parse(user),
    };
}