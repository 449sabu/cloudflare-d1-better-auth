import { GalleryVerticalEnd } from 'lucide-react';
import { Link } from 'react-router';

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<Link to="/" className="flex items-center gap-2 self-center font-medium">
				<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
					<GalleryVerticalEnd className="size-4" />
				</div>
				Back Home
			</Link>
		</div>
	);
}
