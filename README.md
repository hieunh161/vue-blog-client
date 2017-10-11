# vue-app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### TODO

[x] Fix bug upload image to imgur -> add link vào article
[x] Create async button component
[x] Create detail page with nice css
[x] Add homepage
[x] Add footer
[x] Tag + Category
[ ] add hightlight or prismjs + markdown css
[ ] add facebook comments to site
[ ] add related article
[ ] paging data of home page based on category

## Problems
1. Order in add item in firebase (not in date order but in id order)
2. State ko trigger reactive khi properties ban đầu là undefined
Sol: https://vuex.vuejs.org/en/mutations.html
    1. Prefer initializing your store's initial state with all desired fields upfront.
    2. When adding new properties to an Object, you should either:
    Use Vue.set(obj, 'newProp', 123), or
    Replace that Object with a fresh one. For example, using the stage-3 object spread syntax we can write it like this:
    state.obj = { ...state.obj, newProp: 123 }

    -> s.article = Object.assign({}, s.article, { likes: updateData });

