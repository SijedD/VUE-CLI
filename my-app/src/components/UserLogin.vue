<template>
  <div class="login-container">
    <h2>Вход в систему</h2>
    <form @submit.prevent="loginUser" class="login-form">
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
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit" class="login-button">Войти</button>
    </form>
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
        // Получаем данные пользователя из локального хранилища
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          if (userData.email === this.email && userData.password === this.password) {

            this.$router.push('/'); // Перенаправляем пользователя на главную страницу
          } else {
            this.error = 'Неверные учетные данные';
          }
        } else {
          this.error = 'Пользователь не найден';
        }
      },
      goBack() {
        // Переходим на главную страницу
        this.$router.push('/');
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
