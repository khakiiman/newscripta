import { countries, languages, categories, sorts } from "../../constants/index"

export const getParams = (searchParams) => {
    let category = searchParams.get("category")
    let country = searchParams.get("country")
    let q = searchParams.get("q")
    let dateFrom = searchParams.get("dateFrom")
    let dateTo = searchParams.get("dateTo")
    let sortBy = searchParams.get("sortBy")
    let language = searchParams.get("language")
    let pageSize = searchParams.get("pageSize")
    let page = searchParams.get("page")
    let params = {}

    if (q)
        params.q = q
    if (country)
        params.country = countries.find(c => c.id == country)
    if (!!dateFrom && !!dateTo)
        params.dateFrom = dateFrom
        params.dateTo = dateTo
    if (category)
        params.sortBy = categories.find(s => s.id == category)
    if (sortBy)
        params.sortBy = sorts.find(s => s.id == sortBy)
    if (language)
        params.language = languages.find(l => l.id == language)
    if (pageSize)
        params.pageSize = pageSize
    if (page)
        params.from = page

    return params
}

const storeDataInSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

const getDataFromSessionStorage = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}

export { storeDataInSessionStorage, getDataFromSessionStorage }