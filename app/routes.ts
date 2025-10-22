import { index, layout, type RouteConfig, route } from '@react-router/dev/routes';

export default [
	layout('routes/layout.tsx', [
		index('routes/home.tsx'),
		route('/signup', 'routes/signup.tsx'),
		route('/dashboard', 'routes/dashboard.tsx'),
	]),
] satisfies RouteConfig;
