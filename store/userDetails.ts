import {create} from 'zustand'

interface userDetailsStateData {
    _id: string,
    name: string,
    pic: string
    permissions: []
}

interface UserDetailsState {
    userDetailsList: userDetailsStateData[],
    addUserDetails: (payload: userDetailsStateData[] | any) => void,
    removeUserDetails: (id: string) => void
}

export const useUserDetailsStore = create<UserDetailsState>()((set) => ({
    userDetailsList: [],
    addUserDetails: async (payload) => {
        set((state) => ({
            userDetailsList: payload
        }))
    },
    removeUserDetails: (id) => {
        set((state) => ({userDetailsList: state.userDetailsList.filter((data) => data._id !== id)}))
    },
}))
