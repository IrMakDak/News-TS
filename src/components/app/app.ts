import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISources, INews } from '../appInterfaces';

class App {
    controller: InstanceType<typeof AppController>;
    view: InstanceType<typeof AppView>;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as Element).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: Partial<INews>) => this.view.drawNews(data))
        );
        this.controller.getSources((data: Partial<ISources>) => this.view.drawSources(data));
    }
}

export default App;
