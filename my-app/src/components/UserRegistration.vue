<template>
  <div class="registration-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="registerUser" class="registration-form">
      <div class="form-group">
        <label for="username">ФИО:</label>
        <input type="text" id="username" v-model="fio" required>
      </div>
      <div class="form-group">
        <label for="email">Электронная почта пользователя:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="registration-button">Регистрация</button>
    </form>
    <!-- Back button -->
    <button @click="goBack" class="back-button">На главную страницу</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: 'https://jurapro.bhuser.ru/api-shop',
        fio: '',
        email: '',
        password: '',
      }
    },
    methods: {
      async registerUser() {
        const user = {
          fio: this.fio,
          email: this.email,
          password: this.password
        };

        const response = await fetch(this.url + '/signup', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        this.$router.push('/login');
        console.log('Response:', response);
        const result = await response.json();
        console.log('Result:', result);
      },
      goBack() {
        // Переходим на главную страницу
        // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
        console.log('Перенаправлен на главный экран');

        // Пример перехода на главную страницу с использованием маршрутизатора Vue Router
        this.$router.push('/');
      },
    }
  };
</script>

<style scoped>
.registration-container {
  max-width: 400px;
  margin: 0 auto;
}

.registration-form {
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

.registration-button,
.back-button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.registration-button {
  background-color: fuchsia;
  color: white;
}

.registration-button:hover {
  background-color: red;
}

.back-button {
  background-color: fuchsia;
  color: white;
}

.back-button:hover {
  background-color: red;
}
h2{
  text-align: center;
}
</style>
