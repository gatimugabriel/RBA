import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
    email: string
    role: number
    token: string

    fullName?: string
    ghUsername?: string
}

type UserContext = {
    user: User | null
    setUser: (user: User | null) => void,
    loadUser: () => Promise<void>
}

export const UserContext = createContext<UserContext | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)

    // get user form async storage
    const loadUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('user')
            if (userData) {
                setUser(JSON.parse(userData))
            }

        } catch (error) {
            console.log("failed to load user", error)
        }
    }

    //  Save user to local storage
    const saveUser = async (userData: User | null) => {
        try {
            if (userData) {
                await AsyncStorage.setItem("user", JSON.stringify(userData))
            } else {
                await AsyncStorage.removeItem("user")
            }
        } catch (error) {
            console.error("Failed to save user to async storage", error)
        }
    }

    const handleSetUser = async (userData: User | null) => {
        saveUser(userData).then(() => console.log(''))
        setUser(userData)
    }

    useEffect(() => {
        loadUser().then((data) => {
        })
    }, []);

    return (
        <UserContext.Provider value={{user, setUser: handleSetUser, loadUser}}>
            {children}
        </UserContext.Provider>
    )
}
