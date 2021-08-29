const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


class List {
    constructor(container, list = textList) {
        this.list = list;
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.init();
    }

    _fetchGoods(url) {
        return fetch(API + url)
            .then(data => data.json())
    }

    handleData(data) {
        this.goods = data;
        this.render();
    }

    render() {
        const htmlBlock = document.querySelector(this.container);

        for (let itemObj of this.goods) {
            let product = new this.list[this.constructor.name](itemObj);

            htmlBlock.insertAdjacentHTML('beforeend', product.render());
            this.allProducts.push(product)
        }
        if(this.constructor.name === 'Cart') this.showAllPrice()
    }

    showAllPrice() {
        let allPrice = document.querySelector('.allPrice');

        if(!this.allProducts.length) {
            allPrice.innerHTML = 'корзина пуста';
            return;
        };

        let sum = 0;
        this.allProducts.forEach(element => {
            sum += element.item.quantity * element.item.price;
        })
        allPrice.innerHTML = `общая стоимость: ${sum}`
    }

    init() {}
}

class Item {
    constructor(item, img = 'https://santehmag.com.ua/image/cache/catalog/import_yml/SD0/003/724/6/no-img-200x200.jpg') {
        this.item = item;
        this.img = img;
    }

    render() {
        return ''
    }
}

class ProductList extends List {
    constructor(container, cart) {
        super(container);
        this.cart = cart;
        this._fetchGoods('/catalogData.json')
            .then(data => {
                this.handleData(data);
            });
    }

    init() {
        let field = document.querySelector(this.container);
        field.addEventListener('click', e => {
            if(!(e.target.className == 'buy-btn' || e.target.className == 'buy-span')) return

            this.cart.addProduct(e.target.closest('div'))


        })


    }
}

class ProductItem extends Item {
    constructor(item, img) {
        super(item, img)
    }
    render() {
        return `<div class="product-item" 
            data-id="${this.item.id_product}"
            data-name="${this.item.product_name}"
            data-price="${this.item.price}">
    <img src="${this.img}" alt="карточка продукта" class="product-item__image">
                <h3>${this.item.product_name}</h3>
                <p>${this.item.price}</p>
                <button class="buy-btn"
                data-id="${this.item.id_product}">
                <span class="buy-span"></span>
                Купить
                </button>
            </div>`
    }
}

class Cart extends List {
    constructor(container = '.cart') {
        super(container);
        this._fetchGoods('/getBasket.json')
            .then(data => {
                this.handleData(data.contents)
            })
    }
    addProduct(el) {
        let finder = this.allProducts.find(element => element.item.id_product === +el.dataset.id);

        if(finder) {
            finder.item.quantity++;
            this.update(finder)
        } else {
            let newProd = {
                id_product: +el.dataset.id,
                price: +el.dataset['price'],
                product_name: el.dataset['name'],
                quantity: 1
            }
            this.goods = [newProd];
            this.render()
        }

    }

    update(obj) {

        let htmlObj = document.querySelector(`.quantity[data-id="${obj.item.id_product}"]`)
        htmlObj.innerHTML = `Количество - ${obj.item.quantity}`;

        let price = document.querySelector(`.price[data-price="${obj.item.id_product}"]`);
        price.innerHTML = `Цена -  ${obj.item.quantity * obj.item.price}`

        this.showAllPrice();
    }

    init() {

        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.className == 'remove-btn') {
                this.removeFunc(e.target)
            }

        })
        document.querySelector('.btn-cart').addEventListener('click', e => {
            let cart = document.querySelector(this.container);
            cart.classList.toggle('invisible')
        })

    }

    removeFunc(target) {
        let find = this.allProducts.find(element => element.item.id_product === +target.dataset.id);

        if(find.item.quantity == 1) {
            this.allProducts.splice(this.allProducts.indexOf(find),1)
            let del = document.querySelector(`.cart-item[data-id="${find.item.id_product}"]`);
            del.remove()
        }
        if(find.item.quantity > 1) {
            find.item.quantity--;
            this.update(find);
        }

        this.showAllPrice();
    }

}

class CartItem extends Item {
    constructor(item) {
        super(item)
    }

    render() {
        return `<div class="cart-item" data-id="${this.item.id_product}">
            <div class = "block-info" data-id="${this.item.id_product}">
                <img src="${this.img}" alt="карточка продукта" class="block-info__image imag">
                        <h3>${this.item.product_name}</h3>
                        <p class="price" data-price="${this.item.id_product}">Цена - ${this.item.price}</p>
                        <p
                        class = "quantity"
                        data-id="${this.item.id_product}">
                        Количество - ${this.item.quantity}
                        </p>
            </div>
            <div class = "block-control">
            <button class="remove-btn" data-id="${this.item.id_product}">&#10060</button>
            </div>
        </div >`
    }
}

const textList = {
    ProductList: ProductItem,
    Cart: CartItem
}

let cer = new Cart();
let toy = new ProductList('.products', cer);
