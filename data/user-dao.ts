import {Prisma, PrismaClient} from "@prisma/client";
import {UserModel} from "../types/models/user-model";
import {prisma} from "@/lib/data/db/prisma";
import UserDelegate = Prisma.UserDelegate;

class UserDao {

    users: UserDelegate;

    constructor(db: PrismaClient) {
        this.users = db.user;
    }

    public async getUser(id: string): Promise<UserModel | null> {

        return this.users.findUnique({
            where: {id: id},
            select: {
                id: true,
                name: true,
                image: true,
            }
        }).then((res) => {
            if (res == null) return null;
            return {
                id: res.id,
                name: res.name ?? "",
                image: res.image ?? "",
            }
        })
    }

}

const user_db: UserDao = new UserDao(prisma);

export {user_db}