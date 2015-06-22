# Here 2D8 (Here today)

Proof of concept for a location aware calendar. 

## Deployed at [http://here2d8.com](http://here2d8.com)

## Install

```sh
# Clone repository
$ git clone https://github.com/TimothyRHuertas/2d8 && cd 2d8

# Install dependencies
$ npm install
```

## Development

```sh
$ npm start
```

Go to [http://localhost:3001](http://localhost:3001) and see the magic happen.

## Production

If you want to run the project in production, set the `NODE_ENV` environment variable to `production`.

```sh
$ NODE_ENV=production npm start
```

Also build the production bundle:

```sh
$ npm run dist
```

## Tests

```sh
$ npm test
```

Only run specific tests

```sh
$ npm test -- NotFoundComponent
```

## License (This project uses the react hot load template created by)

MIT © [Søren Brokær](http://srn.io)

https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points

### TODO
* Use location cluster to decide which calendar to load.
* Load dynamic data

