
'use client'
import {HeroHeader} from '@/components/header'
import CallToAction from '@/components/call-to-action'
import FooterSection from '@/components/footer'

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
                
            <main>
                <CallToAction />
            </main>
            <footer>
                <FooterSection />
            </footer>
        </div>
    )
}
