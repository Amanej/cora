import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, MessageSquare, DollarSign } from "lucide-react"
import Link from "next/link"
import { IUser } from "../state/AuthContext";

export default function AccountPage({user}: {user: IUser}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Account Overview</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{user.email}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Max Currency</CardTitle>
            <CardDescription>Your current max number of calls simultaneously</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold flex items-center">
              {user.max_calls}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 space-y-4">
        <Link href={"https://cal.com/aman-mender-z5tysk/30min"} target="_blank" passHref>
          <Button className="w-full sm:w-auto" variant="default">
            <ArrowUpRight className="mr-2 h-4 w-4" /> Upgrade Account
          </Button>
        </Link>
        <Link href={"https://cal.com/aman-mender-z5tysk/30min"} target="_blank" passHref>
          <Button className="w-full sm:w-auto bg-white text-black ml-4" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" /> Talk to Sales
          </Button>
        </Link>
        <Link href="mailto:support@corafone.com" passHref>
          <Button className="w-full sm:w-auto bg-white text-black ml-4" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" /> Get help
          </Button>
        </Link>
      </div>
    </div>
  )
}

