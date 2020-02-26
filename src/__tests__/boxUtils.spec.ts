/* eslint-disable no-undef */
import { validateBoxUploadResponse } from '../service/boxUtils';


describe('Box response validator', () => {
    it('should return file id if total_count is equal to 1',  () => {
        const dummyResponse = {
            total_count: 1,
            entries: [
                {
                    id: "1234"
                }
            ]
        };

        const res = validateBoxUploadResponse(dummyResponse)
        expect(res).toBe("1234")
    });
    it('should return empty string if total_count greater than 1',  () => {
        const dummyResponse = {
            total_count: 3,
            entries: [
                {
                    id: "1234"
                }
            ]
        };

        const res = validateBoxUploadResponse(dummyResponse)
        expect(res).toBe("")
    })
    it('should return empty string if total_count less than 1',  () => {
        const dummyResponse = {
            total_count: 0,
            entries: [
                {
                    id: "1234"
                }
            ]
        };

        const res = validateBoxUploadResponse(dummyResponse)
        expect(res).toBe("")
    })
    it('should return empty string there is no total_count',  () => {
        const dummyResponse = {
            error: 'error'
        };

        const res = validateBoxUploadResponse(dummyResponse)
        expect(res).toBe("")
    })


})