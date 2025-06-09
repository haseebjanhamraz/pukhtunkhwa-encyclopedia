import ContactPageComp from '@/app/custom-components/pages/ContactPageComp'
import { Metadata } from 'next'
import { contactMetadata } from '@/config/metadata/pages'

export const metadata: Metadata = contactMetadata

export default function ContactPage() {
    return (
        <ContactPageComp />
    )
}