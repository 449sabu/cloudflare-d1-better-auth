import { createContext } from 'react-router';

// import type { User } from '~/types';

type User = {
	id: string;
	name: string;
	email: string;
	image: string;
};

export const userContext = createContext<User | null>(null);
