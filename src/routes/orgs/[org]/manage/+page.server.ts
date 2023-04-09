import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { Event } from '@prisma/client';
const prisma = new PrismaClient();

export const load = async ({ params, parent }: any) => {
	const { session } = await parent();
	const { isManager } = await parent();
	if (!isManager) {
		throw redirect(302, '/');
	}
};

export const actions = {
	update: async ({ params, request }: any) => {
		const data = await request.formData();

		const name = data.get('name');
		const logo = data.get('logo');
		const description = data.get('description');
		const contactInfo = data.get('contactInfo');
		const socials = data.get('socials');
		const orgId = data.get('orgId');

		const updateOrg = await prisma.organization.update({
			where: {
				id: String(orgId)
			},
			data: {
				name,
				logo,
				description,
				contactInfo
			}
		});
	},
	createSocial: async ({ request }: any) => {
		const data = await request.formData();
		const orgId = data.get('orgId');

		const updateOrg = await prisma.organization.update({
			where: {
				id: String(orgId)
			},
			data: {
				socials: {
					create: {
						site: '',
						handle: ''
					}
				}
			}
		});
	},
	deleteSocial: async ({ request }: any) => {
		const data = await request.formData();
		const orgId = data.get('orgId');
		const socialId = data.get('socialId');

		const delSoc = await prisma.social.delete({
			where: {
				id: socialId
			}
		});
	},
	updateSocial: async ({ request }: any) => {
		const data = await request.formData();

		const site = data.get('site');
		const handle = data.get('handle');
		const socialId = data.get('socialId');

		const updateSocial = await prisma.social.update({
			where: {
				id: String(socialId)
			},
			data: {
				site,
				handle
			}
		});
	},
	deleteOrg: async ({ request }: any) => {
		const data = await request.formData();
		const orgId = data.get('orgId');

		const delFreelancers = await prisma.orgOnFreelancer.deleteMany({
			where: {
				organizationId: String(orgId)
			}
		});

		const delManagers = await prisma.orgOnManager.deleteMany({
			where: {
				organizationId: String(orgId)
			}
		});

		const delOrg = await prisma.organization.delete({
			where: {
				id: String(orgId)
			}
		});

		throw redirect(302, '/');
	}
};
