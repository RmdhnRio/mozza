import Link from 'next/link'
export default function Footer() {
    const footerLinks = {
        mozza: [
            { name: 'Service', href: '#' },
            { name: 'Shop', href: '#' },
            { name: 'About', href: '#' },
            { name: 'Contact', href: '#' },
        ],
        cafe: [
            { name: 'Food', href: '#' },
            { name: 'Drink', href: '#' },
            { name: 'Snacks', href: '#' },
        ],
        followUs: [
            { name: 'Twitter', href: '#' },
            { name: 'Instagram', href: '#' },
            { name: 'Facebook', href: '#' },
            { name: 'Dribbble', href: '#' },
        ],
    }
    return (
        <footer className="bg-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-20 mb-20">
                    {/* === Logo Section === */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-2">
                        <Link href="/" className="inline-block">
                            <span className="font-plein font-bold text-3xl md:text-4xl uppercase tracking-wider bg-gradient-to-r from-brand-peach via-brand-pink to-brand-purple bg-clip-text text-transparent">
                                MOZZA
                            </span>
                        </Link>
                    </div>
                    {/* === Mozza Column === */}
                    <div className="col-span-1">
                        <h3 className="font-plein font-bold text-gray-400 text-lg mb-6">Mozza</h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.mozza.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-400 hover:text-brand-purple transition-colors duration-300 font-switzer">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* === Cafe Column === */}
                    <div className="col-span-1">
                        <h3 className="font-plein font-bold text-gray-400 text-lg mb-6">Cafe</h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.cafe.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-400 hover:text-brand-purple transition-colors duration-300 font-switzer">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* === Follow Us Column === */}
                    <div className="col-span-1">
                        <h3 className="font-plein font-bold text-gray-400 text-lg mb-6">Follow Us</h3>
                        <ul className="flex flex-col gap-4">
                            {footerLinks.followUs.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-400 hover:text-brand-purple transition-colors duration-300 font-switzer">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* === Copyright === */}
                <div className="flex flex-col md:flex-row justify-end items-center pt-8">
                    <p className="text-gray-400 font-switzer text-sm">
                        © 2025 Mozza. All rights reserved. Made with <span className="text-red-500">❤️</span> by Rio Ramadhan
                    </p>
                </div>
            </div>
        </footer>
    )
}