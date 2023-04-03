import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const load = async ({ params, parent }: any) => {
	const { session } = await parent();
	const orgName = params.org;
	const events = await prisma.event.findMany({
		where: {
			Organization: {
				name: orgName
			}
		}
	});
	const org = await prisma.organization.findUnique({
		where: {
			name: orgName
		}
	});
	const validUsers = await prisma.organization.findUnique({
		where: {
			name: orgName
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
	if (!userList?.includes(session.user.email)) {
		throw redirect(302, '/');
	}
	return { events, org };
};
