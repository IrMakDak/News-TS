import News from './news/news';
import Sources from './sources/sources';
import { INews, ISources } from '../appInterfaces';

export class AppView {
    news: InstanceType<typeof News>;
    sources: InstanceType<typeof Sources>;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Partial<INews>) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Partial<ISources>) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
