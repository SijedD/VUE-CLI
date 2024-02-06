<template>
  <div class="home-container">
    <!-- Кнопки регистрации и авторизации -->
    <div class="auth-buttons">
      <router-link to="/registration" class="auth-button">Регистрация</router-link>
      <router-link to="/login" class="auth-button">Авторизация</router-link>
    </div>
    <h1>Каталог товаров</h1>
    <!-- Список товаров из каталога -->
    <div class="product" v-for="product in products" :key="product.id">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <!-- Показывать кнопку "Добавить в корзину" только для авторизованных пользователей-клиентов -->
      <button v-if="isClient" @click="addToCart(product)" class="add-to-cart-button">Добавить в корзину</button>
    </div>
    <!-- Элементы интерфейса в зависимости от роли пользователя -->
    <div v-if="isLoggedIn" class="user-links">
      <!-- Ссылка на выход из аккаунта -->
      <button @click="logout" class="logout-button">Выход</button>
      <!-- Ссылка на просмотр ранее оформленных заказов -->
      <router-link to="/orders" class="orders-link">Мои заказы</router-link>
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
        { id: 1, name: 'Товар 1', description: 'Описание товара 1' },
        { id: 2, name: 'Товар 2', description: 'Описание товара 2' },
        { id: 3, name: 'Товар 3', description: 'Описание товара 3' },
      ],
      // Статус авторизации пользователя (для демонстрации)
      isLoggedIn: false,
      // Роль пользователя (для демонстрации)
      role: 'client', // Может быть 'client', 'admin' и т.д.
    };
  },
  computed: {
    // Проверка роли пользователя на клиента
    isClient() {
      return this.role === 'client';
    }
  },
  methods: {
    // Добавление товара в корзину (для демонстрации)
    addToCart(product) {
      console.log('Добавлен товар в корзину:', product);
    },
    // Выход из аккаунта (для демонстрации)
    logout() {
      this.isLoggedIn = false;
      console.log('Выход из аккаунта');
    }
  }
};
</script>

<style>
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
  color: #007bff;
}

.auth-button:hover {
  text-decoration: underline;
}

.product {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
}

.product h3 {
  margin-top: 0;
}

.add-to-cart-button,
.logout-button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-button:hover,
.logout-button:hover {
  background-color: #45a049;
}

.orders-link {
  text-decoration: none;
  color: #007bff;
}

.orders-link:hover {
  text-decoration: underline;
}

.user-links {
  margin-top: 20px;
}
</style>