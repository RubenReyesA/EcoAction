<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{messages[idioma]['detailWasteTitle']}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card>
        <ion-slides pager="true" :options="sliderOptions">
          <ion-slide v-for="i in myResidu['imgsAdapted']" :key="i">
            <img
              :src="i"
              class="imgSlider"
              style="width: 50vw; height: 30vh; margin-top: 10px"
            />
          </ion-slide>
        </ion-slides>
        <ion-card-header>
          <ion-card-title v-if="idioma == 'es'">
            {{ myResidu["nameES"] }}</ion-card-title
          >
          <ion-card-title v-if="idioma == 'ca'">
            {{ myResidu["nameCA"] }}</ion-card-title
          >
          <ion-card-title v-if="idioma == 'en'">
            {{ myResidu["nameEN"] }}</ion-card-title
          >
        </ion-card-header>
      </ion-card>

      <ion-card v-if="idioma == 'ca'">
        <ion-card-header>
          <ion-card-subtitle>On va?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="container1_1">
              <ion-col class="container">
                <img :src="containerResidu[0]" class="residu1" />
              </ion-col>
              <ion-col>
                <p class="residu2 useLondrina">{{ myContainer["nameCA"] }}</p>
              </ion-col>
            </ion-row>
            <ion-row v-if="filtered=='false'">
              <ion-col class="container">
                <ion-card
                  class="btnCard6 ion-activatable"
                  @click="showMore(myContainer['id'])"
                  :color="myContainer['color']"
                >
                  <ion-card-content>
                    <ion-ripple-effect></ion-ripple-effect>
                    <h1 class="btnLabels2 useLondrina">Veure més detalls</h1>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'es'">
        <ion-card-header>
          <ion-card-subtitle>¿Dónde va?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="container1_1">
              <ion-col class="container">
                <img :src="containerResidu[0]" class="residu1" />
              </ion-col>
              <ion-col>
                <p class="residu2 useLondrina">{{ myContainer["nameES"] }}</p>
              </ion-col>
            </ion-row>
            <ion-row v-if="filtered=='false'">
              <ion-col class="container">
                <ion-card
                  class="btnCard6 ion-activatable"
                  @click="showMore(myContainer['id'])"
                  :color="myContainer['color']"
                >
                  <ion-card-content>
                    <ion-ripple-effect></ion-ripple-effect>
                    <h1 class="btnLabels2 useLondrina">Ver más detalles</h1>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'en'">
        <ion-card-header>
          <ion-card-subtitle>Where does it go?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="container1_1">
              <ion-col class="container">
                <img :src="containerResidu[0]" class="residu1" />
              </ion-col>
              <ion-col>
                <p class="residu2 useLondrina">{{ myContainer["nameEN"] }}</p>
              </ion-col>
            </ion-row>
            <ion-row v-if="filtered=='false'">
              <ion-col class="container">
                <ion-card
                  class="btnCard6 ion-activatable"
                  @click="showMore(myContainer['id'])"
                  :color="myContainer['color']"
                >
                  <ion-card-content>
                    <ion-ripple-effect></ion-ripple-effect>
                    <h1 class="btnLabels2 useLondrina">Show more details</h1>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'ca'">
        <ion-card-header>
          <ion-card-subtitle>Quin procés segueix?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="residu6">
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">1</p>
              </ion-col>
              <ion-col class="container">
                <img :src="containerResidu[1]" class="residu4" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">Recollida</p>
              </ion-col>
            </ion-row>
            <ion-row
              class="residu6"
              v-for="(item, idx1) in myResidu['process']['treatmentCA']"
              :key="item"
            >
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">{{ idx1 + 2 }}</p>
              </ion-col>
              <ion-col class="container">
                <img class="residu4" :src="processImages[idx1]" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">{{ item }}</p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'es'">
        <ion-card-header>
          <ion-card-subtitle>¿Qué proceso sigue?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="residu6">
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">1</p>
              </ion-col>
              <ion-col class="container">
                <img :src="containerResidu[1]" class="residu4" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">Recogida</p>
              </ion-col>
            </ion-row>
            <ion-row
              class="residu6"
              v-for="(item, idx1) in myResidu['process']['treatmentES']"
              :key="item"
            >
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">{{ idx1 + 2 }}</p>
              </ion-col>
              <ion-col class="container">
                <img class="residu4" :src="processImages[idx1]" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">{{ item }}</p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'en'">
        <ion-card-header>
          <ion-card-subtitle>Which process is carried out?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="residu6">
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">1</p>
              </ion-col>
              <ion-col class="container">
                <img :src="containerResidu[1]" class="residu4" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">Collection</p>
              </ion-col>
            </ion-row>
            <ion-row
              class="residu6"
              v-for="(item, idx1) in myResidu['process']['treatmentEN']"
              :key="item"
            >
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">{{ idx1 + 2 }}</p>
              </ion-col>
              <ion-col class="container">
                <img class="residu4" :src="processImages[idx1]" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">{{ item }}</p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'ca'">
        <ion-card-header>
          <ion-card-subtitle>En què es transforma?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row
              class="residu6"
              v-for="(item, idx2) in myResidu['process']['transformCA']"
              :key="item"
            >
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">{{ idx2 + 1 }}</p>
              </ion-col>
              <ion-col class="container">
                <img class="residu4" :src="transformImages[idx2]" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">{{ item }}</p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'es'">
        <ion-card-header>
          <ion-card-subtitle>¿En qué se transforma?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row
              class="residu6"
              v-for="(item, idx2) in myResidu['process']['transformES']"
              :key="item"
            >
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">{{ idx2 + 1 }}</p>
              </ion-col>
              <ion-col class="container">
                <img class="residu4" :src="transformImages[idx2]" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">{{ item }}</p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="idioma == 'en'">
        <ion-card-header>
          <ion-card-subtitle>What does it become?</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row
              class="residu6"
              v-for="(item, idx2) in myResidu['process']['transformEN']"
              :key="item"
            >
              <ion-col class="container" style="max-width: 4rem">
                <p class="residu3 useSora">{{ idx2 + 1 }}</p>
              </ion-col>
              <ion-col class="container">
                <img class="residu4" :src="transformImages[idx2]" />
              </ion-col>
              <ion-col class="container">
                <p class="residu5">{{ item }}</p>
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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonRippleEffect,
  IonSlides,
  IonSlide,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "InfoWaste",
  props: ["residuID", 'filtered'],
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
    IonRippleEffect,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonSlides,
    IonSlide,
    IonGrid,
    IonRow,
    IonCol,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      residus: require("../../public/assets/products.json"),
      recycle: require("../../public/assets/recycle.json"),
      myResidu: null,
      containerResidu: null,
      myContainer: null,
      processImages: null,
      transformImages: null,
      sliderOptions: {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay: true,
      },
    };
  },
  setup: function () {
    const router = useRouter();


    const showMore = (id) => {
      router.push({
        name: "detailContainer",
        params: { detailNum: id.toString() },
      });
    };

    return { showMore };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
  created: function () {
    if (this.residuID != null) {
      let found = false;
      let i = 0;

      while (i < this.residus.length && found == false) {
        if (this.residus[i]["id"] == this.residuID) {
          found = true;
        } else {
          i++;
        }
      }

      if (found) {
        this.myResidu = this.residus[i];

        this.myResidu["imgsAdapted"] = [];

        for (let i = 0; i < this.myResidu["imgLinks"].length; i++) {
          this.myResidu["imgsAdapted"][
            i
          ] = require("../../public/assets/images/residus/" +
            this.myResidu["imgLinks"][i]);
        }

        this.containerResidu = [];

        this.containerResidu[0] = require("../../public/assets/images/contenidors/" +
          this.myResidu["recycle"] +
          "1.png");

        this.containerResidu[1] = require("../../public/assets/images/contenidors/" +
          this.myResidu["recycle"] +
          "4.png");

        this.processImages = [];
        this.transformImages = [];

        for (
          let i = 0;
          i < this.myResidu["process"]["treatmentCodes"].length;
          i++
        ) {
          this.processImages[
            i
          ] = require("../../public/assets/images/details/" +
            this.myResidu["process"]["treatmentCodes"][i] +
            ".png");
        }

        for (
          let i = 0;
          i < this.myResidu["process"]["transformCodes"].length;
          i++
        ) {
          this.transformImages[
            i
          ] = require("../../public/assets/images/details/" +
            this.myResidu["process"]["transformCodes"][i] +
            ".png");
        }

        let found2 = false;
        let j = 0;

        while (j < this.recycle.length && found2 == false) {
          if (this.myResidu["recycle"] == this.recycle[j]["color"]) {
            found2 = true;
          } else {
            j++;
          }
        }

        if (found2) {
          this.myContainer = this.recycle[j];
        }
      }
    }
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
</style>