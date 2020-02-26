import { logger } from './../utils/logger';

export const uploadFile = async (client: any, targetFolder: string, fileToUploadName: string, fileToUploadType: string, fileToUpload: Buffer): Promise<String> => {
    try {
        const boxResponse = await client
            .files
            .uploadFile(targetFolder, `${fileToUploadName}${Math.random().toString()}.${fileToUploadType}`, fileToUpload)

        const uploadedFileId = validateBoxUploadResponse(boxResponse)
        return uploadedFileId

    } catch (error) {
        logger.error(`could not upload a file: ${JSON.stringify(error)}`)
        // wrong folder: 404
        // to many 429
        return ""
    }
}

export const validateBoxUploadResponse = (boxResponse: any): string => {
    if (boxResponse?.total_count !== 1) {
        logger.error(`expected one file id in repsonse, got ${boxResponse?.total_count}`)
        return ""
    }
    const [file] = boxResponse?.entries
    return file?.id



}

