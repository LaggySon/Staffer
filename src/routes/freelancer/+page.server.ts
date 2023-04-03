import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const load = async ({ parent }) => {
	const { session } = await parent();
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
			orgsList
		};
	} else {
		const orgsList: any = [];
		return { orgsList };
	}

};

export const actions = {
	join: async ({ request }) => {
		const data = await request.formData();
		const userId = data.get('userId');
		const org = data.get('orgCode') ?? '';

		// const organization = await prisma.organization.update({
		// 	where: {
		// 		id: String(org)
		// 	},
		//     data: {
		//         freelancers:{
		//             push:{

		//             }
		//         }
		//     }
		// });

		// if (organization) {
		// }
	}
};
