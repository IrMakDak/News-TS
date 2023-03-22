interface IData {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
    articles?: ISource[];
    sources?: ISource[];
}

interface ISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

interface INews extends Response {
    articles: ReadonlyArray<IData>;
}
interface ISources extends Response {
    sources: ReadonlyArray<ISource>;
}

export { ISource, IData, INews, ISources };
