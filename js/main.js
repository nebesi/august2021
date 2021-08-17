const defaultImage = "https://santehmag.com.ua/image/cache/catalog/import_yml/SD0/003/724/6/no-img-200x200.jpg"

const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];


const renderProduct = item => {
    return `<div class="product-item">
    <img src="${defaultImage}" alt="карточка продукта" class="product-item__image">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="buy-btn">
                <span></span>
                Купить
                </button>
            </div>`

};
const renderPage = (list = []) => {
    list.forEach(element => {
        document.querySelector('.products').insertAdjacentHTML('beforeend', renderProduct(element))
    })
};


//переписал renderPage так, чтобы исключить появление запятой. 
//метод innerHtml брал элементы массива с версткой, включая запятые массива, добавлял разметку на страницу.
//можно было бы привести массив к строке с помощью метода join(указать разделитель '') затем через innerHtml поместить код на страницу
renderPage(products);
