import { postData } from "../httpRequest";

export const loginUser = async (payload) => {
    try {
        const res = await postData(`auth/login/admin`, payload)
        return res;

    } catch (error) {
        console.log(error);
        return {
            error: true,
            data: null,
            message: 'Something went wrong.'
        }
    }
}

export const loggedInUser = async (payload) => {

    try {
        const res = await postData(`auth/is-logged-in`, payload)
        return res;

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Some thing went wrong.'
        }
    }
}

export const loggedOutUser = async (payload) => {

    try {
        const res = await postData(`logout`, payload, true)
        return res;

    } catch (error) {
        return {
            error: true,
            data: null,
            message: 'Some thing went wrong.'
        }
    }
}
