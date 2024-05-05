import axios from "axios";
import { formatParamsForApi } from "../helper/index";
import {
    transformNYTimesToModel,
    transformNewsAPIToModel,
    transformGuardianToModel,
    transformOpenNewsToModel,
    transformNewsCredToModel,
    transformBBCNewsToModel
} from '../api/newsItemTransformer';


const newsBaseUrl = import.meta.env.VITE_NEWSAPI_URL;
const newsApiKey = import.meta.env.VITE_NEWSAPI_KEY;

const nytBaseUrl = import.meta.env.VITE_NYTIMES_URL;
const nytApiKey = import.meta.env.VITE_NYTIMES_KEY;

const gnBaseUrl = import.meta.env.VITE_GNEWS_URL;
const gnApiKey = import.meta.env.VITE_GNEWS_KEY;

export async function getLatestNews() {
    let reqOptions = {
        url: `${newsBaseUrl}/v2/top-headlines?country=us&apiKey=${newsApiKey}`,
        method: "GET",
    }
    try {
        const response = await axios.request(reqOptions)
        return response.data
    } catch (e) {
        return { error: "internal server error" }
    }
}

export async function getNewsByCategory(category) {
    let reqOptions = {
        url: `${newsBaseUrl}/v2/top-headlines?country=us&category=${category}&apiKey=${newsApiKey}`,
        method: "GET",
    }
    try {
        const response = await axios.request(reqOptions)
        return response.data;
    } catch (e) {
        return { error: "internal server error" }
    }
}

export async function getSearchResults(searchParams) {
    let params = formatParamsForApi(searchParams);
    params.apiKey = newsApiKey

    let reqOptions = {
        url: `${newsBaseUrl}/v2/everything`,
        method: "GET",
        params,
    }

    try {
        const response = await axios.request(reqOptions)
        return { ...response.data, params }
    } catch (e) {
        return { error: "internal server error" }
    }
}

export async function getMostPopularNews() {
    let reqOptions = {
        url: `${nytBaseUrl}/mostpopular/v2/viewed/1.json?api-key=${nytApiKey}`,
        method: "GET",
    }
    const response = await axios.request(reqOptions);
    return response.data.results;
}

export async function getTopStories() {
    let reqOptions = {
        url: `${nytBaseUrl}/topstories/v2/world.json?api-key=${nytApiKey}`,
        method: "GET",
    }
    const response = await axios.request(reqOptions);
    return response.data;
}

export async function getFeedSection(section) {
    let reqOptions = {
        url: `${gnBaseUrl}/${section}?api-key=${gnApiKey}&show-elements=image`,
        method: "GET",
    }
    const response = await axios.request(reqOptions);
    return response.data;
}

export async function getSections() {
    console.log("in the sections");
    let reqOptions = {
        url: `${gnBaseUrl}/sections?api-key=${gnApiKey}&show-elements=image`,
        method: "GET",
    }
    const response = await axios.request(reqOptions);
    return response.data.response.results.map((result => {
        return {
            title: result.webTitle,
            id: result.id
        }
    }));
}