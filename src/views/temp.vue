<template>
  <div class="sign-up">
    <p>Vamos criar uma nova conta!</p>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Senha">
    <br>
    <p>Qual seu endereço?</p>
    <input type="text" maxlength="8" pattern="([0-9]{8})" v-model="cep" placeholder="CEP">
    <br>
    <button @click="buscar">Buscar</button>
    <br>
    <br>
    <br>
    <label>Logradouro</label>
    <br>
    <input type="text" v-model="endereco.logradouro">
    <br>
    <label>Número</label>
    <br>
    <input type="number" v-model="endereco.numero">
    <br>
    <label>Complemento</label>
    <br>
    <input type="text" v-model="endereco.complemento">
    <br>
    <label>Bairro</label>
    <br>
    <input type="text" v-model="endereco.bairro">
    <br>
    <label>Cidade</label>
    <br>
    <input type="text" v-model="endereco.localidade">
    <br>
    <label>Estado</label>
    <br>
    <input type="text" v-model="endereco.uf">
    <br>

    <button @click="signUp">Criar conta</button>

    <span>
      ou voltar para
      <router-link to="/login">Login</router-link>.
    </span>
  </div>
</template>

 <script>
import firebase from "firebase";
import $ from "jquery";
import { constants } from "crypto";
export default {
  name: "signUp",
  data: () => {
    return {
      email: "",
      password: "",
      cep: "",
      endereco: {
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: ""
      },
      naoLocalizado: false
    };
  },
  methods: {
    atualizarFormulario: function() {
      this.endereco = JSON.parse(localStorage.endereco);
    },
    signUp: function() {
      if (localStorage.endereco) {
        this.endereco = JSON.parse(localStorage.endereco);
      }

      // validate
      if (
        this.email &&
        this.password &&
        this.endereco.cep &&
        this.endereco.logradouro &&
        this.endereco.numero &&
        this.endereco.bairro &&
        this.endereco.localidade &&
        this.endereco.uf
      ) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            user => {
              console.log(user);
              var userLogado = firebase.auth().currentUser;
              console.log("UID usuário logado: " + userLogado.uid);
              console.log("Endereço atualizado: ", this.endereco);
              firebase
                .database()
                .ref("users/" + userLogado.uid)
                .set(this.endereco);
              console.log(this.endereco.logradouro);
              console.log("Usuário criado e autenticado");
              this.$router.replace("home");
            },
            err => {
              alert("Oops. " + err.message);
            }
          );
      } else {
        if (localStorage.endereco) {
          localStorage.endereco = JSON.stringify(this.endereco);
        }
        alert("Por favor preencha todos os campos ");
      }
    },
    buscar: function() {
      if (this.cep.length == 8) {
        this.naoLocalizado = false;

        if (/^[0-9]{8}$/.test(this.cep)) {
          $.getJSON("https://viacep.com.br/ws/" + this.cep + "/json/", function(
            enderecoRetornado
          ) {
            if (enderecoRetornado.erro) {
              this.endereco = {};
              this.naoLocalizado = true;
              return;
            }
            console.log("Atualizando endereço...");
            console.log("Endereço retornado: ", enderecoRetornado);
            this.endereco = {
              cep: enderecoRetornado.cep,
              logradouro: enderecoRetornado.logradouro,
              numero: "",
              complemento: enderecoRetornado.complemento,
              bairro: enderecoRetornado.bairro,
              localidade: enderecoRetornado.localidade,
              uf: enderecoRetornado.uf
            };
            console.log("Endereço interno atualizado: ", this.endereco);
            localStorage.endereco = JSON.stringify(this.endereco);
            // this.atualizarFormulario()
            setTimeout(function() {
              console.log(JSON.parse(localStorage.endereco));
              this.endereco = JSON.parse(localStorage.endereco);
            }, 3000);
          });
          setTimeout(function() {
            console.log(JSON.parse(localStorage.endereco));
            this.endereco = JSON.parse(localStorage.endereco);
          }, 3000);
        } else {
          alert("Por favor preencher o campo CEP corretamente com 8 números.");
        }
        setTimeout(function() {
          console.log(JSON.parse(localStorage.endereco));
          this.endereco = JSON.parse(localStorage.endereco);
        }, 3000);
        // if (localStorage.endereco) {
        // this.endereco = JSON.parse(localStorage.endereco);
        // } else {
        //     localStorage.endereco = this.endereco;
        // }
      } else {
        alert("Por favor preencher o campo CEP corretamente com 8 números.");
      }
      setTimeout(function() {
        console.log(JSON.parse(localStorage.endereco));
        this.endereco = JSON.parse(localStorage.endereco);
      }, 3000);
      //   this.endereco = JSON.parse(localStorage.endereco);
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
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
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