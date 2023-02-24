import Loader, { ApiInfo } from './loader';

class AppLoader extends Loader {
    constructor() {
        super(ApiInfo.BASELINK, { apiKey: ApiInfo.KEY });
    }
}

export default AppLoader;
export { ApiInfo };
