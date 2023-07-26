import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const load = async ({ parent }: any) => {
	const { session } = await parent();
	const userEmail = session.user.email;
	const user = await prisma.user.findUnique({
		where: {
			email: userEmail
		}
	});
	const userId = user?.id;
	if (session) {
		const orgs = await prisma.orgOnFreelancer.findMany({
			where: {
				user: { email: session?.user?.email }
			}
		});

		const orgsList = await Promise.all(
			orgs.map(async (org) => {
				return await prisma.organization.findUnique({ where: { id: org.organizationId } });
			})
		);
		return {
			orgsList,
			userId
		};
	} else {
		const orgsList: any = [];
		return { orgsList, userId };
	}
};

export const actions = {
	join: async ({ request }: any) => {
		console.log('what');
		const data = await request.formData();
		const userEmail = data.get('userEmail');
		const orgId = data.get('orgCode') ?? '';

		const orgToAdd = await prisma.organization.findFirst({
			where: {
				id: String(orgId)
			}
		});

		const user = await prisma.user.findUnique({
			where: {
				email: String(userEmail)
			}
		});
		const userId = user?.id;

		if (orgToAdd) {
			const addUser = await prisma.orgOnFreelancer.upsert({
				where: {
					organizationId_userId: {
						organizationId: String(orgId),
						userId: String(userId)
					}
				},
				update: {},
				create: {
					organization: {
						connect: {
							id: String(orgId)
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
	}
};
