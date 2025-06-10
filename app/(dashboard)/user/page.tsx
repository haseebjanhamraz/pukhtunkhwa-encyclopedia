import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"

export default async function UserPage() {
    const session = await getServerSession(authOptions)
    return <div>UserPage {session?.user?.email}</div>
}
