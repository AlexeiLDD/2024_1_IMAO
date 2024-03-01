'use strict'

export class MakeTree{
    /**
     * Функция, разворачивающая элементы HTML на страницу из конфига
     * @param {HTMLElement} parent Родительский элеент, куда помещаются элементы
     * @param {object} config Конфиг с описанием элементов HTML
     */
    makeTree(parent, event, config) {
        for (const child in config) {
            const element = document.createElement(config[child].tagName);

            for (const property in config[child]) {

                if (
                    typeof property != 'object' &&
                    property != "tagName"
                    ){
                    element[property] = config[child][property];
                    continue
                }

                this.makeTree(element, event, config[child]);
            }

            parent.appendChild(element)

            element.addEventListener('click', (ev) => {
            
                event(element, config)
            });
        }
    }

}