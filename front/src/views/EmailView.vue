<script>
import router from "@/router";

export default {
  data(){
    return{
      email: '',

    }
  },
  methods:{
    handleSubmit(){
      console.log(this.email)
      if (this.email) {

        const data = { name: this.email }; // Define your data object

        const submit = async () => {
          try {
            const response = await fetch(process.env.VUE_APP_BACK_PATH + 'emails', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
          } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
          }
        };

        submit(); // Call the async function to send the request
        alert("BRAVO!");
      }
    },
    handleDel(){
      const submit = async () => {
        try {
          const response = await fetch(process.env.VUE_APP_BACK_PATH + 'emails', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            throw new Error('Failed to delete emails');
          }

          alert("Hai eliminato tutte le email");

          // Redirect to the homepage
          await router.push('/');
        } catch (error) {
          console.error('Error:', error);
          alert('C\'è stato un problema durante l\'eliminazione delle email oppure non sono presenti mail nel database :)');
        }
        //submit()
      };
      submit()
    },
    handleStart(){
      const submit = async () => {
        try {
          const response = await fetch(process.env.VUE_APP_BACK_PATH + 'emails', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          // Assuming you need to handle the response data
          const data = await response.json();
          console.log('Fetched data:', data);

          alert("The game should be started!");

        } catch (error) {
          console.error('Error:', error);
          alert('There was a problem starting the game.');
        }
      };
      submit()
    }

  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label>Email:</label>
    <input  type="email" v-model="email">

    <div class="submit">
      <button>JOIN</button>
    </div>
  </form>


  <p> ATTENZIONE: il gioco non funziona se è presente anche solo una mail che non appartiene ad alcun giocatore</p>
  <p> come prima cosa è consigliabile eliminare tutte le email per pulire il database (pulsante rosso), tutti i giocatori devono inserire la propria email per giocare, è possibile inserire tutte le email da un solo dispositivo</p>
  <p> non è possibile elimniare una sola mail dal database, in caso un giocatore smettesse di giocare è necessario eliminare tutte le email e reinserire quelle dei giocatori rimasti</p>
  <p> ATTENZIONE: un SOLO giocatore deve premere il pulsante start per far partire il gioco altrimenti riceverete piu di una mail con messaggi differenti</p>


  <button class="delete" @click="handleDel">DELETE ALL EMAILS</button>
  <button class="start" @click="handleStart">START</button>

</template>

<style scoped>
form{
  max-width: 420px;
  margin: 30px auto;
  background-color: white;
  text-align: center;
  padding: 30px;
  border-radius: 10px;
}
label{
  color: black;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input{
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
button{
  background: #90EE90;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
  color: black;
  border-radius: 20px;
}
.submit{
  text-align: center;
}
.bravo{
  color: darkorange;
  margin-top: 10px;
  font-size: 1.8em;
  font-weight: bold;
}
.delete{
  background: firebrick;
}
.start{
  background: darkgreen;
}

</style>