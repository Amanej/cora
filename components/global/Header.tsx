'use client'

import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<header className="px-4 lg:px-6 h-14 flex items-center">
			<Link className="flex items-center justify-center" href="/">
				<img src="/Logo.svg" alt="Logo" className="h-4 m:h-6 w-auto" />
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				<div className={`md:flex gap-4 sm:gap-6 bg-black ${isMenuOpen ? 'flex flex-col absolute top-14 right-4 bg-white p-4 shadow-md animate-in fade-in slide-in-from-top-5 duration-300' : 'hidden'}`}>
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
						Features
					</Link>
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#use-cases">
						Use Cases
					</Link>
					<Link className="text-sm font-medium underline underline-offset-4" href="https://tally.so/r/31vx9Q" target="_blank">
						Request access
					</Link>
				</div>
				<button className="md:hidden" onClick={toggleMenu}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
					>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				</button>
			</nav>
		</header>
	)
}

export default Header