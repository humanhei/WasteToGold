import { AuthResponse } from '@supabase/supabase-js';
import { UserModel, UserWithIncludes } from '../models/user.model'
import supabase from '../supabase'
import { User } from '@prisma/client'

export const UserService = {
  getAllUsers: async (): Promise<UserWithIncludes[]> => {
    return UserModel.findMany()
  },

  getUserById: async (userId: string): Promise<UserWithIncludes|null> => {
    return UserModel.getUserById(userId);
  },

  getUserByEmail: async (email: string): Promise<UserWithIncludes|null> => {
    return UserModel.getUserByEmail(email);
  },

  getUserByPhone: async (phone: number): Promise<UserWithIncludes|null> => {
    return UserModel.getUserByPhone(phone);
  },

  checkUsername: async (username: string): Promise<boolean> => {
    if(await UserModel.getUserByUsername(username)) {
      return true;
    } else {
      return false;
    }
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

  signUpUser: async (username: string, password: string, email?: string, phone?: number): Promise<User> => {
    const { error } = await supabase.auth.signUp({
      email: email || "",
      password
    })

    if (error) throw new Error(error.message)
    const user = await UserModel.create({ email: email || "", username, phone: phone || 0 })
    return user
  },

  verifyOTP: async (token: string, email?: string, phone?: number): Promise<User | null> => {
    let error;
    let user;
    if (email) {
      ({ error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      }))
      user = await UserModel.getUserByEmail(email)
    } else if (phone) {
      const phoneStr = `+852${phone}`;
      ({ error } = await supabase.auth.verifyOtp({
        phone: phoneStr,
        token,
        type: 'sms'
      }))
      user = await UserModel.getUserByPhone(phone)
    } else {
      throw new Error("Please enter either phone or email")
    }

    if (error) throw new Error(error.message)
    return user
  },

  createUser: async (username: string, email?: string, phone?: number): Promise<User> => {
    const user = await UserModel.create({ email, username, phone })
    return user
  },
}
