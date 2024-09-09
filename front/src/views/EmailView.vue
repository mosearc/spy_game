<script>
import router from "@/router";
import axios from 'axios';

export default {
  data(){
    return{
      email: '',
      code: '',
      contents: [],
      intervalId: null,  // Per memorizzare l'ID dell'intervallo
      codeDisabled: false,
      selectedOption: null

    }
  },
  methods:{
    handleSubmit(){
      console.log(this.email)
      console.log(this.code)
      if (this.email) {

        const data = { name: this.email, code: this.code }; // Define your data object

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
            alert("BRAVO!");
            this.codeDisabled = true
            this.handleList()
          } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            alert("NO! CODICE GIA IN USO");
          }
        };

        // const runSubmit = async () => {
        //   await submit(); // Wait for submit to complete
        //   console.log("bravo!");
        //   alert("BRAVO!"); // This will only run after the submit() completes
        // };
        //
        // runSubmit(); // Call the wrapper function to submit and wait


        submit(); // Call the async function to send the request
        console.log("bravo!")

      }
    },

    handleList(){

      // const submit = async () => {
      //
      //   await axios.get(process.env.VUE_APP_BACK_PATH + "emails", {
      //
      //   }).then((res) => {
      //     this.contents = res.data;
      //     console.log(res.data)
      //   }).catch((err)=>{
      //     if (err.response.status !== 404)
      //       //alert(err)
      //       this.contents = []
      //       console.log(err);
      //   })
      //
      // }

      const submit = async () => {
        try {
          const response = await fetch(process.env.VUE_APP_BACK_PATH + "emails/" + this.code, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            // Handle non-404 errors
            if (response.status !== 404) {
              throw new Error(`Error: ${response.statusText}`);
            }
            this.contents = [];
            console.log(`Error: ${response.statusText}`);
          } else {
            // Parse response as JSON
            const data = await response.json();
            this.contents = data;
            console.log(data);
          }

        } catch (err) {
          // Log and handle errors here
          console.error('Fetch error:', err);
          this.contents = [];
        }
      };

      submit();
      console.log(this.contents);
    },

    handleDel(){
      const submit = async () => {
        try {
          if (!this.code) {
            alert("Seleziona un numero prima di eliminare");
            return;
          }

          const response = await fetch(process.env.VUE_APP_BACK_PATH + 'emails/' + this.code, {
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
          //alert('C\'è stato un problema durante l\'eliminazione delle email oppure non sono presenti mail nel database :)');
        }
        //submit()
      };
      submit()
    },


    handleStart(){
      const submit = async () => {
        try {
          let response;

          if(this.selectedOption === '1') {
            response = await fetch(process.env.VUE_APP_BACK_PATH + 'emails/sendLuogo/' + this.code, {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
            });
          } else if (this.selectedOption === '2') {
            response = await fetch(process.env.VUE_APP_BACK_PATH + 'emails/sendPersona/' + this.code, {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
            });
          }

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          // Assuming you need to handle the response data
          const data = await response.json();
          console.log('Fetched data:', data);

          alert("The game should be started!");

        } catch (error) {
          console.error('Error:', error);
          if(this.selectedOption === null){
            alert('seleziona la categoria!')
          }else if(this.code === ''){
            alert('inserisci il codice partita!')
          }else{
            alert('There was a problem starting the game.');
          }

        }
      };
      submit()
    },

    startPolling() {
      this.handleList(); // Esegui subito la prima chiamata
      this.intervalId = setInterval(() => {
        this.handleList(); // Richiama la funzione ogni 30 secondi
      }, 20000); // 20 secondi
    }

  },
  mounted() {
    this.startPolling(); // Avvia il polling quando il componente è montato
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Cancella l'intervallo quando il componente viene distrutto
    }
  }
}

</script>

<template>
  <div class="container">

      <form class="my-form" @submit.prevent="handleSubmit(); handleList()">
        <label>Email:</label>
        <input type="email" v-model="email" />
        <label>Codice Partita:</label>
        <input type="code" v-model="code" :disabled="codeDisabled"/>

        <div class="submit">
          <button type="submit">JOIN</button>
        </div>
      </form>

      <div>
        <ul class="list-container">
          <li v-for="(content, index) in contents" :key="content">{{content}}
            <hr v-if="index !== contents.length - 1">
          </li>
        </ul>
        <button class="players" @click="handleList">PLAYER LIST</button>
      </div>

    <div class="category">
      <h3>Seleziona una categoria</h3>
      <label>
        <input type="radio" name="option" v-model="selectedOption" value="1">
        Luoghi
      </label>
      <label>
        <input type="radio" name="option" v-model="selectedOption" value="2">
        Persone Famose
      </label>
    </div>

  </div>

  <button class="delete" @click="handleDel()">DELETE ALL EMAILS</button>
  <button class="start" @click="handleStart">START</button>

  <p> ATTENZIONE: il gioco non funziona se nella partita è presente anche solo una mail che non appartiene ad alcun giocatore</p>
  <p> tutti i giocatori devono inserire la propria email per giocare, il codice partita deve essere uguale per tutti i giocatori, è possibile inserire tutte le email da un solo dispositivo</p>
  <p> non è possibile eliminare una sola mail dal database, in caso un giocatore smettesse di giocare è necessario eliminare tutte le email (o creare una nuova partita con un nuovo codice) e reinserire quelle dei giocatori rimasti</p>
  <p> per iniziare la partita o eliminare tutte le mail dalla partita è necessario che sia presente il relativo codice </p>
  <p> la lista dei giocatori si aggiorna ogni 20 secondi, volendo è possibile aggiornarla subito premendo il pulsante "player list"</p>

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
button:hover{
  background-color: #42b983;
}

.submit{
  text-align: center;
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

.category{
  flex: 1;
  display: flex;
  flex-direction: column;

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
  background-color: #90EE90;
  color: black;
  border: none;
  cursor: pointer;
}

.players:hover {
  background-color: #42b983;   /* Colore più scuro al passaggio del mouse */
}

.category {
  font-size: 0.8em; /* Riduce la dimensione del testo per tutto il contenuto della categoria */
}

.category h3 {
  font-size: 1em; /* Riduce la dimensione del titolo, puoi regolare questo valore */
  margin-bottom: 10px; /* Spazio tra il titolo e le etichette */
}

.category label {
  font-size: 0.7em; /* Riduce ulteriormente la dimensione del testo per le etichette */
  display: block; /* Assicura che le etichette siano disposte in una colonna */
  margin-bottom: 5px; /* Spazio tra le etichette */
}

.category input[type="radio"] {
  margin-right: 5px; /* Spazio tra il radio button e il testo */
}






</style>