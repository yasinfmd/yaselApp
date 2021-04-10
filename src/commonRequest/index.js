//axios
import axios from 'axios'

//env
import { API_URL } from "@env"
let defaultHeader = {
    'Content-Type': 'application/json'
}

const baseUrl = API_URL
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
        return axios({
            method: 'post',
            url: baseUrl + url,
            data,
            headers: headers ? { ...defaultHeader, ...headers } : defaultHeader
        })
    },
    put: () => { },
    delete: () => { }
}
export default commonRequest