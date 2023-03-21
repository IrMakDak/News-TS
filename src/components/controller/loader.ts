import { ISources, INews } from '../appInterfaces';

enum ResponseStatus {
    Unauthorized = 401,
    NotFound  = 404
}

enum ApiInfo {
    Baselink = 'https://newsapi.org/v2/',
    Key = '1a41f19ed9984f29934d5cb6fb092b66',
}
type TOptionKey = { apiKey: ApiInfo.Key };

enum EndpointNames {
    Sources = 'sources',
    Everything = 'everything',
}
type TEndpoint = EndpointNames.Sources | EndpointNames.Everything;

enum Methods {
    GET = 'GET',
    POST = 'POST',
}
type TMethod = Methods.GET | Methods.POST;

type TOptions = TOptionKey | {};

interface IResp {
    endpoint: EndpointNames.Sources | EndpointNames.Everything;
    options?: TOptions
}

class Loader {
    private baseLink: ApiInfo.Baselink;
    protected options: TOptionKey;
    constructor(baseLink: ApiInfo.Baselink, options: TOptionKey) {
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
            if (res.status === ResponseStatus.Unauthorized || res.status === ResponseStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: TOptions, endpoint: TEndpoint) {
        const urlOptions: TOptions = { ...this.options, ...options };
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
        options: TOptions = {}
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
