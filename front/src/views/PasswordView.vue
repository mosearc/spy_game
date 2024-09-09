<script>
import router from "@/router";

export default {
  data() {
    return {
      password: '',
      passwordError: '',
      loading: false // Added loading state
    };
  },
  methods: {
    async handleSubmitPW() {
      console.log("email submitted PW");

      if (this.password === 'fabiola') {
        this.passwordError = '';
      } else {
        this.passwordError = 'password errata';
      }

      if (!this.passwordError) {
        this.loading = true; // Start the spinner

        try {
          const response = await fetch(process.env.VUE_APP_BACK_PATH + 'words', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch data');

          }

          // Assuming you need to handle the response data
          const data = await response.json();
          console.log('Fetched data:', data);

          //alert("The game should be started!");

          // Redirect after successful operation
          this.loading = false; // Stop the spinner
          router.push('/email');

        } catch (error) {
          console.error('Error:', error);
          alert('There was a problem starting the game.')
          this.loading = false;
        } finally {

        }
      }
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmitPW">
    <label>PASSWORD:</label>
    <input type="password" v-model="password">

    <div v-if="passwordError" class="error">
      {{ passwordError }}
    </div>

    <div class="submit">
      <button :disabled="loading">
        <div v-if="loading" class="spinner"></div> <!-- Spinner added here -->
        <span v-else>ENTER</span>
      </button>
    </div>

    <p> Tutti i giocatori riceveranno un messaggio via email con un luogo (e allora dovrete trovare chi è la spia)
      oppure con scritto "spy" (e allora dovrai trovare quale luogo è stato inviato agli altri)</p>
    <p> Ogni giocatore (compresa la spia) a turno deve dire qualcosa in relazione al luogo che ha ricevuto, la spia non deve farsi scoprire e deve invece indovinare il luogo.
      Gli altri giocatori devono capire chi è la spia in base alle risposte e devono stare attenti a non rivelare informazioni cruciali del luogo</p>
    <p> Quando qualcuno crede di avere le risposte puo dirlo quando vuole, con la consapevolezza che un errore porterà alla vittoria della "squadra" opposta</p>
    <p>P.S. il caricamento iniziale a volte puo essere piuttosto lungo, grazie per la pazienza :)</p>
  </form>
</template>

<style scoped>
form {
  max-width: 420px;
  margin: 30px auto;
  background-color: white;
  text-align: center;
  padding: 30px;
  border-radius: 10px;
}
label {
  color: black;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
button {
  background: #90EE90;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  color: black;
  border-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
