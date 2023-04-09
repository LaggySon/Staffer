import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
	const wit = await prisma.organization.upsert({
		where: { name: 'Wentworth' },
		update: {},
		create: {
			id: 'wentworth',
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
								},
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								},
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								},
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								},
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
			}
		}
	});
	const wit2 = await prisma.organization.upsert({
		where: { name: 'Wentworth2' },
		update: {},
		create: {
			name: 'Wentworth2',
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
			}
		}
	});
	const wit3 = await prisma.organization.upsert({
		where: { name: 'SportsBall Org' },
		update: {},
		create: {
			id: 'sports',
			name: 'SportsBallOrg',
			logo: 'https://logotyp.us/files/nfl.svg?ver20230225',
			description: 'Woohoo Sports!',
			contactInfo: 'Boston',
			socials: {
				create: [
					{
						site: 'Twitter',
						handle: '@SportsBall'
					}
				]
			},
			events: {
				create: [
					{
						name: 'Red Sox',
						location: 'Fenway Park',
						positions: {
							create: [
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								},
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								},
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								},
								{
									title: 'Camera Operator',
									compensation: '$25/hr',
									filled: false
								},
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
