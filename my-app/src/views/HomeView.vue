
<template>
  <div class="home-container">
    <!-- Кнопки регистрации и авторизации -->
    <div class="auth-buttons" v-if="!isAuthenticated">
      <router-link to="/registration" class="auth-button">Регистрация</router-link>
      <router-link to="/login" class="auth-button" >Авторизация</router-link>
    </div>
    <!-- Никнейм и кнопка выхода -->
    <div v-else class="user-info">
      <button  @click="logout" class="logout-button">Выход</button>
    </div>

    <div>
      <h1 class="catalog" @click="getProduct">Каталог товаров</h1>
      <div class="ag-format-container">
      </div>
      <div class="ag-courses_item" v-for="product in products" :key="product.id">
        
          <div class="ag-courses-item_bg"></div>

          <div class="title">
            Название: {{ product.name }}
          </div>

          <div class="ag-courses-item_date-box">
            <span class="description">
            Описание: {{ product.description }}
          </span>
            <p class="price">
            Цена: {{ product.price }}руб.
          </p>
            <button class="btn" >В корзину</button>
          </div>
        
      </div>
    </div>
  </div>
</template>


<script>
import {auth} from '../components/UserLogin.vue'
  export default {
    name: 'HomeView',
    data() {
      return {
        auth: false,
        products: [],
        username: '',
      };
    },
    methods: {
      // Добавление товара в корзину (для демонстрации)
      addToCart(product) {
        this.cart.push(product)
        console.log('Добавлен товар в корзину:', product);
      },
      // Выход из аккаунта
      logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/');
    },

      async getProduct(){
      const url = "https://jurapro.bhuser.ru/api-shop/products";
      const response = await fetch(url,{
        method: 'GET',
            headers: {
          'Content-Type': 'application/json',
        },

      })
      if (response.ok) {
        const result = await response.json();
        this.products = result.data
        console.log('Result: ', result)
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }


    }
    },
    computed: {
    isAuthenticated() {
      return !!localStorage.getItem('userToken');
    }
  }
  };
</script>

<style>
  .ag-courses_item{
    border: 1px solid fuchsia;
  padding: 10px;
  margin-bottom: 15px;
  margin-left: 50px;
  }
  body{
    background-color: #42b983;
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
