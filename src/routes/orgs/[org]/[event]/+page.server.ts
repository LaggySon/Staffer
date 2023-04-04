import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const load = async ({ params, parent }: any) => {
	const eventId = params.event;
	const { session } = await parent();
	const eventData = await prisma.event.findUnique({
		where: {
			id: String(eventId)
		},
		include: {
			positions: { include: { filledBy: true } }
		}
	});
	console.log(eventData);
	return { eventData };
};
