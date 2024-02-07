<template>
  <div class="home-container">
    <!-- Кнопки регистрации и авторизации -->
    <div class="auth-buttons" v-if="!isLoggedIn">
      <router-link to="/registration" class="auth-button">Регистрация</router-link>
      <router-link to="/login" class="auth-button">Авторизация</router-link>
    </div>
    <!-- Никнейм и кнопка выхода -->
    <div v-else class="user-info">
      <p>Имя пользователя:{{ username }}</p>
      <button @click="logout" class="logout-button">Выход</button>
    </div>

    <h1>Каталог товаров</h1>
    <!-- Список товаров из каталога -->
    <div class="tovar">
    <div class="product" v-for="product in products" :key="product.id">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <!-- Показывать кнопку "Добавить в корзину" только для авторизованных пользователей-клиентов -->
      <button v-if="isClient && isLoggedIn" @click="addToCart(product)" class="add-to-cart-button">Добавить в корзину</button>
    </div>
  </div>

  </div>

  <div class="cart">
    <h2>Корзина</h2>
    <div class="cart-item" v-for="(item, index) in cart" :key="index">
    <li>
      {{item.name}}
      <p>Количество: {{ item.quantity }}</p>
      <div class="item-controls">
        <button @click="incrementItem(index)">+</button>
        <button @click="decrementItem(index)">-</button>
        <button @click="removeItem(index)">Удалить</button>
      </div>
    </li>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'HomeView',
    data() {
      return {
        // Список товаров из каталога
        products: [
          { id: 1, name: 'Товар 1', description: 'Описание товара 1', quantity: 1},
          { id: 2, name: 'Товар 2', description: 'Описание товара 2' , quantity: 1},
          { id: 3, name: 'Товар 3', description: 'Описание товара 3' , quantity: 1},
        ],
        // Статус авторизации пользователя
        isLoggedIn: false,
        // Роль пользователя (для демонстрации)
        role: 'client', // Может быть 'client', 'admin' и т.д.
        // Никнейм пользователя
        username: '',
        cart: []
      };
    },
    computed: {
      // Проверка роли пользователя на клиента
      isClient() {
        return this.role === 'client';
      }
    },
    methods: {
      incrementItem(index) {
        this.cart[index].quantity++;

      },
      decrementItem(index) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--;
        }
      },
      removeItem(index) {
        this.cart.splice(index, 1);
      },
      // Добавление товара в корзину (для демонстрации)
      addToCart(product) {
        this.cart.push(product)
        console.log('Добавлен товар в корзину:', product);
      },
      // Выход из аккаунта
      logout() {
        this.isLoggedIn = false;
        this.username = '';
        console.log('Выход из аккаунта');
      }
    },
    created() {
      // Проверяем, авторизован ли пользователь
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        this.isLoggedIn = true;
        this.username = userData.username;
      }
    }
  };
</script>

<style>
  .cart{
    padding-left: 30px;
    padding-right: 30px;
    position: absolute;
    margin-left: 1300px;
    margin-top: -250px;
    border: 1px solid fuchsia
  }
  body{
    background-color: #42b983;
  }
  .user-info{
    text-align: center;
  }
  .tovar{
    display: flex;
  }
h1{
text-align: center;
}
.home-container {
  max-width: 800px;
  margin: 0 auto;
}

.auth-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.auth-button {
  margin-left: 10px;
  text-decoration: none;
  color: fuchsia;
}

.auth-button:hover {
  text-decoration: underline;
}

.product {
  border: 1px solid fuchsia;
  padding: 10px;
  margin-bottom: 15px;
  margin-left: 50px;
}

.product h3 {
  margin-top: 0;
}

.add-to-cart-button,
.logout-button {
  background-color: fuchsia;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-button:hover,
.logout-button:hover {
  background-color: red;
}

</style>
