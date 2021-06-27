<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["faqsTitle2"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">

      <div v-if="idioma == 'es'">
        <ion-card v-for="f in faqs" :key="f['id']">
          <ion-card-header>
            <ion-card-title style="font-size: 20px" text-wrap>
              {{ f["qES"] }}</ion-card-title
            >
          </ion-card-header>
          <ion-card-content> {{ f["aES"] }}</ion-card-content>
        </ion-card>
      </div>

      <div v-if="idioma == 'ca'">
        <ion-card v-for="f in faqs" :key="f['id']">
          <ion-card-header>
            <ion-card-title style="font-size: 20px" text-wrap>
              {{ f["qCA"] }}</ion-card-title
            >
          </ion-card-header>
          <ion-card-content> {{ f["aCA"] }}</ion-card-content>
        </ion-card>
      </div>

      <div v-if="idioma == 'en'">
        <ion-card v-for="f in faqs" :key="f['id']">
          <ion-card-header>
            <ion-card-title style="font-size: 20px" text-wrap>
              {{ f["qEN"] }}</ion-card-title
            >
          </ion-card-header>
          <ion-card-content> {{ f["aEN"] }}</ion-card-content>
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";

export default defineComponent({
  name: "InfoWhyRecycling",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
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
      faqs: require("../../public/assets/faqs.json"),
    };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
});
</script>

<style scoped>
@import "../styles/style.css";
</style>