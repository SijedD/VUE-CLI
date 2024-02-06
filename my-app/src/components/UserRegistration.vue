<template>
  <div class="registration-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="registerUser" class="registration-form">
      <!-- Input fields for registration -->
      <div class="form-group">
        <label for="username">Никнейм пользователя:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="email">Электронная почта пользователя:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Повторите пароль:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <!-- Error messages -->
      <div v-if="error" class="error">{{ error }}</div>
      <!-- Registration button -->
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
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    };
  },
  methods: {
    registerUser() {
      if (this.password !== this.confirmPassword) {
        this.error = 'Пароли не совпадают';
        return;
      }

      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      // Отправляем запрос на сервер для регистрации пользователя
      // В данном случае это просто выводим сообщение в консоль
      console.log('Registration form submitted with data:', userData);

      // После успешной регистрации можно выполнить какие-либо действия, например, переход на другую страницу
      // Здесь мы просто очищаем поля формы
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';

      // Переход на другую страницу (например, на страницу входа в систему)
      // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
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
  background-color: #4CAF50;
  color: white;
}

.registration-button:hover {
  background-color: #45a049;
}

.back-button {
  background-color: #f44336;
  color: white;
}

.back-button:hover {
  background-color: #da190b;
}
</style>
