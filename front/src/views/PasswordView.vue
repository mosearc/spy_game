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