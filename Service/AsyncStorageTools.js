
import {
    AsyncStorage
} from 'react-native';
const ReadUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
        return { userId: 0, token: 'NaN', hashCode: 'NaN' };
    }
    const transformedData = JSON.parse(userData);
    const { token, userId, hashCode } = transformedData;

    if (!token || !userId || !hashCode) {
        return { userId: 0, token: 'NaN', hashCode: 'NaN' };
    }
    return { userId: userId, token: token, hashCode: hashCode };
};
export default ReadUserData;