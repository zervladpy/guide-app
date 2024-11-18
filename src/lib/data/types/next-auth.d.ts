import { DefaultSession, DefaultUser, AuthOptions as NextAuthOption, User as NextUser } from "next-auth";

declare module "next-auth" {

    interface User extends DefaultUser {
        id: string,
        name: string,
        image: string,
        email: string
    }

    interface Session extends DefaultSession {
        user: User
        expires: ISODateString
    }


}