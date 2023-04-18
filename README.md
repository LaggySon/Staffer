# Staffer

Staffer is an application that helps you manage and staff events that rely on a diverse, constantly changing pool of freelancers

## Technologies Used
- Sveltekit
- Tailwind
- Supabase (for [live version](https://staffer.laggi.sh))
- Prisma ORM

## Installation
1. Install [Docker](https://www.docker.com/)
2. Clone repo locally using `git clone https://github.com/laggyson/staffer`
3. `cd staffer` to change directory to the local repository
4. Rename `.env.example` to `.env` - This contains all of the environment variables required for the software to function
5. `docker-compose up -d` will start the local PostgreSQL database and run it in the background for you
6. Install the application's dependencies with `npm install`
7. Run `npx prisma migrate dev` and `npx prisma db seed` to seed and configure the new database to our application
8. Start the application locally using `npm run dev`

## Getting Started
- On the local version of the site, we have provided two sample premade organizations for you to join and test out as a freelancer. Their join codes are `wentworth` and `sports`.
- You can create a new organization by going to the `manager` page and clicking the button after signing in!

## License

Staffer is released under the [MIT License](LICENSE).

## Contact

If you have any questions, issues, or suggestions, please feel free to open an issue on the [GitHub repository](https://github.com/laggyson/staffer) or contact the author via email.
