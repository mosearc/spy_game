<template>

  <router-view/>
  <footer>
    <p>Made by @mosearc</p>
  </footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
footer {
  padding: 20px;
  text-align: center;
  width: 100%;
  background-color: black;
  color: white;
  margin-top: auto;
}
</style>
