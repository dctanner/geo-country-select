const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
  'content-type': 'application/json;charset=UTF-8'
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: HEADERS,
    status: status
  })
}
async function handleRequest(request) {
  const { searchParams, pathname } = new URL(request.url)
  switch (pathname) {
    case '/list/countries': {
      const allCountries = await COUNTRIES.get("all", { type: "json" })
      let responseData = {}
      responseData.userCountryCode = request.cf.country
      const valueOption = searchParams.get('value') || "code"
      const flagOption = searchParams.get('flags') || "false"
      responseData.countries = allCountries.map(country => {
        return {
          value: valueOption === "name" ? country.name.common : country.cca2,
          label: flagOption === "true" ? country.flag + ' ' + country.name.common : country.name.common
        }
      })
      responseData.userSelectValue = allCountries.filter(country => country.cca2 === request.cf.country).map(country => {
        return {
          value: valueOption === "name" ? country.name.common : country.cca2,
          label: flagOption === "true" ? country.flag + ' ' + country.name.common : country.name.common
        }
      })[0]
      return jsonResponse(responseData)
    }
  }
}
