import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import { DISCORD_ID, DISCORD_SECRET, SVELTEAUTH_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [Discord({ clientId: DISCORD_ID, secret: DISCORD_SECRET })],
	secret: SVELTEAUTH_SECRET
});
