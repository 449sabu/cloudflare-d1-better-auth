import { LogOut, Trash2 } from 'lucide-react';
import { redirect, useNavigate } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from '~/components/ui/field';
import { authClient } from '~/lib/auth.client';
import type { Route } from './+types/settings';

export async function clientLoader() {
	const { data: session } = await authClient.getSession();
	console.log(session);
	if (!session) {
		throw redirect('/auth/signin');
	}
	return { session };
}

export default function SettingsPage({ loaderData }: Route.ComponentProps) {
	const { session } = loaderData;
	const navigate = useNavigate();

	async function handleSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate('/auth/signin'); // redirect to login page
				},
			},
		});
	}

	async function handleDeleteAccount() {
		await authClient.deleteUser({
			fetchOptions: {
				onSuccess: () => {
					navigate('/auth/signin'); // redirect to login page
				},
			},
		});
	}
	return (
		<div className="w-full max-w-4xl">
			<FieldSet>
				<FieldDescription>ユーザー情報に関する設定を行うことができます。</FieldDescription>
				<FieldLegend>Settings</FieldLegend>
				<FieldSeparator />
				<FieldGroup>
					<Field orientation="horizontal">
						<FieldContent>
							<FieldLabel>{session.user.name}</FieldLabel>
							<FieldDescription>{session.user.email}</FieldDescription>
						</FieldContent>
						<Avatar className="size-10 mx-4">
							<AvatarImage src={session.user.image ?? 'https://github.com/shadcn.png'} alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</Field>
					<Field orientation="horizontal">
						<FieldContent>
							<FieldLabel>ログアウト</FieldLabel>
							<FieldDescription>ログアウトできます。</FieldDescription>
						</FieldContent>
						<Button variant="outline" onClick={handleSignOut}>
							<LogOut className="mx-4" />
						</Button>
					</Field>
					<FieldSeparator />
					<Field orientation="horizontal">
						<FieldContent>
							<FieldLabel>アカウント削除</FieldLabel>
							<FieldDescription className="text-destructive">
								一度アカウントを削除すると復元できません。
							</FieldDescription>
						</FieldContent>
						<Button variant="destructive" onClick={handleDeleteAccount}>
							<Trash2 className="mx-4" />
						</Button>
					</Field>
				</FieldGroup>
			</FieldSet>
		</div>
	);
}
