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
		<div>
			<p className="text-center">{message}</p>
		</div>
	);
}
