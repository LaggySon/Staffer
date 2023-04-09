import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Position } from '@prisma/client';
const prisma = new PrismaClient();

export const actions = {
	createEvent: async ({ request }) => {
		const data = await request.formData();
		const orgId = data.get('orgId');

		const org = await prisma.organization.findUnique({
			where: {
				id: String(orgId)
			},
			select: {
				name: true
			}
		});

		const event = await prisma.event.create({
			data: {
				name: '',
				location: '',
				date: new Date(),
				Organization: {
					connect: {
						id: String(orgId)
					}
				}
			}
		});

		console.log(org);

		throw redirect(302, `/orgs/${String(orgId)}/${event.id}`);
	}
};
