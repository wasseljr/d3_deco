'use client'
import {HeroHeader} from '@/components/header'
import Faq from '@/components/faqs-2'
import FooterSection from '@/components/footer'

export default function FaqsPage() {
    return (
        <div className="min-h-screen flex flex-col ">
            
            <div className='mt -48'>
                <Faq />
            </div>
            
            <FooterSection />
            </div>
    )
}
