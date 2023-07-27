import { PrismaClient } from '@prisma/client';
import type Actions from '@sveltejs/kit';
const prisma = new PrismaClient();
import type { Position } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

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
	const dbEventData: any = await prisma.event.findUnique({
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
	removeAssignment: async ({ request }: any) => {
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
	},
	deleteEvent: async ({ request }: any) => {
		const data = await request.formData();
		const eventId = data.get('eventId');
		const orgId = await prisma.event.findUnique({
			where: {
				id: eventId
			},
			select: {
				organizationId: true
			}
		});

		const orgName = await prisma.organization.findUnique({
			where: {
				id: String(orgId?.organizationId)
			},
			select: {
				name: true
			}
		});
		const delEvent = await prisma.event.delete({
			where: {
				id: eventId
			}
		});

		throw redirect(302, `/orgs/${orgId?.organizationId}`);
	},
	updateEvent: async ({ request }: any) => {
		const data = await request.formData();

		const name = data.get('name');
		const location = data.get('location');
		const startAt = data.get('startAt');
		const endAt = data.get('endAt');
		const eventId = data.get('eventId');
		const positions = JSON.parse(data.get('positions'));
		const userEmail = data.get('userEmail');
		const description = data.get('description');

		const currentPositions = await prisma.position.findMany({
			where: {
				eventId: String(eventId)
			}
		});
		const user = await prisma.user.findUnique({
			where: {
				email: String(userEmail)
			}
		});
		const userId = user?.id;

		if (positions.length === 0) {
			currentPositions.forEach(async (p) => {
				await prisma.userOnPosition.deleteMany({
					where: {
						positionId: p.id
					}
				});
			});
			await prisma.position.deleteMany({
				where: {
					eventId: eventId
				}
			});
		}

		positions.forEach(async (position: any) => {
			let filledById = null;
			if (!position?.filledBy?.email) {
			} else {
				const filledByObj = await prisma.user.findUnique({
					where: {
						email: position.filledBy.email
					}
				});
				filledById = filledByObj?.id;
				console.log(filledById);
			}

			if (position.declared) {
				const addUser = await prisma.userOnPosition.upsert({
					where: {
						positionId_userId: {
							positionId: String(position.id),
							userId: String(userId)
						}
					},
					update: {},
					create: {
						position: {
							connect: {
								id: String(position.id)
							}
						},
						user: {
							connect: {
								id: String(userId)
							}
						}
					}
				});
			} else if (
				await prisma.userOnPosition.findUnique({
					where: {
						positionId_userId: {
							positionId: String(position.id),
							userId: String(userId)
						}
					}
				})
			) {
				console.log(`PosId: ${position.id}`);
				console.log(`userId: ${userId}`);
				const removeUser = await prisma.userOnPosition.delete({
					where: {
						positionId_userId: {
							positionId: String(position.id),
							userId: String(userId)
						}
					}
				});
			}

			if (position.id === 'new') {
				const createPos = await prisma.position.create({
					data: {
						title: position.title,
						compensation: position.compensation,
						eventId: eventId,
						userId: filledById,
						filled: position.filled
					}
				});
			} else {
				const updatePos = await prisma.position.update({
					where: {
						id: position.id
					},
					data: {
						title: position.title,
						compensation: position.compensation,
						eventId: eventId,
						userId: filledById,
						filled: position.filled
					}
				});
			}

			currentPositions.forEach(async (position) => {
				if (!positions.find((p: any) => p.id === position.id)) {
					console.log(`Deleting ${position.id}`);
					await prisma.userOnPosition.deleteMany({
						where: {
							positionId: position.id
						}
					});
					await prisma.position.delete({
						where: {
							id: position.id
						}
					});
				}
			});
		});

		const updateOrg = await prisma.event.update({
			where: {
				id: String(eventId)
			},
			data: {
				name,
				location,
				startAt: dayjs.utc(startAt).toDate(),
				endAt: dayjs.utc(endAt).toDate(),
				description
			}
		});
	},
	createPosition: async ({ request }: any) => {
		const data = await request.formData();
		const eventId = data.get('eventId');

		const newPos = await prisma.position.create({
			data: {
				title: '',
				compensation: '',
				filled: false,
				Event: {
					connect: {
						id: String(eventId)
					}
				}
			}
		});
	},
	deletePosition: async ({ request }: any) => {
		const data = await request.formData();
		const posId = data.get('posId');

		const delPos = await prisma.position.delete({
			where: {
				id: posId
			}
		});
	},
	updatePosition: async ({ request }: any) => {
		const data = await request.formData();
		const title = data.get('newTitle');
		const compensation = data.get('newCompensation');
		const posId = data.get('posId');

		const updatePos = await prisma.position.update({
			where: {
				id: posId
			},
			data: {
				title,
				compensation
			}
		});
	}
};
