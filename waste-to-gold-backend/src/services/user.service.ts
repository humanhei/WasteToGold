import { AuthResponse } from '@supabase/supabase-js';
import { UserModel, User } from '../models/user.model'
import supabase from '../supabase'

export const UserService = {
  getAllUsers: async (): Promise<User[]> => {
    return UserModel.findMany()
  },

  getUserById: async (userId: string): Promise<User|null> => {
    return UserModel.getUserById(userId);
  },

  getUserByEmail: async (email: string): Promise<User|null> => {
    return UserModel.getUserByEmail(email);
  },

  getUserByPhone: async (phone: number): Promise<User|null> => {
    return UserModel.getUserByPhone(phone);
  },

  logInUser: async (email: string, username: string, phone: number, password: string): Promise<User|null> => {
    const modifiedPhone = `+852${Number(phone)}`;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      phone: modifiedPhone,
      password,
    })

    if (error) throw new Error(error.message)

    if (email) {
      return UserModel.getUserByEmail(email);
    } else {
      return UserModel.getUserByPhone(phone);
    }
  },

  signUpUser: async (email: string, username: string, phone: number, password: string): Promise<User> => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) throw new Error(error.message)
    const user = await UserModel.create({ email, username, phone })
    return user
  },

  createUser: async (email: string, username: string, phone: number): Promise<User> => {
    const user = await UserModel.create({ email, username, phone })
    return user
  },
}
