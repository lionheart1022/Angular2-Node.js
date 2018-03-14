# Dark Net

### Install

#### Prerequisites

- node >= 6, `node -v`
- npm >= 3, `npm -v`
- yarn installed `npm install -g yarn`

#### Start it

```sh
$ yarn install
$ npm start
```
Your app will be available at localhost:8000 and will update every change you made.

#### Build and Ship _it_

```sh
# Build for Development will be found in ./dist
$ npm run build:dev
# Build for Production will be found in ./dist
$ npm run build:prod
```

#### Test _it_

```sh
# Run Unit Tests. Will also add shield-badge to your README.md with line coverage percentage
$ npm run test
# Run E2E Tests
$ npm run e2e
```

You can change the badge coverage type in `./config/karma.conf.js`.
Visit [istanbul-reporter-shield-badge](https://www.npmjs.com/package/istanbul-reporter-shield-badge) for more information.

#### Document _it_

```sh
# Runs Typedoc. Result will be found at ./docs
$ gulp docs
```

#### Log _it_

```sh
# Will update ./CHANGELOG.md in root folder
$ gulp changelog
```

#### _it_ Supports every Browser

Thanks to `autoprefixer` we can really focus on the important stuff.
Webpack will add all required css tags.

| Browser | Version |
| :--- | :--- |
| Chrome | >= 48 |
| Firefox | >= 44 |
| Safari | >= 6 |
| Explorer | >= 11 |
| Edge | >= 13 |
| Opera | >= 35 |
| Android | >= 4|
| iOS | >= 8 |

### Contributing 

You're very welcome to contribute. Just raise an issue and make a PR.

