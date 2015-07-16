# Server

1. [Structure](#structure)
2. [Why Node?](#why-node)
3. [Why Hapi?](#why-hapi)
4. [How it works](#how-it-works)
5. [Assets](#assets)
6. [Views](#views)

## Structure

```
platforms/node
├── config               # Top level configuration settings
├── index.js             # Sets up the environment and boots the app
├── plugins              # Server concerns split into chunks
│   ├── assets           # Adds static asset handling
│   ├── logger.js        # Configures server logging
│   └── views            # Adds server page rendering
├── server.js            # Server confguration
└── webpack.js           # webpack-dev-server configuration
```

## Why Node?

Node can be taught to parse [JSX](http://facebook.github.io/jsx/)
and [ES6 JavaScript](http://babeljs.io/docs/learn-es6/) syntax. This
allows us to render the application server-side. Additionally, most
front-end development projects at Viget are now using the Node Package
Manager (npm) to manage JavaScript dependencies. Sharing most
dependencies between environments yields some workflow and maintenance
benefits.

## Why Hapi?

Hapi was built by Walmart Labs specifically to proxy other services in
their system in order to have a common API for their front-end. This
aligns very well with our use case.

Additionally, Hapi is supported by an extremely dedicated
community and has substantial enterprise backing. It is quick to
fail when a configuration setting has not been entered properly. This
prevents mistakes and helps to fight bitrot.

## How it works

The `./index` gets called whenever `npm start` is executed. This
script injects some default environment variables, modifies JavaScript
execution to support the [React](http://facebook.github.io/react/)
front-end app, and then requires `./server`.

## Assets

This application uses [webpack](webpack.github.io) to compile
assets. In development, Webpack is run via
[`webpack-development-server`](https://github.com/webpack/webpack-dev-server)
and proxied through Hapi under the `/assets` path. In production, Hapi
servers static assets from that same directory after compiling
everything with Webpack.

Webpack is particularly useful for a couple of reasons:

1. Webpack supports
   [hot module replacement](http://webpack.github.io/docs/hot-module-replacement.html). This
   means that, in development, updates to the application can
   dynamically update in the browser without requiring a page
   refresh. This is also true of changes to CSS.
2. Webpack is more strategic about assets. For example, in development
   we require CSS files within the JavaScript application itself,
   extracting those styles into a common build for production.
3. The React community likes Webpack.

## Views

See `./plugins/views`. This server has a catch-all route that
attempts to render the front-end application. Whenever given a
request, it runs the application within the context of a given
route. The data required for that route is fetched and the generated
markup and seed data are built into a template and ultimately sent to
the user.

[Swig](http://paularmstrong.github.io/swig/) is used to render server
responses.
