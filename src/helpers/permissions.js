
import { check, request, PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';

import Consts from '../consts'
const onRequestDevice = async (requestType,
    title = Consts.permissionTitle, message = Consts.permissionMessage) => {
    const result = await request(PERMISSIONS.ANDROID[requestType], { buttonPositive: Consts.buttonPositive, buttonNegative: Consts.buttonNegative, title: title, message: message });
    return result;
}
export { onRequestDevice }

//
const checkPermissionResult = (permissionType,
    title = Consts.permissionTitle, message = Consts.permissionMessage) => {
    let permissionResult;
    return new Promise((resolve, reject) => {
        check(PERMISSIONS.ANDROID[permissionType])
            .then(async (result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        resolve(-1)
                        break;
                    case RESULTS.DENIED:
                        console.log('izin istenmedi / reddedildi istenebilir');
                        permissionResult = await onRequestDevice(permissionType, title, message)
                        resolve(permissionResult === 'granted' ? 1 : 0)
                        //denied
                        break;
                    case RESULTS.LIMITED:
                        break;
                    case RESULTS.GRANTED:
                        resolve(1)
                        break;
                    case RESULTS.BLOCKED:
                        resolve(-1)
                        break;
                }
            })
            .catch((error) => {
                console.log('hatalar', error)
                // …
            });
    })

}
export { checkPermissionResult }