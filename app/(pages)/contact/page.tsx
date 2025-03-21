"use client"

import { BeamCard } from "@/components/ui/beam-card"
import { Mail } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
    return (
        <div className="flex gap-4 h-screen items-start pt-10">
            <div className="flex flex-col gap-4 items-center justify-center">
                <BeamCard>
                    <div className="flex flex-col gap-5 justify-center">
                        <h1 className="text-2xl font-bold">Get in Touch</h1>
                        <p className="text-sm text-gray-500">For any inquiries or to get in touch with us, please use the information below.</p>
                        <div className="flex gap-2 items-center">
                            <Mail className="w-4 h-4" /> <span>info@pukhtunkhwa.com</span>
                        </div>
                    </div>
                </BeamCard>
            </div>
            <div className="flex flex-col items-center justify-center">
                <BeamCard>
                    <div className="flex flex-col gap-5 justify-center">
                        <h1 className="text-2xl font-bold">Contact Us</h1>
                        <p className="text-sm text-gray-500">We'd love to hear from you. Please fill out the form below to get in touch with us.</p>
                        <ContactForm />
                    </div>
                </BeamCard>
            </div>
        </div>
    )
}
