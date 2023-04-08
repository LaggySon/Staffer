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
						site: 'Example',
						handle: '@example'
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
	}
};
