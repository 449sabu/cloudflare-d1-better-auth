import { useId } from 'react';
import { Form } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { createAuthServer } from '~/lib/auth.server';
import type { Route } from './+types/signup';

export default function SignupPage() {
	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();
	const confirmPasswordId = useId();

	return (
		<div>
			{/* <SignupForm /> */}
			<Form method="post">
				<p>Name</p>
				<Input name="name" type="text" id={nameId} />
				<p>Email</p>
				<Input name="email" type="email" id={emailId} />
				<p>Password</p>
				<Input name="password" type="password" id={passwordId} />
				<p>Confirm Password</p>
				<Input name="confirmPassword" type="password" id={confirmPasswordId} />
				<Button type="submit">Sign up</Button>
			</Form>
		</div>
	);
}

export async function action({ request, context }: Route.ActionArgs) {
	const formData = await request.formData();
	const name = formData.get('name');
	const email = formData.get('email');
	const password = formData.get('password');
	// const confirmPassword = formData.get('confirmPassword');

	const auth = createAuthServer(context.cloudflare.env);

	if (name && email && password) {
		try {
			const data = await auth.api.signUpEmail({
				body: {
					email: email as string,
					password: password as string,
					name: name as string,
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
