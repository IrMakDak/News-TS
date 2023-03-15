import AppLoader from './appLoader';
import { INews, ISources } from '../appInterfaces';
import { convertType } from '../view/news/news';

enum EndpointNames {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}
class AppController extends AppLoader {
    public getSources(callback: (data: Partial<ISources>) => void): void {
        super.getResp({ endpoint: EndpointNames.SOURCES }, callback);
    }

    public getNews(e: Event, callback: (data: Partial<INews>) => void) {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: EndpointNames.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = convertType<Element>(target.parentNode);
        }
    }
}

export default AppController;
