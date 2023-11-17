import {jest, describe, expect, it, beforeEach} from '@jest/globals';
import axios from 'axios';
import cnbClient from "../src/cnbClient";
import ExternalResourceUnavailableError from "../src/errors/ExternalResourceUnavailableError";

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('cnbClient', () => {
    beforeEach(() => {
        mockedAxios.mockClear();
        jest.spyOn(console, 'error').mockImplementation(() => {});

    })
    describe('getRates',  () => {
        it('should return rates', async () => {
            const expectedResult = "Some text"
            mockedAxios.get.mockResolvedValue({ data: expectedResult })

            expect(await cnbClient.getRates()).toEqual(expectedResult)
        })

        it('should throw ExternalResourceUnavailableError on any error', async () => {
            mockedAxios.get.mockRejectedValue( new Error() )

            await expect(cnbClient.getRates()).rejects.toBeInstanceOf(ExternalResourceUnavailableError)})
    })
})