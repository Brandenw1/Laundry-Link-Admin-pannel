import "@/styles/globals.css";
import "@/styles/satoshi.css";
import type {AppProps} from "next/app";
import React, {useState} from "react";
import Loader from '@/components/common/Loader';
import {useUserDetailsStore} from '@/store/userDetails';
import {deleteCookie, getCookie} from 'cookies-next';
import {buildStringFromChunk, jwtDecodeUser} from '@/lib/jwtSign';
import {Router} from "next/router";
import {loggedOutUser} from '@/service/auth/auth';

export default function App({Component, pageProps}: AppProps) {

    //variable initialization
    const [loading, setLoading] = useState(false);
    const addUserDetails = useUserDetailsStore(state => state.addUserDetails)
    const userProfileName = getCookie('app-user-name')
    const userPermissionChunkLength = getCookie('app-user-permissions-chunk-length')
    const userPhoto = getCookie('app-user-pic')
    const userId = getCookie('app-user-id')
    const userDataRole = getCookie('app-user-role')
    let newChunkArr = []

    //set route change loader
    Router.events.on('routeChangeStart', (url) => {
        setLoading(true);
    });

    Router.events.on('routeChangeComplete', (url) => {
        setLoading(false);
    });

    const logout = async () => {
        const response = await loggedOutUser({})
        if (!response.error) {
            deleteCookie('app-refresh-token')
            deleteCookie('app-user-name')
            deleteCookie('app-user-id')
            deleteCookie('app-token')
            deleteCookie('app-user-pic')
            deleteCookie('app-user-permissions')
            deleteCookie('app-user-role')
            deleteCookie('app-is-password-update')
            for (let i = 0; i < parseInt(userPermissionChunkLength); i++) {
                deleteCookie(`app-user-permissions-${i}new`)
            }
            window.location.reload()
        }
    }

    for (let i = 0; i < parseInt(userPermissionChunkLength); i++) {
        let userPermissionChunks = getCookie(`ecl-user-permissions-${i}new`)
        newChunkArr = [...newChunkArr, userPermissionChunks]
    }
    let jwtPer = buildStringFromChunk(newChunkArr)

    if (userProfileName && jwtPer.length > 0) {
        try {
            addUserDetails({
                name: userProfileName, user_id: userId, permission: jwtPer, pic: userPhoto,
                userRole: jwtDecodeUser(userDataRole)
            })
        } catch (error) {
            logout().catch((e) => console.log(`__app logout catch => `, e));
        }
    }

    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
        <>
            {
                loading ? <Loader/> : <Component {...pageProps} />
            }
        </>
    );
}
