import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Event } from '@prisma/client';
const prisma = new PrismaClient();

export const load = async ({ params, parent }: any) => {
	const { session } = await parent();
	const userId = params.user;

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	return { user };
};
