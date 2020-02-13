const BoxSDK = require('box-node-sdk')
const sdkConfig = require('../app.json')


class SDKConfiguration {
    sdk = BoxSDK.getPreconfiguredInstance(sdkConfig)
}

export default new SDKConfiguration()




// const client = sdk.getAppAuthClient('user', '10749870381')
// client.folders.getItems('93875468756', { limit: 1})
// .then((r: any) => console.log(r))
