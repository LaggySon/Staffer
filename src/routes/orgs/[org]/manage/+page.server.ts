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
		const socials = JSON.parse(data.get('socials'));
		const orgId = data.get('orgId');

		console.log(socials);

		const currentSocials = await prisma.social.findMany({
			where: {
				organizationId: String(orgId)
			}
		});

		currentSocials.forEach(async (social) => {
			if (!socials.find((s: any) => s.id === social.id)) {
				await prisma.social.delete({
					where: {
						id: social.id
					}
				});
			}
		});

		//update socials
		socials.map(async (social: any) => {
			if (social.id === 'new') {
				console.log('creating');
				await prisma.social.create({
					data: {
						site: social.website,
						handle: social.handle,
						Organization: {
							connect: {
								id: String(orgId)
							}
						}
					}
				});
			} else {
				await prisma.social.update({
					where: {
						id: String(social.id)
					},
					data: {
						site: String(social.website),
						handle: String(social.handle)
					}
				});
			}
		});

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
