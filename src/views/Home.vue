<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="hello">
      <button @click="updatePerfil">Atualizar Perfil</button>
      <br>
      <br>
      <button @click="logout">Logout</button>
    <div>
      <p>
        <b>Digite um usuário do github</b>
      </p>
      <input type="text" v-model="userNameGitHub" placeholder="Usuário Github">
      <br>
      <br>
      <button @click="buscarRepoGitByUser">Buscar</button>
      <br>
      <ul v-for="repo in reposByUser" :key="repo.length">
        <li>
          <b>Repositório:</b>
          {{ repo.name }}
        </li>
        <br>
        <li>
          <b>URL:</b>
          {{ repo.url }}
        </li>
        <br>
        <li>
          <b>Estrelas:</b>
          {{ repo.stargazers_count }}
        </li>
        <br>
        <br>
        <br>
      </ul>
      <br>
      <br>
    </div>
  </div>
  </div>
</template>


<script>
import firebase, { functions } from "firebase";
import $ from "jquery";

export default {
  name: "home",
  data() {
    return {
      userNameGitHub: "",
      reposByUser: []
    };
  },
  mounted: function() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      // localStorage.name = user.displayName;

      var endereco = firebase
        .database()
        .ref(`users/` + user.uid)
        .on("value", snapshot => {
          localStorage.endereco = JSON.stringify(snapshot.val());
        });
    }
  },
  methods: {
    buscarRepoGitByUser: function() {
      var listaDeRepositorios = [];
      $.getJSON(
        "https://api.github.com" + "/users/" + this.userNameGitHub + "/repos",
        function(repositorisUsuario) {
          if (repositorisUsuario.message == "Not Found") {
            alert("Erro ao consultar repositorio");
            return;
          }

          if (repositorisUsuario != null) {
            repositorisUsuario.forEach(function(repo) {
              var repo = {
                name: repo.name,
                url: repo.url,
                stargazers_count: repo.stargazers_count
              };

              listaDeRepositorios.push(repo);
            });
          }
        }
      ).fail(function() {
        alert("Usuário não encontrado!");
      });
      this.reposByUser = listaDeRepositorios;
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    updatePerfil: function() {
      this.$router.replace("updateProfile");
    }
  }
};
</script>

 <style scoped>
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
.text-danger {
  position: absolute;
  top: 20px;
  font-size: 12px;
}
</style>