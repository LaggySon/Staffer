import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
	const wit = await prisma.organization.upsert({
		where: { name: 'Wentworth' },
		update: {},
		create: {
			name: 'Wentworth',
			logo: 'https://www.ncaa.com/sites/default/files/images/logos/schools/bgd/wentworth.svg',
			description: 'Wentworth Institute of Technology',
			contactInfo: 'Huntington Ave',
			socials: {
				create: [
					{
						site: 'Twitter',
						handle: '@WIT'
					}
				]
			},
			events: {
				create: [
					{
						name: 'Semi Finals',
						location: 'Tansey Gym',
						positions: {
							create: [
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								}
							]
						},
						date: new Date()
					},
					{
						name: 'Grand Finals',
						location: 'Tansey Gym',
						positions: {
							create: [
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								}
							]
						},
						date: new Date()
					}
				]
			},
			freelancers: {
				create: {
					user: {
						connect: {
							email: '43mikejunk@gmail.com'
						}
					}
				}
			},
			managers: {
				create: {
					user: {
						connect: {
							email: '43mikejunk@gmail.com'
						}
					}
				}
			}
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})

	.catch(async (e) => {
		console.error(e);

		await prisma.$disconnect();

		process.exit(1);
	});
