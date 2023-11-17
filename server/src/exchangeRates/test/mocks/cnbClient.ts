export const successResponseMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.613
USA|dollar|1|USD|22.547
`

export const missingDateMock = `Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.613
`

export const missingColumnHeadersMock = `16 Nov 2023 #222
Australia|dollar|1|AUD|14.613
`

export const missingHeaderMock = `16 Nov 2023 #222
Australia|dollar|1|AUD|14.613
`

export const extraNewLinesHeaderMock = `16 Nov 2023 #222

Country|Currency|Amount|Code|Rate

Australia|dollar|1|AUD|14.613
`

export const extraNewLinesInRatesMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.613

USA|dollar|1|USD|22.547
`

export const extraNewLinesAfterRatesMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.613

`
export const malformedAmountMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|dollar|SomeString|AUD|14.613
`

export const negativeAmountMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|dollar|-1|AUD|14.613
`
export const negativeRateMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|-14.613
`
export const malformedRateMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|SomeString
`
export const tooManyColumnsMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.613|extra
`
export const tooLittleColumnsMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
Australia|1|AUD|14.613
`

export const emptyRatesMock = `16 Nov 2023 #222
Country|Currency|Amount|Code|Rate
`

export const emptyResponseMockMock = ``