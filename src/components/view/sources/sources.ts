import './sources.css';
import { convertType } from '../news/news';
import { ISource } from '../../appInterfaces';

class Sources {
    draw(data: ReadonlyArray<ISource>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = convertType<HTMLTemplateElement>(document.querySelector('#sourceItemTemp'));

        data.forEach((item) => {
            let sourceClone = convertType<Element>(sourceItemTemp.content.cloneNode(true));

            let dataItemName = convertType<Element>(sourceClone.querySelector('.source__item-name'));
            let dataItem = convertType<Element>(sourceClone.querySelector('.source__item'));

            dataItemName.textContent = item.name;
            dataItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        convertType<Element>(document.querySelector('.sources')).append(fragment);
    }
}

export default Sources;
