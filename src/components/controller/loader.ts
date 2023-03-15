import { ISources, INews } from '../appInterfaces';

enum ApiInfo {
    BASELINK = 'https://newsapi.org/v2/',
    KEY = '1a41f19ed9984f29934d5cb6fb092b66',
}
type TOptionKey = { apiKey: ApiInfo.KEY };

enum EndpointNames {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}
type TEndpoint = EndpointNames.SOURCES | EndpointNames.EVERYTHING;

enum Methods {
    GET = 'GET',
    POST = 'POST',
}
type TMethod = Methods.GET | Methods.POST;

interface IResp {
    endpoint: EndpointNames.SOURCES | EndpointNames.EVERYTHING;
    options?: TOptionKey | {};
}

class Loader {
    private baseLink: ApiInfo.BASELINK;
    protected options: TOptionKey;
    constructor(baseLink: ApiInfo.BASELINK, options: TOptionKey) {
        this.baseLink = baseLink;
        this.options = options;
    }
    protected getResp(
        { endpoint, options = {} }: IResp,
        callback = (data: INews | ISources): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(Methods.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: object, endpoint: TEndpoint) {
        const urlOptions: object = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        const keys = Object.keys(urlOptions);
        keys.forEach((key) => {
            url += `${key}=${urlOptions[key as keyof object]}&`;
        });
        return url.slice(0, -1);
    }

    protected load(
        method: TMethod,
        endpoint: TEndpoint,
        callback: (data: INews | ISources) => void,
        options = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
export { ApiInfo, EndpointNames, TEndpoint };
