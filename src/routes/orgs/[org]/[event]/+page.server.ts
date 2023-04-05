import { PrismaClient } from '@prisma/client';
import type Actions from '@sveltejs/kit';
const prisma = new PrismaClient();
import type { Position } from '@prisma/client';

export const load = async ({ params, parent }: any) => {
	const eventId = params.event;
	const { session } = await parent();
	const { isManager } = await parent();
	const userEmail = session.user.email;
	const user = await prisma.user.findUnique({
		where: {
			email: String(userEmail)
		}
	});
	const userId = user?.id;
	const dbEventData = await prisma.event.findUnique({
		where: {
			id: String(eventId)
		},
		include: {
			positions: { include: { filledBy: true } }
		}
	});
	const declaredPos = await prisma.userOnPosition.findMany({
		where: {
			userId: userId
		},
		select: {
			positionId: true
		}
	});
	const posIds = declaredPos.map((pos) => pos.positionId);
	let eventData = {};
	async function posFreelancers(id: string) {
		const freelancers = await prisma.userOnPosition.findMany({
			where: {
				positionId: id
			},
			select: {
				user: true
			}
		});
		return freelancers.map((freelancer) => {
			return freelancer.user;
		});
	}
	if (isManager) {
		eventData = {
			...dbEventData,
			positions: await Promise.all(
				dbEventData?.positions.map(async (pos: any) => {
					pos['declared'] = posIds.includes(pos.id);
					pos['freelancers'] = await posFreelancers(pos.id);
					return pos;
				})
			)
		};
	} else {
		eventData = {
			...dbEventData,
			positions: dbEventData?.positions.map((pos: any) => {
				pos['declared'] = posIds.includes(pos.id);
				return pos;
			})
		};
	}
	// console.log(eventData.positions[0].freelancers);
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
	},
	removeDec: async ({ request }) => {
		const data = await request.formData();
		const positionId = data.get('positionId');

		const userEmail = data.get('email');
		const user = await prisma.user.findUnique({
			where: {
				email: String(userEmail)
			}
		});
		const userId = user?.id;

		const removeUser = await prisma.userOnPosition.delete({
			where: {
				positionId_userId: {
					positionId: String(positionId),
					userId: String(userId)
				}
			}
		});
	},
	assign: async ({ request }) => {
		const data = await request.formData();
		const positionId = data.get('positionId');

		const userEmail = data.get('email');
		const user = await prisma.user.findUnique({
			where: {
				email: String(userEmail)
			}
		});
		const userId = user?.id;

		const assignUser = await prisma.position.update({
			where: {
				id: String(positionId)
			},
			data: {
				filledBy: {
					connect: {
						id: String(userId)
					}
				}
			}
		});
	},
	removeAssignment: async ({ request }) => {
		const data = await request.formData();
		const positionId = data.get('positionId');

		const assignUser = await prisma.position.update({
			where: {
				id: String(positionId)
			},
			data: {
				userId: null
			}
		});
	}
};
