import { GalleryVerticalEnd } from 'lucide-react';
import { useId } from 'react';
import { Form, redirect } from 'react-router';
import { LoginForm } from '~/components/login-form';
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

	async function handleRevokeSession() {
		const { data: session } = await authClient.getSession();

		if (!session) {
			console.error('No session token found');
			return;
		}

		await authClient.revokeSession({
			// token: session?.session.token,
			token: 'zkbAZV3GeObl4F8MTff4wB2ztZiKnGyZ',
		});
	}

	async function handleRevokeAllSessions() {
		await authClient.revokeSessions();
	}

	async function handleUseSession() {
		const { data: session } = await authClient.getSession();
		console.log(session);
	}

	async function handleClientSignIn() {
		const { data, error } = await authClient.signIn.email({
			email: '449sabu@gmail.com', // required
			password: 'Ogawa4869', // required
			rememberMe: true,
			callbackURL: 'http://localhost:5173/user/dashboard',
		});
		console.log(data, error);
	}

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="bg-muted relative hidden lg:block">
				<img
					src="/placeholder.svg"
					alt="logo"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
		// <div className="flex flex-col gap-4">
		// 	<Form method="post" className="flex flex-col gap-2">
		// 		<p>Email</p>
		// 		<Input name="email" type="email" id={emailId} />
		// 		<p>Password</p>
		// 		<Input name="password" type="password" id={passwordId} />
		// 		<Button type="submit">Sign in</Button>
		// 	</Form>
		// 	<Button onClick={handleClientSignIn}>Client Sign In</Button>
		// 	<Button onClick={handleSignOut}>Sign Out</Button>
		// 	<Button onClick={handleUseSession}>use Session</Button>
		// 	<Button onClick={handleRevokeSession}>Revoke Session</Button>
		// 	<Button onClick={handleRevokeAllSessions}>Revoke All Sessions</Button>
		// 	<Button onClick={handleGithub}>Github</Button>
		// 	<Button onClick={handleGoogle}>Google</Button>
		// </div>
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
