import {jest, describe, expect, it, beforeEach} from '@jest/globals';
import nock from 'nock';
import * as process from "process";
import supertest from "supertest";
import app from '../../../index'
import {DAILY_RATES_PATH} from "../../src/cnbClient";
import {successResponseMock} from "../mocks/cnbClient";


describe("/exchange-rates", () => {
    beforeEach(() => {
        nock.cleanAll()
        jest.spyOn(console, 'error').mockImplementation(() => {});
    })
    describe("GET /", () => {
        it("should return 200 and list of exchange rates", async () => {
            const scope = nock(process.env.API_URL)
                .get(DAILY_RATES_PATH)
                .reply(200, successResponseMock)

            await supertest(app).get("/exchange-rates")
                .expect(200,{
                    rates: [
                        {
                            country: 'Australia',
                            currency: 'dollar',
                            amount: 1,
                            code: 'AUD',
                            rate: 14.613
                        },
                        {
                            country: 'USA',
                            currency: 'dollar',
                            amount: 1,
                            code: 'USD',
                            rate: 22.547
                        },
                        {
                            country: 'Israel',
                            currency: 'new shekel',
                            amount: 1,
                            code: 'ILS',
                            rate: 5.974
                        }
                    ]
                })
        });
        it("should return 503 when CNB api is down", async () => {
            const scope = nock(process.env.API_URL)
                .get(DAILY_RATES_PATH)
                .reply(500, "Some error")

                await supertest(app).get("/exchange-rates").expect(
                    503,
                    {
                        message: "Service temporarily unavailable"
                    }
                );
        });

        it("should return 500 on unhandled error", async () => {
            const scope = nock(process.env.API_URL)
                .get(DAILY_RATES_PATH)
                .reply(200, "Some wrong format")

            await supertest(app).get("/exchange-rates").expect(
                500,
                {
                    message: "Something went wrong"
                }
            );
        });
    });
})


