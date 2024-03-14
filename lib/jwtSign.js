import sign from "jwt-encode"
import jwt_decode from "jwt-decode";

export const jwtSignature = (payload) => {
    const signData = sign(payload, '');
    return signData;
}

export const jwtDecodeUser = (token) => {
    try {
        const data = jwt_decode(token);
        return data;
    } catch (error) {
        return false
    }


}

export function chunkString(inputString, chunkSize) {
    const resultArray = [];
    for (let i = 0; i < inputString.length; i += chunkSize) {
        resultArray.push(inputString.slice(i, i + chunkSize));
    }
    return resultArray;
}

export const buildStringFromChunk = (inputStringArr) => {
    if (inputStringArr.join('')) {
        return jwtDecodeUser(inputStringArr.join(''))
    } else {
        return []
    }

}