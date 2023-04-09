import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Event } from '@prisma/client';
const prisma = new PrismaClient();

export const load = async ({ params, parent }: any) => {
	const { session } = await parent();
	const orgId = params.org;
	let isManager = false;
	const events = await prisma.event.findMany({
		where: {
			Organization: {
				id: orgId
			}
		}
	});

	const org = await prisma.organization.findUnique({
		where: {
			id: orgId
		},
		include: {
			socials: true
		}
	});
	const validUsers = await prisma.organization.findUnique({
		where: {
			id: orgId
		},
		select: {
			freelancers: {
				select: { user: true }
			}
		}
	});
	const userList = validUsers?.freelancers.map((user: any) => {
		return user.user.email;
	});
	const managers = await prisma.organization.findUnique({
		where: {
			id: orgId
		},
		select: {
			managers: {
				select: { user: true }
			}
		}
	});
	const managerList = managers?.managers.map((manager: any) => {
		return manager.user.email;
	});
	if (!userList?.includes(session.user.email)) {
		throw redirect(302, '/');
	}
	if (managerList?.includes(session.user.email)) {
		isManager = true;
	}
	return { events, org, isManager };
};
