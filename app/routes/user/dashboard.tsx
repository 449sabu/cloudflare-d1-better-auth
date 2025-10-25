import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { useId } from 'react';
import { Form } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { pointTable } from '../../../schema/point';
import type { Route } from './+types/dashboard';

export async function loader({ context }: Route.LoaderArgs) {
	const db = drizzle(context.cloudflare.env.sample_db);
	const points = await db.select().from(pointTable);

	return {
		points,
	};
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
	const { points } = loaderData;
	const nameId = useId();
	const deleteNameId = useId();

	return (
		<div>
			<h1 className="text-center">Dashboard</h1>
			<Form method="post">
				<Input id={nameId} name="name" />
				<Button type="submit">作成</Button>
			</Form>
			<ul>
				{points.map((point) => (
					<li key={point.id}>{point.name}</li>
				))}
			</ul>
			<Form method="post">
				<Input id={deleteNameId} name="deleteName" />
				<Button type="submit">削除</Button>
			</Form>
		</div>
	);
}

export async function action({ request, context }: Route.ActionArgs) {
	const db = drizzle(context.cloudflare.env.sample_db);
	const formData = await request.formData();

	const name = formData.get('name');
	const deleteName = formData.get('deleteName');

	if (name) {
		await db.insert(pointTable).values({ name: name as string });
	}
	if (deleteName) {
		await db.delete(pointTable).where(eq(pointTable.name, deleteName as string));
	}
	return { name, deleteName };
}
