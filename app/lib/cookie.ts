export function parseCookies(cookieHeader: string): Record<string, string> {
	return cookieHeader.split(';').reduce(
		(cookies, cookie) => {
			const [name, value] = cookie.trim().split('=');
			cookies[name] = value;
			return cookies;
		},
		{} as Record<string, string>,
	);
}

export function validateSessionToken(request: Request) {
	const cookieHeader = request.headers.get('Cookie');

	if (!cookieHeader) return null;
	const cookies = parseCookies(cookieHeader);
	const sessionToken = cookies['better-auth.session_token'];

	if (!sessionToken) return null;
	const [token, signature] = sessionToken.split('.');

	return {
		token,
		signature,
	};
}
