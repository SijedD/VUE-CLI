<template>
  <div class="login-container">
    <h2>Вход в систему</h2>
    <form @submit.prevent="loginUser" class="login-form">
        <label for="email">Электронная почта пользователя:</label>
        <input type="email" id="email" v-model="email" required >
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required >
      <button type="submit" class="login-button">Войти</button>
    </form>
    <button @click="goBack" class="back-button">На главную страницу</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        auth: true,
        email: '',
        password: '',
        url: 'https://jurapro.bhuser.ru/api-shop'
      };
    },
    methods: {
      async loginUser() {
        const user = {
            email: this.email,
            password: this.password
        };
        const response = await fetch(this.url + '/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const data = await response.json();
        localStorage.setItem('userToken', data.data.user_token);
        console.log('Result:', data);
        this.$router.push('/');
        this.auth = true

      },
      goBack() {
        // Переходим на главную страницу
        this.$router.push('/');
      }
    },
    computed: {
    isAuthenticated() {
      return !!localStorage.getItem('userToken');
    }
  }
  }
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
}

.login-button {
  background-color: fuchsia;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: red;
}

.back-button {
  background-color: fuchsia;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: red;
}
</style>
