import { useId } from 'react';
import { Form, redirect } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { authClient } from '~/lib/auth.client';
import { createAuthServer } from '~/lib/auth.server';
import type { Route } from './+types/signin';

export default function SigninPage() {
	const emailId = useId();
	const passwordId = useId();

	async function handleSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					redirect('/'); // redirect to login page
				},
			},
		});
	}

	async function handleUseSession() {
		const { data: session } = await authClient.getSession();
		console.log(session);
	}

	async function handleGithub() {
		const data = await authClient.signIn.social({
			provider: 'github',
		});
	}

	async function handleGoogle() {
		const data = await authClient.signIn.social({
			provider: 'google',
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<Form method="post" className="flex flex-col gap-2">
				<p>Email</p>
				<Input name="email" type="email" id={emailId} />
				<p>Password</p>
				<Input name="password" type="password" id={passwordId} />
				<Button type="submit">Sign in</Button>
			</Form>
			<Button onClick={handleSignOut}>Sign Out</Button>
			<Button onClick={handleUseSession}>use Session</Button>
			<Button onClick={handleGithub}>Github</Button>
			<Button onClick={handleGoogle}>Google</Button>
		</div>
	);
}

export async function action({ request, context }: Route.ActionArgs) {
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');

	const auth = createAuthServer(context.cloudflare.env);

	if (email && password) {
		try {
			const data = await auth.api.signInEmail({
				body: {
					email: email as string,
					password: password as string,
					rememberMe: true,
					callbackURL: `${context.cloudflare.env.BETTER_AUTH_URL}/dashboard`,
				},
			});
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}
}
