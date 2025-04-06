import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import "react-toastify/dist/ReactToastify.css"

export default function LogoutButton() {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      toast.success("You have successfully logged out of your account")
      router.push("/login")
    } catch {
      toast.error("An error occurred while logging out")
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>Logout</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to logout of your account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to be logged out of your account. This action cannot
              be undone. If you want to stay logged in, just click outside this
              modal or select cancel,
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}
