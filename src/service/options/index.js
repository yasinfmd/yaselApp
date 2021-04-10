
//requests
import CommonRequest from '../../commonRequest'

//response model
const responseData = {
    error: false,
    isSuccess: false,
    result: null,
    errorMessage: ''
}
export const FetchAllOptions = async (url, headers) => {
    try {
        const { data } = await CommonRequest.get(url, headers)
        responseData.result = data
        responseData.isSuccess = true;
    } catch (err) {
        responseData.isSuccess = false;
        responseData.error = true
        responseData.errorMessage = err.message
    } finally {
        return responseData

    }
}