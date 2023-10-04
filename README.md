# Currency Trend

[![Unit Tests](https://github.com/vjcagay/currency-trend/actions/workflows/run-unit-tests.yml/badge.svg)](https://github.com/vjcagay/currency-trend/actions/workflows/run-unit-tests.yml)

A simple demonstration of implementing a modern web application in 2023.

## Features

- ✅ Shows a time series line charts of exchange rates between USD, SGD, JPY, and EUR over time
- ✅ Allows switching time series range between one week, one month, six months, or selected custom range
- ✅ Responsive, works well with mobile screens as well as desktop

## Screenshots

| Desktop                                       | Mobile                                      |
|-----------------------------------------------|---------------------------------------------|
| ![desktop](/screenshots/desktop.png?raw=true) | ![mobile](/screenshots/mobile.png?raw=true) |


## Requirements

- Node.js v20.8.0 (if you use ASDF you can do `asdf install`)
- Docker

## Contributing

The application is split into the front-end and the back-end, but the instructions are similar for consistency.

Do these steps on two separate terminal sessions, one for the front-end, and the other for the back-end.
1. Go to the `frontend` or the `backend` folder.
2. Run `npm install` to install the dependencies.
3. To start the development server, run `npm run dev`. The front-end server supports hot module replacement for a
delightful developer experience. The back-end also reloads on file changes.
4. The front-end runs at `localhost:8080` while the back-end runs on `localhost:8081`.
5. Execute unit tests by running `npm test`. The unit tests are also run on
[GitHub Actions](https://github.com/vjcagay/currency-trend/actions/workflows/run-unit-tests.yml).

## Releasing

1. To package the application, you may use Docker Compose, which you can run locally by running `docker compose up -d`
on the root folder.
2. The front-end uses multi-stage builds, so only the minified and the optimized version make it to the built image.
3. You can access the application running in Docker on `localhost:8080`. Make sure the development servers mentioned in
the Contributing section are not running, so they will not conflict with Docker.

## Notes
- The data were scraped from FxTop, so the application is not tapping into third-party services to pull forex data.
- Therefore, there the application can only show forex data between 2022 October 1st and 2023 October 4th.

## Nice to Haves

- Able to pull forex data from a third-party service for the latest forex data. The forex services indeed offer trial or
free access, however, the features are limited and requesting for a large amount of data requires a higher tier which
costs a lot of money.
- Cross-hair feature on the graph is not implemented. There are plugins to enable cross-hair but at this moment, they
do not work as desired, and writing one takes a significant amount of time.
- Two calendars, each for choosing the start and end dates respectively. Implementing it takes a significant amount of
time, so for the meantime only a single calendar that supports range selection is done. It's not the best user
experience, but it works.

## Credits
- The `favicon.ico` file created by Nixxdsgn, taken from [Flaticon](https://www.flaticon.com/free-icon/exchange_5880981)
- The forex data scraped from [FxTop](https://fxtop.com)
