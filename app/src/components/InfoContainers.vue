<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{messages[idioma]["containersTitle"]}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">

      <ion-grid v-if="idioma == 'es'">
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(1)" style="border: solid blue 2px"> 
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/blue2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Papel y Cartón</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(2)" style="border: solid green 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/green2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Envase de Vidrio</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(3)" style="border: solid yellow 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/yellow2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Envase Ligero</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(4)" style="border: solid gray 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/gray2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Fracción Resto</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(5)" style="border: solid brown 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/brown2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Fracción Orgánica</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(6)" style="border: solid orange 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/orange2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Pilas y Acumuladores</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(7)" style="border: solid turquoise 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/turquoise2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Medicamentos</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(8)" style="border: solid red 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/red2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Punto Limpio</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(9)" style="border: solid beige 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/beige2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Ropa</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(10)" style="border: solid black 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/black2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Especial</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      
      <ion-grid v-if="idioma == 'ca'">
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(1)" style="border: solid blue 2px"> 
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/blue2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Paper i Cartró</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(2)" style="border: solid green 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/green2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Envàs de Vidre</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(3)" style="border: solid yellow 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/yellow2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Envàs Lleuger</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(4)" style="border: solid gray 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/gray2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Fracció Resta</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(5)" style="border: solid brown 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/brown2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Fracció Orgànica</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(6)" style="border: solid orange 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/orange2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Piles i Acumuladors</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(7)" style="border: solid turquoise 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/turquoise2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Medicaments</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(8)" style="border: solid red 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/red2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Deixalleria</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(9)" style="border: solid beige 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/beige2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Roba</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(10)" style="border: solid black 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/black2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Especial</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid v-if="idioma == 'en'">
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(1)" style="border: solid blue 2px"> 
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/blue2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Paper and Cardboard</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(2)" style="border: solid green 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/green2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Glass bottles and Jars</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(3)" style="border: solid yellow 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/yellow2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Light Packaging</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(4)" style="border: solid gray 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/gray2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Other Waste</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(5)" style="border: solid brown 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/brown2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Organic Waste</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(6)" style="border: solid orange 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/orange2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Batteries and Accumulators</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(7)" style="border: solid turquoise 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/turquoise2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Medicines</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(8)" style="border: solid red 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/red2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Recycling Center</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(9)" style="border: solid beige 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/beige2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Clothes</h1>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="btnCard5 ion-activatable" color="white" @click="openContainerDetail(10)" style="border: solid black 2px">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <div class="container">
                  <img
                    src="../../public/assets/images/contenidors/black2.png"
                    alt=""
                  />
                  <h1 class="btnLabels">Special</h1>
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
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonRippleEffect,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "InfoContainers",
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
    IonGrid,
    IonRow,
    IonCol,
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
    };
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
  setup: function () {
    const router = useRouter();

    const openContainerDetail = (id) => {
      router.push({ name: "detailContainer", params: { detailNum: id.toString() } });
    };

    return {
      openContainerDetail
    }
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
</style>