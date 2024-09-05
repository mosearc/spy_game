<script>
import router from "@/router";
import axios from 'axios';

export default {
  data(){
    return{
      email: '',
      contents: [],

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
    handleList(){
      const submit = async () => {

        await axios.get(process.env.VUE_APP_BACK_PATH + "emails", {

        }).then((res) => {
          this.contents = res.data;
          console.log(res.data)
        }).catch((err)=>{
          if (err.response.status !== 404)
            alert(err)
        })

      }

      submit();
      console.log(this.contents);
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

          this.contents = []

          alert("Hai eliminato tutte le email");

          // Redirect to the homepage

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
          const response = await fetch(process.env.VUE_APP_BACK_PATH + 'emails/send', {
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
  <div class="container">
  <form class="my-form" @submit.prevent="handleSubmit(); handleList();">
    <label>Email:</label>
    <input  type="email" v-model="email">

    <div class="submit">
      <button>JOIN</button>
    </div>
  </form>

    <div>
      <ul class="list-container">
        <li v-for="(content, index) in contents" :key="content">{{content}}
          <hr v-if="index !== contents.length - 1">
        </li>
      </ul>
      <button class="players" @click="handleList">GET PLAYERS</button>
    </div>

  </div>


  <p> ATTENZIONE: il gioco non funziona se è presente anche solo una mail che non appartiene ad alcun giocatore</p>
  <p> come prima cosa è consigliabile eliminare tutte le email per pulire il database (pulsante rosso), tutti i giocatori devono inserire la propria email per giocare, è possibile inserire tutte le email da un solo dispositivo</p>
  <p> non è possibile elimniare una sola mail dal database, in caso un giocatore smettesse di giocare è necessario eliminare tutte le email e reinserire quelle dei giocatori rimasti</p>



  <button class="delete" @click="handleDel()">DELETE ALL EMAILS</button>
  <button class="start" @click="handleStart">START</button>



</template>

<style scoped>

/* Contenitore Flex che mette form e lista fianco a fianco */
.container {
  display: flex;
  gap: 20px;          /* Spazio tra il form e il riquadro della lista */
  justify-content: space-between; /* Allinea gli elementi in orizzontale */
  max-width: 1000px;  /* Imposta la larghezza massima del layout */
  margin: 20px auto;  /* Centra il layout orizzontalmente */
}

@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Gli elementi saranno impilati verticalmente su schermi più piccoli */
  }
}


form{
  flex: 1;            /* Occupa 1 parte del layout */
  display: flex;
  flex-direction: column;
  max-width: 400px;   /* Limita la larghezza massima del form */
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
  margin-top: 10px;
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
  margin-bottom: 10px;
}
.delete:hover {
  background-color: darkred;   /* Colore più scuro al passaggio del mouse */
}
.start{
  background: darkgreen;
  color: white;
  margin-bottom: 10px;
}
.start:hover {
  background-color: #45a049;   /* Colore più scuro al passaggio del mouse */
}
.players{
  margin-bottom: 10px;
}
.list-container {
  flex: 1;
  border: 2px solid black; /* Bordo verde */
  padding: 10px;              /* Spazio interno */
  border-radius: 8px;          /* Angoli arrotondati */
  max-width: 300px;            /* Larghezza massima del riquadro */
  margin: 20px auto;           /* Centra il riquadro */
  background-color: #f9f9f9;   /* Colore di sfondo */
}

.list-container ul {
  padding: 0;
  margin: 0;
}

.list-container li {
  list-style-type: none;       /* Rimuovi i punti elenco */
  padding: 5px 0;              /* Spazio tra gli elementi della lista */
  font-family: Arial, sans-serif;
  font-size: 10px;
}

.list-container hr {
  border: 0;
  border-top: 1px solid #ddd; /* Linea separatrice grigia */
  margin: 10px 0;
}

.players {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.players:hover {
  background-color: #45a049;   /* Colore più scuro al passaggio del mouse */
}


</style>