import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
