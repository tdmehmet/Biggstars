import RNFS from 'react-native-fs';
import UserLoginResponse from '../models/user/user.login.response';

const tokenFileName = "TokenFile.tmp";


export default {
    async writeTokenFile(text) {
        let path = RNFS.DocumentDirectoryPath + tokenFileName;
        RNFS.writeFile(path, text, 'utf8');
    },
    async getUserFromTokenFile() {
        let filePath = RNFS.DocumentDirectoryPath + tokenFileName;
        if(await RNFS.exists(filePath)) {
            return await RNFS.readFile(filePath, 'utf8');
        }
    },
    async getUserInfoFromTokenFile() {
        let filePath = RNFS.DocumentDirectoryPath + tokenFileName;
        let fileExists = await RNFS.exists(filePath);
        if (fileExists) {
            let loginResponse = new UserLoginResponse();
            let jsonResponseBody = await RNFS.readFile(filePath, 'utf8');
            if(jsonResponseBody !== null && jsonResponseBody !== undefined && jsonResponseBody !== '') {
                loginResponse = JSON.parse(jsonResponseBody);
                if (loginResponse.token !== null && loginResponse.token !== undefined) {
                    return loginResponse;
                }
            }
            let deleteFileResult = await RNFS.unlink(filePath);
            return null;
        }
        return "empty";
    },
    async removeTokenFile() {
        let filePath = RNFS.DocumentDirectoryPath + tokenFileName;
        let fileExists = await RNFS.exists(filePath);
        if(fileExists)
            await RNFS.unlink(filePath);
    },
}

