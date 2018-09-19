import User from "./user";
import UserProperty from "./user.property";

export default class UserLoginRepsonse {

    user: User;
    code: string;
    message: string;
    languageID: string;
    properties: UserProperty[];
    token: string;
    returnUrl: string;
    isEmtry: string;
    extraParam: string;
    extraParam2: string;
    extraParam3: string;
    EmtryText: string;
    UserLanguageID: string;
    ValidationSummury: string;
    culture: string;
    password: string;
}