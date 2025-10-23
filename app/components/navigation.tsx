import { NavLink } from 'react-router';

export function Navigation() {
	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 flex justify-center gap-4 items-center px-4 py-2">
			{/* <div className="flex justify-around items-center py-2">
				<div className="text-sm font-medium text-gray-700">Navigation</div>
			</div> */}
			<NavLink
				to="/"
				className={({ isActive, isPending, isTransitioning }) =>
					[
						isPending ? 'pending' : '',
						isActive ? 'text-blue-500 font-bold' : '',
						isTransitioning ? 'transitioning' : '',
					].join('')
				}
			>
				Home
			</NavLink>
			<NavLink
				to="/dashboard"
				className={({ isActive, isPending, isTransitioning }) =>
					[
						isPending ? 'pending' : '',
						isActive ? 'text-blue-500 font-bold' : '',
						isTransitioning ? 'transitioning' : '',
					].join('')
				}
			>
				Dashboard
			</NavLink>
			<NavLink
				to="/signup"
				className={({ isActive, isPending, isTransitioning }) =>
					[
						isPending ? 'pending' : '',
						isActive ? 'text-blue-500 font-bold' : '',
						isTransitioning ? 'transitioning' : '',
					].join('')
				}
			>
				Sign Up
			</NavLink>
		</nav>
	);
}
