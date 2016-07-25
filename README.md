# DuckDuckGo Angular Demo

A demo of DuckDuckGo's [Instant Answer API](https://api.duckduckgo.com/api), built as a short programming task.

## Running the app

### Install
```sh
npm i webpack typings typescript -g
git clone git@github.com/vinaygopinath/duckduckgo-angular-demo.git
cd duckduckgo-angular-demo
npm install
```

### Run
```sh
npm start
```

### Unit tests
```sh
npm test
```
Test coverage data is available at `reports/coverage/index.html`

### Build
```sh
npm run build
```

## About

#### Features

* DuckDuckGo search with autocomplete (based on disambiguations)
* DuckDuckGo disambiguations and results
* LocalStorage-based search history
* Reactive UI

#### Built with:

* Angular 1.5 (Component style)
* Typescript
* SCSS
* Angular-material + Material icons
* Angular-route
* Angular-moment

#### Development tools

* Webpack
* Babel
* Browsersync
* Karma
* Jasmine
* Istanbul

This project was generated using [angular-typescript-webpack](https://github.com/brechtbilliet/angular-typescript-webpack)

### MIT Licence