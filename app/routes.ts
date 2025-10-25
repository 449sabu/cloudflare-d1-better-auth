import { index, layout, type RouteConfig, route } from '@react-router/dev/routes';

export default [
	layout('routes/layout.tsx', [
		index('routes/home.tsx'),
		route('/signup', 'routes/signup.tsx'),
		route('/signin', 'routes/signin.tsx'),
		route('/dashboard', 'routes/dashboard.tsx'),
		route('/api/auth/*', 'routes/api-auth.tsx'),
		route('/split-route/*', 'routes/split-route.tsx'),
	]),
] satisfies RouteConfig;
