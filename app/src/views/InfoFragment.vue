<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ messages[idioma]["infoTab"] }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ messages[idioma]["infoTab"] }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card
              class="btnCard ion-activatable"
              @click="openRecyclingPoints"
              color="lightgreen"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <ion-icon :icon="leaf" size="large"></ion-icon>
                  <h1 class="btnLabels">{{messages[idioma]["wastePTitle"]}}</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card
              class="btnCard ion-activatable"
              @click="openWhyRecycle"
              color="cyan"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <ion-icon :icon="helpCircle" size="large"></ion-icon>
                  <h1 class="btnLabels">{{messages[idioma]["faqsTitle"]}}</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-card
              class="btnCard ion-activatable"
              @click="openContainers"
              color="purple"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <ion-icon :icon="trashBin" size="large"></ion-icon>
                  <h1 class="btnLabels">{{messages[idioma]["containersTitle"]}}</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card
              class="btnCard ion-activatable"
              @click="openWaste"
              color="lightyellow"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <ion-icon :icon="cube" size="large"></ion-icon>
                  <h1 class="btnLabels">{{messages[idioma]["wasteTitle"]}}</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-card
              :disabled="!session"
              class="btnCard2 ion-activatable"
              @click="openAwards"
              color="orangeinfo"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <ion-icon :icon="trophy" size="large"></ion-icon>
                  <h1 class="btnLabels">{{messages[idioma]["awardsTitle"]}}</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
  IonRippleEffect,
} from "@ionic/vue";

import { leaf, helpCircle, cube, trashBin, trophy } from "ionicons/icons";
import { NativeStorage } from "@ionic-native/native-storage";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "InfoFragment",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonIcon,
    IonGrid,
    IonCol,
    IonRow,
    IonCard,
    IonCardContent,
    IonRippleEffect,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      session: false,
    };
  },
  setup: function () {
    const router = useRouter();

    const openRecyclingPoints = () => {
      router.push("/main/info/recyclingPoints");
    };

    const openWhyRecycle = () => {
      router.push("/main/info/whyReciclying");
    };

    const openWaste = () => {
      router.push("/main/info/keyboard");
    };

    const openContainers = () => {
      router.push("/main/info/containers");
    };

    const openAwards = () => {
      router.push("/main/info/awards");
    };

    return {
      openRecyclingPoints,
      openWhyRecycle,
      openWaste,
      openContainers,
      openAwards,
      leaf,
      helpCircle,
      cube,
      trashBin,
      trophy,
    };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => {
      this.idioma = x;
    });
  },
  ionViewWillEnter: function(){
    NativeStorage.getItem("login")
      .then(() => {
        this.session = true;
      })
      .catch(() => {
        this.session = false;
      });
  }
});
</script>

<style>
@import "../styles/style.css";
@import "../styles/colorStyle.css";
</style>