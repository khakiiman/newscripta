import newsItemModel from '../../models/newsItem';

const transformNYTimesToModel = (articles) => {
    return articles.map(article => ({
        ...newsItemModel,
        source: article.source || article.source.name || 'Unknown',
        publishedAt: article.published_date || article.publishedAt || '',
        title: article.title || '',
        description: article.description || '',
        url: article.url || '',
        author: article.byline || 'Unknown',
        imageUrl: article.media[0]["media-metadata"][2].url || '',
    }));
}

const transformNewsAPIToModel = (articles) => {
    return articles.map(article => ({
        ...newsItemModel,
        source: article.source.name || article.source || 'Unknown',
        publishedAt: article.publishedAt || '',
        title: article.title || '',
        description: article.description || '',
        url: article.url || '',
        author: article.author || 'Unknown',
        imageUrl: article.urlToImage || ''
    }));
}

const transformOpenNewsToModel = (articles) => {
    return articles.map(article => ({
        ...newsItemModel,
        source: article.source.name || article.source || 'Unknown',
        publishedAt: article.publishedAt || '',
        title: article.title || '',
        description: article.description || '',
        url: article.url || '',
        author: article.author || 'Unknown',
    }));
}


const transformGuardianToModel = (articles) => {
    return articles.map(article => ({
        ...newsItemModel,
        source: article.source.name || article.source || 'Unknown',
        publishedAt: article.publishedAt || '',
        title: article.title || '',
        description: article.description || '',
        url: article.url || '',
        author: article.author || 'Unknown',
    }));
}

const transformNewsCredToModel = (articles) => {
    return articles.map(article => ({
        ...newsItemModel,
        source: article.source.name || article.source || 'Unknown',
        publishedAt: article.publishedAt || '',
        title: article.title || '',
        description: article.description || '',
        url: article.url || '',
        author: article.author || 'Unknown',
    }));
}

const transformBBCNewsToModel = (articles) => {
    return articles.map(article => ({
        ...newsItemModel,
        source: article.source.name || article.source || 'Unknown',
        publishedAt: article.publishedAt || '',
        title: article.title || '',
        description: article.description || '',
        url: article.url || '',
        author: article.author || 'Unknown',
    }));
}

export {
    transformNYTimesToModel,
    transformNewsAPIToModel,
    transformGuardianToModel,
    transformOpenNewsToModel,
    transformNewsCredToModel,
    transformBBCNewsToModel,
};