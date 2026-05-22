import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/auth.types";

interface AuthState {

  user: User | null;

  token: string | null;

  loading: boolean;

  login: (
    token: string,
    user: User
  ) => Promise<void>;

  logout: () => Promise<void>;

  restoreSession: () => Promise<void>;
}

export const useAuthStore =
  create<AuthState>((set) => ({

    user: null,

    token: null,

    loading: true,

    login: async (token,user) => {

      await AsyncStorage.setItem( "token",token);

      await AsyncStorage.setItem("user",JSON.stringify(user));
        
      set({token,user});
    },

    logout: async () => {

      await AsyncStorage.removeItem(
        "token"
      );

      await AsyncStorage.removeItem(
        "user"
      );

      set({
        token: null,
        user: null,
      });
    },

    restoreSession: async () => {

      try {

        const token = await AsyncStorage.getItem("token");

        const userString = await AsyncStorage.getItem("user");

        if ( token && userString) {

          set({
            token,
            user:
              JSON.parse(
                userString
              ),
          });
        }

      } catch (error) {

        console.log(
          "Session restore failed",
          error
        );

      } finally {

        set({
          loading: false,
        });

      }
    },
}));