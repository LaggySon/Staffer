import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const load = async ({ params }: any) => {

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
	return { events, org };
};
