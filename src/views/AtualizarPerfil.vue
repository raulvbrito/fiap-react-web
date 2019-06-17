<template>
  <div class="sign-up">
    <p>Atualize seu nome completo</p>
    <input type="text" v-model="displayName" placeholder="Nome de usuário">
    <br>
    <button @click="updateProfileUser">Atualizar Perfil</button>
    <br>
    <br>
    <button @click="backToHome">Voltar</button>
  </div>
</template>

 <script>
import firebase from "firebase";
import $ from "jquery";
export default {
  name: "updateProfile",
  data() {
    return {
      displayName: ""
    };
  },
  methods: {
    updateProfileUser: function() {
      var userLogado = firebase.auth().currentUser;
      localStorage.name = this.displayName;
      userLogado
        .updateProfile({
          displayName: this.displayName
        })
        .then(function() {
          console.log("Nome do usuário atualizado com sucesso!");
        });
      this.$router.replace("home");
    },
    backToHome: function() {
      this.$router.replace("home");
    }
  }
};
</script>

 <style scoped>
.sign-up {
  margin-top: 40px;
}
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