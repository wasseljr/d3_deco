import Link from 'next/link'

export default function CommunitySection() {
    return (
        <section className="py-8 md:py-12">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">
                        Built by the Community <br /> for the Community
                    </h2>
                    
                </div>
                <div className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-3">
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/2.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/3.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/4.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/5.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/6.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/7.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/8.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/9.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Méschac Irung" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="John Doe" src="https://randomuser.me/api/portraits/men/10.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
