import {createStore} from 'vuex';


export const store = createStore({
    state: {
        products: [], // {name, price, count, group}
        groups: [],
        cart: [],
        exchangeRate: 75
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
        ADD_TO_CART(state, product) {
            const cartItem = state.cart.find(item => item.name === product.name);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        REMOVE_FROM_CART(state, productName) {
            const index = state.cart.findIndex(item => item.name === productName);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        SET_EXCHANGE_RATE(state, rate) {
            state.exchangeRate = rate;
        },
    },
    actions: {
        fetchProducts({ commit }) {
            console.log(commit)
            fetch('/data.json')
                .then(response => response.json())
                .then(data => {
                    fetch('/names.json')
                        .then(response => response.json())
                        .then(names => {
                            const products = data.Value.Goods.map(good => ({name: names[good.G].B[good.T].N, price: good.C, count: good.P, group: names[good.G].G}));
                            const groups = [];
                            for (const group in names) {
                                groups.push({name: names[group].G, visible:false})
                            }
                            commit('SET_PRODUCTS', products);
                            commit('SET_GROUPS', groups);
                        });
                });
        },
        updateExchangeRate({ commit }) {
            const newRate = Math.floor(Math.random() * (80 - 20 + 1)) + 20; // случайный курс от 20 до 80
            commit('SET_EXCHANGE_RATE', newRate);
        }
    },
});