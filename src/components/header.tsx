'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'What we do', href: 'Ourwork' }, // Matches <section id="Ourwork"> in Content1.tsx
    { name: 'Customer feedback', href: 'feedback'  }, // Matches <section id="feedback"> in FooterSection.tsx
    { name: 'Q&A', href: '/faq',  }, // Matches <section id="faqs2"> in Faq.tsx
    { name: 'Contact us', href: '/contact',  }, // Matches <section id="contact_us"> in CallToAction.tsx
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    type SectionId = 'contact_us' | 'Ourwork' | 'faqs2' | 'feedback'
    const scrollToSection = (sectionId: SectionId) => {
        console.log('Attempting to scroll to:', sectionId) // Debug log
        const element = document.getElementById(sectionId)
        if (element) {
            console.log('Found element:', element) // Debug log
            element.scrollIntoView({ behavior: 'smooth' })
            setMenuState(false)
        } else {
            console.log('Element not found for ID:', sectionId) // Debug log
            const fallbackPositions: Record<SectionId, number> = {
                contact_us: 0.8 * document.body.scrollHeight, // CallToAction
                Ourwork: 0.2 * document.body.scrollHeight, // Content1
                faqs2: 0.5 * document.body.scrollHeight, // Faq
                feedback: 0.9 * document.body.scrollHeight, // FooterSection
            }
            const position = fallbackPositions[sectionId]
            if (position) {
                window.scrollTo({
                    top: position,
                    behavior: 'smooth',
                })
                setMenuState(false)
            }
        }
    }

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full top-0 left-0 px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={`#${item.href}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                scrollToSection(item.href as SectionId)
                                            }}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={`#${item.href}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    scrollToSection(item.href as SectionId)
                                                }}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link href="#">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link href="#">
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link href="/form">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}