<template>
  <div class="login-container">
    <h2>Вход в систему</h2>
    <form @submit.prevent="loginUser" class="login-form">
      <!-- Input fields for login -->
      <div class="form-group">
        <label for="email">Электронная почта пользователя:</label>
        <input type="email" id="email" v-model="email" required :class="{ 'error': emailError }">
        <div v-if="emailError" class="error">Введите корректный адрес электронной почты</div>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required :class="{ 'error': passwordError }">
        <div v-if="passwordError" class="error">Введите пароль</div>
      </div>
      <!-- Error message -->
      <div v-if="error" class="error">{{ error }}</div>
      <!-- Login button -->
      <button type="submit" class="login-button">Войти</button>
    </form>
    <!-- Back button -->
    <button @click="goBack" class="back-button">На главную страницу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      error: ''
    };
  },
  methods: {
    loginUser() {
      // Проверяем валидность введенных данных
      this.emailError = !this.validateEmail(this.email);
      this.passwordError = !this.password;

      if (!this.emailError && !this.passwordError) {
        // Подготавливаем данные для отправки на сервер
        const userData = {
          email: this.email,
          password: this.password
        };

        // Отправляем запрос на сервер для аутентификации пользователя
        // В данном случае это просто выводим сообщение в консоль
        console.log('Login form submitted with data:', userData);

        // Переход на другую страницу (например, на домашнюю страницу) после успешной аутентификации
        // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
        // В данном примере просто очищаем поля формы
        this.email = '';
        this.password = '';
      } else {
        // Выводим сообщение об ошибке ввода данных
        this.error = 'Пожалуйста, исправьте ошибки в форме входа';
      }
    },
    goBack() {
      // Переходим на главную страницу
      // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
      console.log('Перенаправлен на главный экран');

      // Пример перехода на главную страницу с использованием маршрутизатора Vue Router
      this.$router.push('/');
    },
    validateEmail(email) {
      // Реализовать функцию для проверки валидности email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
};
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
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #45a049;
}

.back-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #da190b;
}
</style>
