import { UserAnyType } from "../types";
import UserMon from '../models/user';

const login = async (username: UserAnyType["username"]): Promise<UserAnyType|null> => {
    const user = await UserMon.findOne({ username: username}).populate('museums');
    return user;
};

export default { login };