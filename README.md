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


Also, all components seem to be rendering 2 times. I suspect that it's because of react 18's strict mode, but I haven't find time to make sure
(https://legacy.reactjs.org/docs/strict-mode.html#ensuring-reusable-state) 

For styling, I decided to use the Material UI library. I wasn't sure if I was expected to style everything by hand,
(if so, I can re-style the app manually), I just found it more productive to use a design system.

I've added a few tests:

For backend, I've added unit and integration tests. You can run them by running `npm test` in the `server` folder.

For frontend, I've added just unit tests, because for an app of this size, the integration tests might be too much. To run them, run `npm test` in the `client` folder.

I've spent around 9 hours on this project - I think the most time-consuming part was everything but coding :). I spend quite some time with setting up the project & tooling (to be honest, I don't do that every day, so I had to refresh my memory a bit) 
and deployment to netlify, which I have never worked before and where I got a bit stuck on bundling the apidoc to the lambda function. Overall 
the coding itself was around 5 hours (including the tests) and it was quite fun.