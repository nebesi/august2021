class CartItem {
    //тут будет разметка для товара
    //тут будут кнопки повышения и уменьшения количества товара
}

class Cart {
    //сюда тоже будут приходить ответы с сервера
    //будут попадать товары
    //инициализация кнопок корзины
    //будет прорисовка товаров корзины
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        this.goodsList()
    }

    //метод с обработчиком событий для добавления товара по клику
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

    goodsList() {
        let sum = 0;

        sum = this.goods.reduce((sum, cur) => sum + cur.price, 0);

        console.log(`общая цена за все товары - ${sum}`)
    }
}

class ProductItem {
    constructor(product, img = 'https://santehmag.com.ua/image/cache/catalog/import_yml/SD0/003/724/6/no-img-200x200.jpg') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
    <img src="${this.img}" alt="карточка продукта" class="product-item__image">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">
                <span></span>
                Купить
                </button>
            </div>`
    }
}




let list = new ProductList();
