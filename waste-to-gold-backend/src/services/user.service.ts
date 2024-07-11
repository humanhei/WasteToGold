import { UserModel, User } from '../models/user.model'
import supabase from '../supabase'

export const UserService = {
  getAllUsers: async (): Promise<User[]> => {
    return UserModel.findMany()
  },

  createUser: async (email: string, username: string, phone: number, password: string): Promise<User> => {
    const user = await UserModel.create({ email, username, phone })

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw new Error(error.message)

    return user
  },
}
