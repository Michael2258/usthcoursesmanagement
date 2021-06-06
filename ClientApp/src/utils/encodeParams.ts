export default (params: any) => {
  return Object.keys(params)
    .filter((key) => params[key] || params[key] === 0 || params[key] === false)
    .map((key) => {
      if (Array.isArray(params[key])) {
        return params[key]
          .map(
            (i: any) => `${encodeURIComponent(key)}=${encodeURIComponent(i)}`
          )
          .join("&")
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    })
    .join("&")
}
