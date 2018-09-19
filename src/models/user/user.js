import User_Organization from './user.organization';

export default class UserResponse {
    uID: string;
    name: string;
    surname: string;
    avatar: string;
    email: string;
    password: string;
    createDate: string;
    userType: string;
    fbID: string;
    isActive: string;
    activationCode: string;
    tel: string;
    gender: string;
    birtDate: string;
    aciklama: string;
    activationShortCode: string;
    workStartDate: string;
    GCMnotificationTest: string;
    isCompleteProfile: string;
    isRegisterLMS: string;
    lmsRegisterDate: string;
    lmsMemberID: string;
    lmsaccess_token: string;
    isFirstLoginOK: string;
    lms_secretCode: string;
    testFirma: string;
    testDuration: string;
    setedCulture: string;
    User_Organization: User_Organization[];
}