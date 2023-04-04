import { PrismaClient } from '@prisma/client';
import type Actions from '@sveltejs/kit';
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

export const actions = {
	declare: async ({ request }) => {
		const data = await request.formData();
		const positionId = data.get('positionId');

		const userEmail = data.get('email');
		const user = await prisma.user.findUnique({
			where: {
				email: String(userEmail)
			}
		});
		const userId = user?.id;
		const addUser = await prisma.userOnPosition.upsert({
			where: {
				positionId_userId: {
					positionId: String(positionId),
					userId: String(userId)
				}
			},
			update: {},
			create: {
				position: {
					connect: {
						id: String(positionId)
					}
				},
				user: {
					connect: {
						id: String(userId)
					}
				}
			}
		});
	}
};
