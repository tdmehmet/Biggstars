const apiHost = 'https://abcmobilservice.biggstars.com/';

export default {

    async post(api, body, token) {
        var obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'DeviceId': 'asd',
                'AppPlatformType': 'Android',
                'ApplicationSecret': 'XXX1',
                "AppVersion": "Android 1.0",
                'ApplicationID': '1',
                "Content-Type": "application/json",
                "token": token,
            },
            body: body,
        }
        let response = await fetch(apiHost + api, obj);
        let responseJson = await response.json();
        return responseJson;
    },

    async get(apiwithparams, token) {
        var obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'DeviceId': 'asd',
                'AppPlatformType': 'Android',
                'ApplicationSecret': 'XXX1',
                "AppVersion": "Android 1.0",
                'ApplicationID': '1',
                "Content-Type": "application/json",
                "token": token,
            }
        }
        let response = await fetch(apiHost + apiwithparams, obj);
        let responseJson = await response.json();
        return responseJson;
    }
}
