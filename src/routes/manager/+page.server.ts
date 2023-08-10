import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const load = async ({ parent }: any) => {
	const { session } = await parent();
	if (session) {
		const orgs = await prisma.orgOnManager.findMany({
			where: {
				user: { email: session?.user?.email }
			}
		});

		const orgsList = await Promise.all(
			orgs.map(async (org) => {
				return await prisma.organization.findUnique({ where: { id: org.organizationId } });
			})
		);
		return {
			orgsList
		};
	} else {
		const orgsList: any = [];
		return { orgsList };
	}
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
		const name = data.get('name');
		const desc = data.get('description');

		const newOrg = await prisma.organization.create({
			data: {
				name,
				logo: '',
				description: desc,
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
