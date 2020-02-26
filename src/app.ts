import { uploadFile } from './service/boxUtils';
import { logger, stream } from './utils/logger';
import * as sourceMaps from 'source-map-support'
sourceMaps.install()

import SDKConfiguration from './service/boxInit';
import { Reader, Writer } from 'nsqjs'


class NsqClient {
    constructor(sdkConfiguration: SDKConfiguration) {
        this.client = sdkConfiguration.sdk.getAppAuthClient('user', process.env.BOX_UPLOAD_CLIENT_ID || '10749870381')
        this.writerIsConnected = false
        logger.debug('nsq client created')
    }
    client: any
    reader = new Reader('box.upload', 'actions', {
        lookupdHTTPAddresses: process.env.NSQ_LOOKUP_ADRESS || "127.0.0.1:4161",//"172.18.0.2:4161", // 
        nsqdTCPAddresses: process.env.NSQ_DAEMON_ADDRESS || "127.0.0.1:4150",//['172.18.0.4:4150'] //
        maxInFlight: 8,
        maxAttempts: 3
    })
    writer = new Writer(process.env.NSQ_DAEMON_ADDRESS_WRITER || '127.0.0.1', 4150)
    writerIsConnected: boolean
    connectWriter = (): void => {
        this.writer.connect()
        logger.debug('nsq writer connected')
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
            try {
                const { boxUploadData, id, user } = msg.json()

                try {
                    const uploadedId = await uploadFile(this.client, boxUploadData.targetFolder, boxUploadData.fileToUploadName, boxUploadData.fileToUploadType, Buffer.from(boxUploadData.fileToUpload))
                    // if wasn't able to upload a file - requeue message
                    // todo -> requeue only connection and rate limit errors
                    if (uploadedId == "") {
                        logger.error(`File not uploaded, requeueing`)
                        msg.requeue(200)
                    }
                    logger.debug(`req: ${id} file uploaded`)

                    // todo -> write a message to the notification service
                    this.writer.publish('notification.confirmation', { uploadedFile: uploadedId, user: user })

                    msg.finish()


                } catch (error) {
                    // on generic error just requeueu
                    logger.error(`${error}`)
                    msg.requeue(200)
                }
            } catch (error) {
                // if can't parse a message send na error notification
                logger.error(`can't parse message from msg body: ${error}`)
                // todo -> write a message to the notification service
                this.writer.publish('notification.error', `to implement, ${error}`)

                msg.finish()

            }
        })
        this.reader.on('error', err => console.error(err))
    }
}


export const App = {
    boxSrv: new SDKConfiguration(),
    nsqClient: NsqClient
}

