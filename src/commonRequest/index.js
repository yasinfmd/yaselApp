//axios
import axios from 'axios'

//env
import { API_URL, DEV_API_URL } from "@env"
let defaultHeader = {
    'Content-Type': 'application/json'
}
let baseUrl = ''
if (__DEV__) {
    baseUrl = DEV_API_URL
} else {
    baseUrl = API_URL
}

//API_URL
// if (token !== undefined && token !== null) {
//     try {
//         let validToken = ApplicationUtils.parseJwt(token)
//         defaultHeader = {
//             'Content-Type': 'application/json',
//             'Authorization': "Bearer" + token
//         };
//     } catch (e) {
//     }
//     defaultHeader = {

//     };
// } else {
//     defaultHeader = {
//         'Content-Type': 'application/json',
//     };
// }
const commonRequest = {
    /*  headers: {
            Authorization: 'Bearer ' + varToken
        }*/
    get: (url, headers) => {
        return axios({
            method: 'get',
            url: baseUrl + url,
            headers: headers ? { ...defaultHeader, ...headers } : defaultHeader
        })
    },

    post: (url, data, headers) => {
        return axios.post(baseUrl + url, data, {
            headers: headers ? headers : defaultHeader
        })
        // return axios({
        //     method: 'post',
        //     url: baseUrl + url,
        //     data,


        //     //headers: headers ? { ...defaultHeader, ...headers } : defaultHeader
        // })
    },
    put: () => { },
    delete: () => { }
}
/*

{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
}
*/
export default commonRequest