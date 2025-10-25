import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import { account, session, user, verification } from '../../schema/auth-schema';

// Cloudflare Workerの環境用
export function createAuthServer(env: Env): ReturnType<typeof betterAuth> {
	const db = drizzle(env.sample_db);

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: 'sqlite',
			schema: { user, session, account, verification },
		}),
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		emailAndPassword: {
			enabled: true,
			// requireEmailVerification: true,
		},
		socialProviders: {
			github: {
				clientId: env.OAUTH_GITHUB_CLIENT_ID,
				clientSecret: env.OAUTH_GITHUB_CLIENT_SECRET,
			},
			google: {
				clientId: env.OAUTH_GOOGLE_CLIENT_ID,
				clientSecret: env.OAUTH_GOOGLE_CLIENT_SECRET,
			},
		},
		user: {
			// https://www.better-auth.com/docs/concepts/users-accounts#change-email
			changeEmail: {
				enabled: true,
			},
			deleteUser: {
				enabled: true,
			},
		},
	});
}
