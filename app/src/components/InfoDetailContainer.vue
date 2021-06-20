<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{messages[idioma]['detailContainersTitle']}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card>
        <ion-card-header class="container">
          <img :src="containerImage" class="residu7" alt="" />
          <ion-card-title v-if="idioma == 'ca'">
            {{ myContainer["nameCA"] }}
          </ion-card-title>
          <ion-card-title v-if="idioma == 'es'">
            {{ myContainer["nameES"] }}
          </ion-card-title>

          <ion-card-title v-if="idioma == 'en'">
            {{ myContainer["nameEN"] }}
          </ion-card-title>
        </ion-card-header>
      </ion-card>

      <ion-card v-if="idioma == 'ca'">
        <ion-card-header>
          <ion-card-subtitle>Quins residus?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="container">
            <p style="text-align: justify">
              {{ myContainer["defCA"] }}
            </p>
            <ion-card
              class="btnCard6 ion-activatable"
              :color="myContainer['color']"
              @click="openKeyboardFilter(myContainer['color'])"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <h1 class="btnLabels2 useLondrina">Veure els residus</h1>
              </ion-card-content>
            </ion-card>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'es'">
        <ion-card-header>
          <ion-card-subtitle>¿Qué residuos?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="container">
            <p style="text-align: justify">
              {{ myContainer["defES"] }}
            </p>
            <ion-card
              class="btnCard6 ion-activatable"
              :color="myContainer['color']"
              @click="openKeyboardFilter(myContainer['color'])"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <h1 class="btnLabels2 useLondrina">Ver los residuos</h1>
              </ion-card-content>
            </ion-card>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'en'">
        <ion-card-header>
          <ion-card-subtitle>What waste?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="container">
            <p style="text-align: justify">
              {{ myContainer["defEN"] }}
            </p>
            <ion-card
              class="btnCard6 ion-activatable"
              :color="myContainer['color']"
              @click="openKeyboardFilter(myContainer['color'])"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <h1 class="btnLabels2 useLondrina">See waste</h1>
              </ion-card-content>
            </ion-card>
          </div>
        </ion-card-content>
      </ion-card>
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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonRippleEffect,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "InfoDetailContainer",
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
    IonCardTitle,
    IonCardSubtitle,
    IonRippleEffect,
  },
  props: {
    detailNum: String,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      title: "",
      containers: require("../../public/assets/recycle.json"),
      myContainer: null,
      containerImage: null,
    };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
  created: function () {
    let found = false;
    let i = 0;

    while (i < this.containers.length && found == false) {
      if (this.containers[i]["id"] == parseInt(this.detailNum)) {
        found = true;
      } else {
        i++;
      }
    }

    if (found) {
      this.myContainer = this.containers[i];

      this.containerImage = require("../../public/assets/images/contenidors/" +
        this.myContainer["color"] +
        "3.png");
    }
  },
  setup: function () {
    const router = useRouter();

    const openKeyboardFilter = (id) => {
      router.push({ name: "keyboardFilter", params: { filter: id} });    };

    return {
      openKeyboardFilter,
    };
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
</style>