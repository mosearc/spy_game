<script>
import router from "@/router";

export default {
  data(){
    return{
      password: '',
      passwordError:''
    }
  },
  methods:{
    handleSubmitPW(){
      console.log("emialsubmittedPW")

      if(this.password==='fabiola'){
        this.passwordError = ''
      }else{
        this.passwordError = 'password errata'
      }

      if(!this.passwordError){
        router.push('/email')
      }
    }
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmitPW">
    <label>PASSWORD:</label>
    <input type="password" v-model="password">

    <div v-if = "passwordError" class="error">
      {{passwordError}}
    </div>

    <div class="submit">
      <button>ENTER</button>
    </div>

    <p> Tutti i giocatori riceveranno un messaggio via email con un luogo (e allora dovrete trovare chi è la spia)
      oppure con scritto "spy" (e allora dovrai trovare quale luogo è stato inviato agli altri)</p>
    <p> Ogni giocatore (compresa la spia) a turno deve dire qualcosa in relazione al luogo che ha ricevuto, la spia non deve farsi scoprire e deve invece indovinare il lugo.
     Gli altri giocatori devono capire chi è la spia in base alle risposte e devono stare attenti a non rivelare informazioni cruciali del lugo</p>
    <p> Quando qualcuno crede di avere le risposte puo dirlo quando vuole, con la consapevolezza che un errore porterà alla vittoria della "squadra" opposta</p>

  </form>

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
  color: black;
  border-radius: 20px;
}
.submit{
  text-align: center;
}
.error{
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

</style>