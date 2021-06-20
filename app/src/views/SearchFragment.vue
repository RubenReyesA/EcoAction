<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ messages[idioma]["searchTab"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{
            messages[idioma]["searchTab"]
          }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container2">
        <img id="searchImage" src="../../public/assets/images/search.png" />

        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-card
                class="btnCard4 ion-activatable"
                @click="gotoBarcode"
                color="lightred"
                :disabled="!session"
              >
                <ion-card-content>
                  <ion-ripple-effect></ion-ripple-effect>
                  <div class="container1_2">
                    <ion-icon
                      :icon="barcode"
                      class="iconSearch"
                      size="large"
                    ></ion-icon>
                    <h1 class="btnLabels3 useLondrina">
                      {{ messages[idioma]["searchBarcode"] }}
                    </h1>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-card
                class="btnCard4 ion-activatable"
                :disabled="!session"
                @click="gotoVisionAI"
                color="lightgreen"
              >
                <ion-card-content>
                  <ion-ripple-effect></ion-ripple-effect>
                  <div class="container1_2">
                    <ion-icon
                      :icon="camera"
                      class="iconSearch"
                      size="large"
                    ></ion-icon>
                    <h1 class="btnLabels3 useLondrina">
                      {{ messages[idioma]["searchImageAI"] }}
                    </h1>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-card
                class="btnCard4 ion-activatable"
                @click="gotoKeyboard"
                color="cyan"
              >
                <ion-card-content>
                  <ion-ripple-effect></ion-ripple-effect>
                  <div class="container1_2">
                    <ion-icon
                      :icon="searchCircle"
                      class="iconSearch"
                      size="large"
                    ></ion-icon>
                    <h1 class="btnLabels3 useLondrina">
                      {{ messages[idioma]["searchKeyboard"] }}
                    </h1>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
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
import { barcode, camera, searchCircle } from "ionicons/icons";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

import { NativeStorage } from "@ionic-native/native-storage";

export default defineComponent({
  name: "SearchFragment",
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
  setup() {
    const router = useRouter();

    const gotoBarcode = () => {
      router.push("/main/search/barcode");
    };

    const gotoVisionAI = () => {
      router.push("/main/search/vision");
    };

    const gotoKeyboard = () => {
      router.push("/main/search/keyboard");
    };

    return {
      gotoBarcode,
      gotoVisionAI,
      gotoKeyboard,
      barcode,
      camera,
      searchCircle,
    };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => {
      this.idioma = x;
    });
  },
  ionViewWillEnter: function () {
    NativeStorage.getItem("login")
      .then(() => {
        this.session = true;
      })
      .catch(() => {
        this.session = false;
      });
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/colorStyle.css";
@import "../styles/fontStyle.css";
</style>