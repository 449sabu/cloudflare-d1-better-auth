import { Outlet, redirect } from 'react-router';
import { Navigation } from '~/components/navigation';
import { validateSessionToken } from '~/lib/cookie';
import type { Route } from './+types/layout';

async function authMiddleware({ request }: Route.LoaderArgs, next: Parameters<Route.MiddlewareFunction>[1]) {
	const sessionToken = validateSessionToken(request);

	if (!sessionToken?.token) {
		return redirect('/auth/signin');
	}

	const response = await next();
	console.log(response.status, '\u001b[32m' + request.method + '\u001b[0m', request.url);
	// レスポンスを返す（必須）
	return response;
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export default function UserLayout() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Outlet />
				<Navigation />
			</div>
		</div>
	);
}
