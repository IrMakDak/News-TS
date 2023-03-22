import './news.css';
import { IData } from '../../appInterfaces';
import { convertType } from '../../utils/utils';

class News {
    draw(data: ReadonlyArray<IData>) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = convertType<Element>(newsItemTemp.content.cloneNode(true));

            if (idx % 2) convertType<Element>(newsClone.querySelector('.news__item')).classList.add('alt');

            convertType<HTMLElement>(newsClone.querySelector('.news__meta-photo')).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            convertType<Element>(newsClone.querySelector('.news__meta-author')).textContent =
                item.author || item.source.name;
            convertType<Element>(newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            convertType<Element>(newsClone.querySelector('.news__description-title')).textContent = item.title;
            convertType<Element>(newsClone.querySelector('.news__description-source')).textContent = item.source.name;
            convertType<Element>(newsClone.querySelector('.news__description-content')).textContent = item.description;
            convertType<Element>(newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        convertType<Element>(document.querySelector('.news__container')).innerHTML = '';
        convertType<Element>(document.querySelector('.news__container')).appendChild(fragment);
    }
}

export default News;
export { convertType };