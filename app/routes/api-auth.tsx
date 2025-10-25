import { createAuthServer } from '~/lib/auth.server';
import type { Route } from './+types/api-auth';

export async function loader({ request, context }: Route.LoaderArgs) {
	const auth = createAuthServer(context.cloudflare.env);
	// console.log("✅ Running Loader")
	return auth.handler(request);
}

export async function action({ request, context }: Route.ActionArgs) {
	const auth = createAuthServer(context.cloudflare.env);
	// console.log("✅ Running Action")
	return auth.handler(request);
}
