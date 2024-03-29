import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Event } from '@prisma/client';
const prisma = new PrismaClient();

export const load = async ({ params, parent }: any) => {
	const { session } = await parent();
	const userId = params.user;

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	const events = await prisma.event.findMany({
		where: {
			positions: {
				some: {
					userId
				}
			}
		},
		include: {
			positions: true,
			Organization: true
		}
	});

	let fOrgs = await prisma.orgOnFreelancer.findMany({
		where: {
			userId
		},
		include: {
			organization: true
		}
	});

	const orgs = fOrgs.map((o) => o.organization);

	const socials = await prisma.social.findMany({
		where: {
			userId
		}
	});

	return { user, events, orgs, socials };
};
