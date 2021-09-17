# Geo Country Select

Geo Country Select gives you a [react-select](https://react-select.com) dropdown of countries with the user's location pre-selected based on geo IP.

Powered by Cloudflare Workers and KV store!

## Demo

Codesandbox demo: https://codesandbox.io/s/geo-country-select-g6byi?file=/src/App.js
(calls Worker https://geo-country-select.layercode.workers.dev/list/countries?flags=true&value=code)
![Example](example.png)

## How it works

1. We use react-select (but you could use any lib, or even just html) to render the dropdown.
2. List of all countries is fetched from our Worker.
3. Worker gets the country list in JSON from the KV store.
4. Country code of the user's location is fetched from the internal Cloudflare request.cf.country object.
5. List of all contries, plus the user's country is then returned and rendered.

## Setup

### Load country data into Worker KV

1. `wrangler kv:namespace create "COUNTRIES"`
2. Add the binding json to wrangler.toml
3. `wget https://github.com/mledoze/countries/raw/master/countries.json`
4. `wrangler kv:key put --binding=COUNTRIES "all" countries.json --path`
