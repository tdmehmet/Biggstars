import UserResponse from "../models/user/user";

export default class ConfigStore {
    constructor() {
        this.splashTime = 1000;
        this.splashImg = require('../assets/images/biggstars_splash.jpg');
        this.logoImg = require('../assets/images/biggplus-logo.png');
        this.imageURL = "https://abcstars.biggstars.com/Images/UserAvatar/";
    }

    get SplashTime() {
        return this.splashTime;
    }

    get SplashImg() {
        return this.splashImg;
    }

    get LogoImg() {
        return this.logoImg;
    }

    get ImageURL() {
        return this.ImageURL;
    }
}
