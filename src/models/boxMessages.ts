interface InputNsqMessageI {
    reqestId: string
    processName: string
}

interface BoxRequestNsqMessageI {
    boxAction: string
    fileToUpload: Buffer,
    fileToUploadName: string
    fileToUploadType: string
    targetFolder: string
}

export type BoxRequestNsqMessage = InputNsqMessageI & BoxRequestNsqMessageI

// class FileToUpload

// BoxRequestMessage describes message body which is expected by nsq reader
// class BoxRequestNsqMessage implements InputNsqMessageI{

//     boxAction: string
//     fileToUpload: object
//     fileToUploadName: string
//     fileToUploadType: string
//     targetFolder: string
//     reqestId:string
//     processName:string

//     constructor(boxAction: string, fileToUpload: object, fileToUploadName: string, fileToUploadType: string, targetFolder: string, reqestId:string, processName:string) {
//         this.boxAction = boxAction
//         this.fileToUpload = fileToUpload 
//         this.fileToUploadName = fileToUploadName 
//         this.fileToUploadType = fileToUploadType 
//         this.targetFolder = targetFolder 
//         this.reqestId = reqestId 
//         this.processName = processName 
//     } 
// }