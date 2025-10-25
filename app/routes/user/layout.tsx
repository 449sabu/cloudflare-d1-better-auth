import { Outlet, redirect } from 'react-router';
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
		<div>
			<Outlet />
		</div>
	);
}
