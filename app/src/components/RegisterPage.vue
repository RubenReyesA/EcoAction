<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["registerTitle"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="container2">
        <img
          class="loginImage"
          src="../../public/assets/images/registerImage.jpg"
        />

        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-subtitle>{{
              messages[idioma]["nameTitle"]
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-input
              v-model="name"
              slot="end"
              type="text"
              class="inputBar"
            ></ion-input>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-subtitle>{{
              messages[idioma]["surnameTitle"]
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-input
              v-model="surname"
              slot="end"
              type="text"
              class="inputBar"
            ></ion-input>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <div class="container1_1">
              <ion-card-subtitle>{{
                messages[idioma]["identifierTitle"]
              }}</ion-card-subtitle>
              <ion-buttons>
                <ion-button @click="showIDDetails">
                  <ion-icon
                    slot="icon-only"
                    :icon="informationCircleOutline"
                  ></ion-icon>
                </ion-button>
              </ion-buttons>
            </div>
          </ion-card-header>
          <ion-card-content>
            <ion-input
              v-model="identifier"
              slot="end"
              type="text"
              class="inputBar"
            ></ion-input>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-subtitle>{{
              messages[idioma]["mailTitle"]
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-input
              v-model="mail"
              slot="end"
              type="email"
              class="inputBar"
            ></ion-input>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <div class="container1_1">
              <ion-card-subtitle>{{
                messages[idioma]["passwordTitle"]
              }}</ion-card-subtitle>
              <ion-buttons>
                <ion-button @click="showPassDetails">
                  <ion-icon
                    slot="icon-only"
                    :icon="informationCircleOutline"
                  ></ion-icon>
                </ion-button>
              </ion-buttons>
            </div>
          </ion-card-header>
          <ion-card-content>
            <ion-input
              v-model="password"
              slot="end"
              type="password"
              class="inputBar"
            ></ion-input>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-subtitle>{{
              messages[idioma]["confirmPasswordTitle"]
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-input
              v-model="password2"
              slot="end"
              type="password"
              class="inputBar"
            ></ion-input>
          </ion-card-content>
        </ion-card>

        <ion-card
          class="btnCard3 ion-activatable"
          @click="startRegister"
          color="cyan"
        >
          <ion-card-content>
            <ion-ripple-effect></ion-ripple-effect>
            <h1 class="btnLabels2 useLondrina">
              {{ messages[idioma]["registerTitle"] }}
            </h1>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonBackButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonRippleEffect,
  loadingController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";

import axios from "axios";
import { useRouter } from "vue-router";
import {sha256, sha224} from "js-sha256";

import { informationCircleOutline } from "ionicons/icons";

export default defineComponent({
  name: "RegisterPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonRippleEffect,
    IonInput,
    IonButton,
    IonIcon,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      control: null,
      name: "",
      surname: "",
      identifier: "",
      mail: "",
      password: "",
      password2: "",
    };
  },
  setup: function () {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    return { goBack, informationCircleOutline };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
  methods: {
    showIDDetails: function () {
      alert("El DNI debe ser introducido todo seguido");
    },
    showPassDetails: function () {
      alert(
        "La contraseña debe contener más de 8 carácteres, incluyendo números y símbolos"
      );
    },
    checkInputs: function () {
      //Check empty values
      if (
        this.name == "" ||
        this.surname == "" ||
        this.identifier == "" ||
        this.mail == "" ||
        this.password == "" ||
        this.password2 == ""
      ) {
        console.log(false);
        return false;
      }

      //Check mail value
      const re = /\S+@\S+\.\S+/;
      if (!re.test(this.mail)) {
        console.log(false);
        return false;
      }

      const checker = [
        "T",
        "R",
        "W",
        "A",
        "G",
        "M",
        "Y",
        "F",
        "P",
        "D",
        "X",
        "B",
        "N",
        "J",
        "Z",
        "S",
        "Q",
        "V",
        "H",
        "L",
        "C",
        "K",
        "E",
      ];

      //Check DNI value
      const id = this.identifier;

      if(id.length != 9){
        return false;
      } 
      
      const num = parseInt(
        id.substring(0, id.length - 1)
      );
      const letter = id.substring(
        id.length - 1,
        id.length
      );

      const r = num % 23;

      const res =
        (checker[r] == letter.toLowerCase() ||
        checker[r] == letter.toUpperCase());

      if (res == false) {
        return res;
      }

      //Check if passwords match

      if (this.password != this.password2) {
        console.log(false);
        return false;
      }

      //Check password structure and length
      if (
        this.password.match(/[a-zA-Z]/g) &&
        this.password.match(/[0-9]/g) &&
        this.password.match(/[^a-zA-Z\d]/g) &&
        this.password.length >= 8
      ) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    },
    startRegister: function () {
      if (this.checkInputs()) {
        loadingController
          .create({
            message: "Confirmando registro...",
          })
          .then((loading) => {
            this.control = loading;
            loading.present();
            axios({
              url: "http://10.144.3.190:3013/registerUser",
              method: "post",
              headers: { Accept: "application/json" },
              data: {
                name: this.name,
                surname: this.surname,
                identifier: this.identifier,
                mail: this.mail,
                password: sha256(this.password),
                pass2: sha224(this.password),
              },
            })
              .then((response) => {
                console.log(response.data);
                if (response.data == "OK") {
                  this.control.dismiss();
                  alert("Registro completado");
                  this.goBack();
                } else {
                  this.control.dismiss();
                  alert(response.data);
                }
              })
              .catch((err) => {
                this.control.dismiss();
                alert("Se ha producido un error: " + err);
              });
          });
      } else {
        alert("Datos incorrectos");
      }
    },
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
</style>