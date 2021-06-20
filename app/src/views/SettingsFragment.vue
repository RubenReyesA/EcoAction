<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ messages[idioma]["configTab"] }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{
            messages[idioma]["configTab"]
          }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-label>{{ messages[idioma]["languageTitle"] }}</ion-label>
          <ion-select
            v-model="idioma"
            interface="action-sheet"
            :ok-text="messages[idioma]['okText']"
            :cancel-text="messages[idioma]['cancelText']"
          >
            <ion-select-option value="es">{{
              messages[idioma]["spanishTitle"]
            }}</ion-select-option>
            <ion-select-option value="ca">{{
              messages[idioma]["catalanTitle"]
            }}</ion-select-option>
            <ion-select-option value="en">{{
              messages[idioma]["englishTitle"]
            }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>{{ messages[idioma]["currencyTitle"] }}</ion-label>
          <ion-select
            v-model="currency"
            interface="action-sheet"
            :ok-text="messages[idioma]['okText']"
            :cancel-text="messages[idioma]['cancelText']"
          >
            <ion-select-option value="eur">EUR</ion-select-option>
            <ion-select-option value="usd">USD</ion-select-option>
            <ion-select-option value="gbp">GBP</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item :disabled="biometricItem">
          <ion-label>{{ messages[idioma]["biometricUsage"] }}</ion-label>
          <ion-toggle v-model="biometric"></ion-toggle>
        </ion-item>
      </ion-list>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{
            messages[idioma]["noteText"]
          }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ this.messages[this.idioma]["restartApp"] }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonToggle,
  IonSelectOption,
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/vue";

import { NativeStorage } from "@ionic-native/native-storage";
import EventBus from "eventing-bus";

export default {
  name: "SettingsFragment",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonToggle,
    IonSelectOption,
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      currency: "eur",
      biometric: false,
      biometricItem: true,
    };
  },
  watch: {
    idioma: function () {
      NativeStorage.setItem("idioma", this.idioma);
    },
    currency: function () {
      NativeStorage.setItem("currency", this.currency);
    },
    biometric: function () {
      if (!this.biometric) {
        NativeStorage.remove("loginPRO");
        this.biometricItem = true;
      }
    },
  },
  methods: {
    checkBiometrics: function () {
      NativeStorage.getItem("loginPRO").then(() => {
        this.biometric = true;
        this.biometricItem = false;
      });
    },
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => {
      this.idioma = x;
    });
    NativeStorage.getItem("currency").then((x) => {
      this.currency = x;
    });
  },
  created: function () {
    this.checkBiometrics();
    EventBus.on("checkBiometrics", this.checkBiometrics);
  },
};
</script>