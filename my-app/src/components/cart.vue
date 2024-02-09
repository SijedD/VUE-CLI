
<template>
    <div class="home-container">
      <!-- Кнопки регистрации и авторизации -->
      <div class="auth-buttons" v-if="!isAuthenticated">
        <router-link to="/registration" class="auth-button">Регистрация</router-link>
        <router-link to="/login" class="auth-button" >Авторизация</router-link>
        <router-link to="/" class="auth-button" >Главная</router-link>
        <router-link to="/order" class="auth-button" >Заказы</router-link>
      </div>
      <!-- Никнейм и кнопка выхода -->
      <div v-else class="user-info">
        <button  @click="logout" class="logout-button">Выход</button>
        <router-link to="/" class="auth-button" >Главная</router-link>
        <router-link to="/order" class="auth-button">Заказы</router-link>
      </div>
  
      <div>
        <h1 class="catalog" >Корзина</h1>
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
            <button  @click="deleteProduct(product)" type="submit" class="btn">Удалить из корзины</button>
            <button  @click="addOrders(product)" type="submit" class="btn">Оформить заказ</button>
          </div>
  
        </div>
      </div>
      <div class="popup" v-if="showPopup">
      Товар Удален
    </div>
    <div class="popu" v-if="showPopu">
      Товар Оформлен
    </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'cart',
    data() {
      return {
        url: 'https://jurapro.bhuser.ru/api-shop',
        products: [],
        showPopup: false,
        showPopu: false
      };
    },
    created() {
      this.getProduct();
    },
    methods: {
      // Выход из аккаунта
      logout() {
        localStorage.removeItem('userToken');
        this.$router.push('/');
      },
  
      async getProduct(){
        const localToken = localStorage.getItem('userToken')
        const response = await fetch(this.url + '/cart',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localToken}`
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
  
  
      },
      async deleteProduct(product) {
        const token = localStorage.getItem('userToken');
        if (!token) {
          console.error('Токен пользователя отсутствует.');
          return;
        }
  
        const url = `https://jurapro.bhuser.ru/api-shop/cart/${product.id}`;
        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (response.ok) {
            console.log("Товар успешно удален из корзины");
    
            this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
          }, 3000);
          setTimeout(() => {
            location. reload()
          }, 1000);
          
          

  
          } else {
            console.error("Ошибка удаления товара из корзины:", response.statusText);
          }
        } catch (error) {
          console.error("Ошибка удаления товара из корзины:", error);
        }
      },
      async addOrders(product) {
        const token = localStorage.getItem('userToken');
        if (!token) {
          console.error('Токен пользователя отсутствует.');
          return;
        }
  
        const url = `https://jurapro.bhuser.ru/api-shop/order`;
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (response.ok) {
            console.log("Товар успешно Оформлен");
            this.showPopu = true;
          setTimeout(() => {
            this.showPopu = false;
          }, 3000);
          setTimeout(() => {
            location. reload()
          }, 1000);
  
          } else {
            console.error("Ошибка Оформления:", response.statusText);
          }
        } catch (error) {
          console.error("Ошибка Оформления:", error);
        }
      },
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

  .popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: fuchsia;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 999;
}

.popu {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: fuchsia;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 999;
}
  
  </style>
