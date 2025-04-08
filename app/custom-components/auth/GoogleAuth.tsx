import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"

export default function GoogleAuth() {
  const client_id = process.env.GOOGLE_CLIENT_ID
  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id={client_id}
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3000/login"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>

      <script src="https://accounts.google.com/gsi/client" async></script>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </div>
  )
}
