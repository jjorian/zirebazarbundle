import { ValidateErrorModel } from "../models/validate";
import {
    Alert
} from 'react-native';
export function mobileNumberValidator(phoneNumber) {
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(phoneNumber))
        return new ValidateErrorModel(101, '', 0);
    else
        return new ValidateErrorModel(101, 'شماره تلفن باید ده رقمی باشد', 1);

}
export function ZAlert(title, message) {
    Alert.alert(title, message, [{ text: 'خب' }]);
}
export function fetchPicture(webURI, alt) {
    if (webURI) {
        return { uri: webURI }
    }
    else {
        if (alt === 'Product')
            return require('../assets/img_nophoto.png');
        else if (alt === 'Shop')
            return require('../assets/img_nophoto.png');
        else if (alt === 'Profile')
            return require('../assets/img_noprofile.png');
    }
}
export function EnumToTitleList(enumObject) {
    let all = [];
    const keyArray = Object.keys(enumObject);
    const valueArray = Object.values(enumObject);
    let index = 0;
    keyArray.forEach(element => {
        all.push({ "ID": element, "Title": valueArray[index] });
        index++;
    });
    return all;
}
export function removeProperties(object, ...keys) { return Object.entries(object).reduce((prev, [key, value]) => ({ ...prev, ...(!keys.includes(key) && { [key]: value }) }), {}) }



