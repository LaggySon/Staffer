import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const load = async () => {
	const users = await prisma.user.findMany();
	console.log(users);
	return {
		users
	};
};
