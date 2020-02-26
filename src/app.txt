import { logger, stream } from './utils/logger';
import * as sourceMaps from 'source-map-support'
sourceMaps.install()

import { BoxRequestNsqMessage } from './models/boxMessages';
import { Reader, Writer } from 'nsqjs'
const BoxSDK = require('box-node-sdk')
const sdkConfig = require('./appSetting.json')




class SDKConfiguration {
    sdk = BoxSDK.getPreconfiguredInstance(sdkConfig)
}

// let tempSdk = new SDKConfiguration()
// let tempClient = tempSdk.sdk.getAppAuthClient('user', '10749870381')

class NsqClient {
    constructor(sdkConfiguration: SDKConfiguration) {
        this.client = sdkConfiguration.sdk.getAppAuthClient('user', '10749870381')
        this.writerIsConnected = false
        logger.debug('nsq client created')
    }
    client: any
    reader = new Reader('box-request', 'actions', {
        lookupdHTTPAddresses: "nsqlookupd:4161",//"172.18.0.2:4161", // 
        nsqdTCPAddresses: "nsqd:4150",//['172.18.0.4:4150'] //
        maxInFlight: 8,
        maxAttempts: 3
    })
    writer = new Writer('nsqd', 4150)
    writerIsConnected: boolean
    connectWriter = (): void => {
        this.writer.connect()
        logger.debug('file upload-response writer connected')
        this.writerIsConnected = true
        this.writer.on('ready', () => {
        })
        this.writer.on('error', () => this.writerIsConnected = false)
        this.writer.on('closed', () => this.writerIsConnected = false)
    }
    connectReader = (): void => {
        this.reader.connect()
        logger.debug('file upload reader connected')
        this.reader.on('message', async msg => {
            // console.log(`received a message ${msg.id}`)

            let body = JSON.parse(msg.body.toString())
// todo -> change interface to the class with validation in the constructor
            const receivedBoxMessge: BoxRequestNsqMessage = {
                boxAction: body.boxAction.toLowerCase(),
                fileToUpload: body.fileToUpload.data,
                fileToUploadName: body.fileToUploadName,
                fileToUploadType: body.fileToUploadType,
                targetFolder: body.targetFolder,
                reqestId:  body.reqestId,
                processName: body.processName,
            }
            // check if incoming msg is expected model
            // validate input
            // wrong input -> delete from queue

            // if (receivedBoxMessge.boxAction.toLowerCase() === 'upload') {
            //     console.log('action is upload')
            // }

            try {
                let uploadStart = Date.now()
                await this.client.files
                    .uploadFile(receivedBoxMessge.targetFolder, `${receivedBoxMessge.fileToUploadName} ${new Date()}${Math.random().toString()}.${receivedBoxMessge.fileToUploadType}`, Buffer.from(receivedBoxMessge.fileToUpload))
                    logger.debug(`raw uploading time: ${Date.now() - uploadStart}`)
                    // check if writer is ready to send response
                // if (this.writerIsConnected===true) {
                    this.writer.publish('box-response', { requestId:  receivedBoxMessge.reqestId})
                    msg.finish()
                // } else {
                //     msg.requeue(30)
                //     console.log(`writer is not ready to send resposne. requeueing messgae`)
                // }
            } catch (error) {
                logger.error(error)
                msg.requeue(30)
            }
        })
        this.reader.on('error', err => console.error(err))
    }
}


export const App = {
    boxSrv: new SDKConfiguration(),
    nsqClient: NsqClient
}


// const client = sdk.getAppAuthClient('user', '10749870381')
// client.folders.getItems('93875468756', { limit: 1})
// .then((r: any) => console.log(r))
