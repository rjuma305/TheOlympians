# The Olympians

A browser-based tower defense game inspired by Greek mythology. Defend Mt. Olympus from waves of mythical enemies using towers themed after the gods.

## Running Locally

You can test the game by simply opening `src/index.html` in a modern browser. If you prefer a local web server, any simple HTTP server will work, for example:

```bash
# Using Python (3.x)
python3 -m http.server
```

or with Node.js using `http-server`:

```bash
npx http-server
```

## Prerequisites

A recent version of a web browser is all you need. For running a local server, Python 3 or Node.js is recommended.

## Planned Features

- Multiple tower types with unique abilities
- Wave system with increasing difficulty
- Additional enemy varieties and bosses


## Native Utilities

The `native` directory contains small C programs demonstrating how native tools
can be used alongside the game. There are currently two programs:

* `distance` &ndash; calculates the distance between two points.
* `path_length` &ndash; reads a CSV file of coordinates and sums the length of
  the resulting path.

Compile them with:

```bash
make -C native
```

Run `distance` with four coordinates:

```bash
./native/distance 0 0 3 4
# => 5.000000
```

Run `path_length` using the provided example CSV file:

```bash
./native/path_length native/example_path.csv
# => 9.000000
```
