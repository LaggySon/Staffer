import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const load = async () => {
	const users = await prisma.user.findMany();

	return {
		users
	};
};

export const actions = {
	changeRole: async ({ request }) => {
		const data = await request.formData();

		const userId = String(data.get('userId'));

		const newRole = String(data.get('role'));

		await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				role: newRole
			}
		});

		const users = await prisma.user.findMany();
		console.log(users);
	}
};
