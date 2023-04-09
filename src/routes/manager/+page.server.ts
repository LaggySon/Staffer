import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const load = async () => {
	const users = await prisma.user.findMany();

	return {
		users
	};
};

export const actions = {
	changeRole: async ({ request }: any) => {
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
	},
	createOrg: async ({ request }: any) => {
		const data = await request.formData();
		const userEmail = data.get('userEmail');

		const newOrg = await prisma.organization.create({
			data: {
				name: '',
				logo: '',
				description: '',
				contactInfo: ''
			}
		});

		const addManager = await prisma.orgOnManager.create({
			data: {
				organization: {
					connect: {
						id: newOrg.id
					}
				},
				user: {
					connect: {
						email: userEmail
					}
				}
			}
		});

		const addFreelancer = await prisma.orgOnFreelancer.create({
			data: {
				organization: {
					connect: {
						id: newOrg.id
					}
				},
				user: {
					connect: {
						email: userEmail
					}
				}
			}
		});

		throw redirect(302, `/orgs/${newOrg.id}/manage`);
	}
};
