import {prisma} from "@/lib/data/db/prisma";
import NextAuth, {AuthOptions, Session} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {AdapterUser} from "next-auth/adapters";


export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			authorization: {
				params: {scope: 'identify email guilds guilds.members.read'}
			},
		}),
	],
	callbacks: {
		session: async ({session, user}: { session: Session, user: AdapterUser }) => {
			const account = await prisma.account.findFirst({
				where: {
					userId: user.id,
					provider: 'discord',
				},
				select: {
					access_token: true,
				},
			});

			console.log(account?.access_token)

			/** Discord Profile

             const req = await fetch(
             `${process.env.DISCORD_API_URL as string}/users/@me/guilds/${process.env.AUTHORIZED_GUILD_ID}/member`,
             {
             headers: {
             Authorization: `Bearer ${access_token}`
             }
             }
             )

             const data = await req.json()

			 */

			session.user = user

			return session;
		}
	}
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}

