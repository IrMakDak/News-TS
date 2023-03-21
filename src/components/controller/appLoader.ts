import Loader, { ApiInfo } from './loader';

class AppLoader extends Loader {
    constructor() {
        super(ApiInfo.Baselink, { apiKey: ApiInfo.Key });
    }
}

export default AppLoader;
export { ApiInfo };
