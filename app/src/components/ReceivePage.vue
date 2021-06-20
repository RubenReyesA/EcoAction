<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{messages[idioma]['receiveTitle2']}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{messages[idioma]['howToReceiveText']}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <h2>{{messages[idioma]['howToReceiveText2']}}</h2>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{messages[idioma]['instTitle']}}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="residu6">
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">1</p>
              </ion-col>
              <ion-col class="container">
                <p class="residu5">
                  {{messages[idioma]['receiveS1Text']}}
                </p>
              </ion-col>
              <ion-col class="container" style="max-width: 2rem">
                <ion-buttons>
                  <ion-button @click="openInfo(1)">
                    <ion-icon
                      slot="icon-only"
                      :icon="informationCircleOutline"
                    ></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-col>
            </ion-row>
            <ion-row class="residu6">
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">2</p>
              </ion-col>
              <ion-col class="container">
                <p class="residu5">
                  {{messages[idioma]['receiveS2Text']}}
                </p>
              </ion-col>
              <ion-col class="container" style="max-width: 2rem">
                <ion-buttons>
                  <ion-button @click="openInfo(2)">
                    <ion-icon
                      slot="icon-only"
                      :icon="informationCircleOutline"
                    ></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-col>
            </ion-row>
            <ion-row class="residu6">
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">3</p>
              </ion-col>
              <ion-col class="container">
                <p class="residu5">
                  {{messages[idioma]['receiveS3Text']}}
                </p>
                <h1 class="useSora" style="margin-top:10px"> {{id}}</h1>
              </ion-col>
              <ion-col class="container" style="max-width: 2rem">
                <ion-buttons>
                  <ion-button @click="openInfo(3)">
                    <ion-icon
                      slot="icon-only"
                      :icon="informationCircleOutline"
                    ></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-col>
            </ion-row>
            <ion-row class="residu6">
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">4</p>
              </ion-col>
              <ion-col class="container">
                <p class="residu5">
                  {{messages[idioma]['receiveS4Text']}}
                </p>
              </ion-col>
              <ion-col class="container" style="max-width: 2rem">
                <ion-buttons>
                  <ion-button @click="openInfo(4)">
                    <ion-icon
                      slot="icon-only"
                      :icon="informationCircleOutline"
                    ></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-col>
            </ion-row>
            <ion-row class="residu6">
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">5</p>
              </ion-col>
              <ion-col class="container">
                <p class="residu5">{{messages[idioma]['receiveS5Text']}}</p>
              </ion-col>
              <ion-col class="container" style="max-width: 2rem">
                <ion-buttons>
                  <ion-button @click="openInfo(5)">
                    <ion-icon
                      slot="icon-only"
                      :icon="informationCircleOutline"
                    ></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-col>
            </ion-row>
          </ion-grid>
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
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";

import { informationCircleOutline } from "ionicons/icons";

export default defineComponent({
  name: "ReceivePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCardContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
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
      img: null,
      id:"",
    };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
    this.img=[];

    this.img[1] = require("../../public/assets/images/receive/part1.jpg");
    this.img[2] = require("../../public/assets/images/receive/part2.jpg");
    this.img[3] = require("../../public/assets/images/receive/part3.jpg");
    this.img[4] = require("../../public/assets/images/receive/part4.jpg");
    this.img[5] = require("../../public/assets/images/receive/part5.jpg");

  },

  ionViewWillEnter: function(){
    NativeStorage.getItem("login").then((res) => {
      this.id = res["identifier"];
    });
  },
  setup: function () {
    return { informationCircleOutline };
  },
  methods: {
    openInfo: async function (id) {
      const alert = await alertController.create({
        message: `<img src="${this.img[id]}">`,
        buttons: [
          {
            text: this.messages[this.idioma]["okText"],
            role: "cancel",
          },
        ],
      });

      await alert.present();
    },
  },
});
</script>

<style scoped>
</style>