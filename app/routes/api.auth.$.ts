import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { createAuthServer } from '~/lib/auth.server'; // Adjust the path as necessary

export async function loader({ request, context }: LoaderFunctionArgs) {
	const auth = createAuthServer(context.env);
	return auth.handler(request);
}
export async function action({ request, context }: ActionFunctionArgs) {
	const auth = createAuthServer(context.env);
	return auth.handler(request);
}
