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
        // Проверяем, есть ли пользователь с таким же никнеймом или почтой уже зарегистрирован
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          if (userData.username === this.username) {
            // Если пользователь с таким же никнеймом уже зарегистрирован, выводим сообщение об ошибке
            this.error = 'Пользователь с таким никнеймом уже зарегистрирован';
            return; // Прерываем выполнение метода, чтобы избежать сохранения нового пользователя
          }
          if (userData.email === this.email) {
            // Если пользователь с такой же почтой уже зарегистрирован, выводим сообщение об ошибке
            this.error = 'Пользователь с такой почтой уже зарегистрирован';
            return; // Прерываем выполнение метода, чтобы избежать сохранения нового пользователя
          }
        }

        // Сохраняем данные нового пользователя в локальное хранилище
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Очищаем поля формы после регистрации
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        // После успешной регистрации перенаправляем пользователя на страницу авторизации
        this.$router.push('/login');
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
