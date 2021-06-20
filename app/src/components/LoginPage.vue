<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["loginTitle"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="container2">
        <img
          class="loginImage"
          src="../../public/assets/images/loginImage.jpg"
        />

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
            <ion-card-subtitle>{{
              messages[idioma]["passwordTitle"]
            }}</ion-card-subtitle>
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
            <ion-card-subtitle>{{messages[idioma]['securityTitle']}}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="colCenter">
              <ion-checkbox id="checkbox" v-model="boxAuth"> </ion-checkbox>
              <ion-label>{{ messages[idioma]["boxAuth"] }}</ion-label>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card
          class="btnCard3 ion-activatable"
          @click="startLogin"
          color="cyan"
        >
          <ion-card-content>
            <ion-ripple-effect></ion-ripple-effect>
            <h1 class="btnLabels2 useLondrina">
              {{ messages[idioma]["loginTitle"] }}
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
  IonBackButton,
  IonLabel,
  IonInput,
  loadingController,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonRippleEffect,
  IonCheckbox,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";
import { KeychainTouchId } from "@ionic-native/keychain-touch-id";

import axios from "axios";
import sha256 from "js-sha256";

import EventBus from "eventing-bus";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonLabel,
    IonInput,
    IonCard,
    IonCardContent,
    IonRippleEffect,
    IonCheckbox,
    IonCardHeader,
    IonCardSubtitle,
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
      mail: null,
      password: null,
      boxAuth: null,
    };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
  setup: function () {
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };

    return {
      goBack
    };
  },
  methods: {
    checkInputs: function () {
      if (
        this.name == "" ||
        this.surname == "" ||
        this.mail == "" ||
        this.password == "" ||
        this.password2 == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    getUserName: function () {
      axios({
        url: "http://192.168.1.41:3013/getUserName?mail=" + this.mail,
        method: "get",
      }).then((response) => {
        NativeStorage.setItem("login", response.data);
        EventBus.publish("hi");
      });
    },
    getTokenAddress: function () {
      axios({
        url: "http://192.168.1.41:3013/getTokenAddress?mail=" + this.mail,
        method: "get",
      }).then((response) => {
        NativeStorage.setItem("tokenAddress", response.data);
      });
    },
    startLogin: function () {
      if (this.checkInputs()) {
        loadingController
          .create({
            message: this.messages[this.idioma]['loginStart'],
          })
          .then((loading) => {
            this.control = loading;
            loading.present();
            axios({
              url: "http://192.168.1.41:3013/loginUser",
              method: "post",
              headers: { Accept: "application/json" },
              data: {
                mail: this.mail,
              },
            })
              .then((response) => {
                if (response.status == 200) {
                  this.control.dismiss();
                  if (sha256(this.password) == response.data) {
                    alert(this.messages[this.idioma]['loginSuccess']);
                    this.getUserName();
                    this.getTokenAddress();
                    if (this.boxAuth == true) {
                      KeychainTouchId.isAvailable()
                        .then(() => {
                          KeychainTouchId.save(
                            "loginCredentials",
                            this.password,
                            true
                          );
                        })
                        .catch((err) => alert("Error: " + err));
                      NativeStorage.setItem("loginPRO", this.mail);
                    }
                    EventBus.publish("checkBiometrics");
                    EventBus.publish("startLogin", this.mail);
                    this.goBack();
                  } else {
                    alert(this.messages[this.idioma]['wrongPass']);
                  }
                } else {
                  this.control.dismiss();
                  alert(
                    this.messages[this.idioma]['loginFail']
                  );
                }
              })
              .catch((err) => {
                this.control.dismiss();
                alert("Error: " + err);
              });
          });
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