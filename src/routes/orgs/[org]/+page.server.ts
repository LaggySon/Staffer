import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Position } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const actions = {
	createEvent: async ({ request }: any) => {
		const data = await request.formData();
		const orgId = data.get('orgId');
		const name = data.get('name');
		const location = data.get('location');
		const startAt = data.get('startAt');
		// const endAt = data.get('endAt');

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
				name: name,
				location: location,
				startAt: dayjs.utc(startAt).toDate(),
				endAt: dayjs.utc(startAt).toDate(),

				Organization: {
					connect: {
						id: String(orgId)
					}
				}
			}
		});

		throw redirect(302, `/orgs/${String(orgId)}/${event.id}`);
	},
	leaveOrg: async ({ request }: any) => {
		const data = await request.formData();
		const orgId = data.get('orgId');
		const userEmail = data.get('userEmail');
		const user = await prisma.user.findUnique({
			where: {
				email: String(userEmail)
			}
		});
		const userId = user?.id;

		await prisma.orgOnFreelancer.delete({
			where: {
				organizationId_userId: {
					organizationId: orgId,
					userId: String(userId)
				}
			}
		});
	}
};
