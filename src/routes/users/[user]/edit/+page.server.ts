import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { Event } from '@prisma/client';
const prisma = new PrismaClient();

export const actions = {
	update: async ({ params, request, parent }: any) => {
		const data = await request.formData();

		const userId = data.get('userId');
		console.log(userId);

		const user = await prisma.user.update({
			where: {
				id: String(userId)
			},
			data: {
				name: data.get('name'),
				biography: data.get('bio'),
				contactInfo: data.get('contactInfo')
			}
		});

		const socials = JSON.parse(data.get('socials'));

		console.log(socials);

		const currentSocials = await prisma.social.findMany({
			where: {
				userId: String(userId)
			}
		});

		currentSocials.forEach(async (social) => {
			if (!socials.find((s: any) => s.id === social.id)) {
				await prisma.social.delete({
					where: {
						id: social.id
					}
				});
			}
		});

		//update socials
		socials.map(async (social: any) => {
			if (social.id === 'new') {
				console.log('creating');
				await prisma.social.create({
					data: {
						site: social.website,
						handle: social.handle,
						User: {
							connect: {
								id: String(userId)
							}
						}
					}
				});
			} else {
				await prisma.social.update({
					where: {
						id: String(social.id)
					},
					data: {
						site: String(social.website),
						handle: String(social.handle)
					}
				});
			}
		});
		throw redirect(303, `/users/${userId}`);
	}
};
