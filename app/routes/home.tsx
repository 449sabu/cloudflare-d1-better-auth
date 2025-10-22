import { GalleryVerticalEnd } from 'lucide-react';
import { Link } from 'react-router';
import type { Route } from './+types/home';

export function meta() {
	return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { message } = loaderData;
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Link to="/signup" className="flex items-center gap-2 self-center font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Sign Up
				</Link>
				<p>{message}</p>
			</div>
		</div>
	);
}
