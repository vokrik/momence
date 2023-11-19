# Exchange Rates

## Getting started
You can check out the app at:
https://effervescent-basbousa-225032.netlify.app/

This app also requires a server. You can find it here:
https://effervescent-basbousa-225032.netlify.app/api/exchange-rates

The server has also a documentation, however for some reason it's not working on netlify (I would need to dig in more into why it's not working)
Locally, you can get it by running
```
npm run dev
```
from the `server` folder and then going to http://localhost:8080/api/api-docs

For local development run:
```
npm build
npm start
```
in the root folder

## Comments
For the benefit of the user, I've decided to put the most used currencies on top of the list and sort the rest by alphabet.

Because of the CORS, I've had to also include a server in this project that proxies the calls to the CNB. Instead of building just a proxy, I've decided to build an adapter that defines its own API. I find this approach better, 
because if CNB API changed in the future, we would be able to update the adapter without changing the API of our server. Right now, it's not a super critical feature, however if we started 
using the API by multiple other services, it would be a good idea to have a stable API.

If this was a real project, I would spend a bit more time on styling and 
handling the loading and error states.

I've tried to structure both the FE code and BE code in vertical slices (instead of horizontal ones). 
For a project of this size, it is not super important, but for a larger projects, I find organizing code
around features instead of layers to be more readable.

For some it might be surprising that I am calculating the exchange rates result on every render. I've decided 
not to memoize the result consciously, because the memoization has it's overhead and it's questionable, if it would bring any benefits.

I finished the project and was on the edge if I should split the Convertor into smaller components, but decided to 
keep them in the file. Would split it later if I found out that the file is getting too big.

For styling, I decided to use the Material UI library. I wasn't sure if I was expected to style everything by hand,
(if so, I can re-style the app manually), I just found it more productive to use a design system.

I've added a few tests:

For backend, I've added unit and integration tests. You can run them by running `npm test` in the `server` folder.

For frontend, I've added just unit tests, because for an app of this size, the integration tests might be too much. To run them, run `npm test` in the `client` folder.
I'm missing few tests for the Page.tsx, Table.tsx and App.tsx - I would test there that the components render and also that the loading and error fallbacks are rendered appropriately
(Ran out of available time I set aside for this task, if you find it important, I can add it later)
