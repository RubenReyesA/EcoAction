<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["visionAIScannerTitle"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{
            messages[idioma]["visionAIText"]
          }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="container">
            <img :src="img" style="height: 25vh" v-if="dataON" />
            <ion-skeleton-text
              animated
              v-if="!dataON"
              style="height: 25vh"
            ></ion-skeleton-text>

            <ion-card
              class="btnCard6 ion-activatable"
              @click="openCamera"
              color="cyan"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <h1 class="btnLabels2 useLondrina">
                  {{ messages[idioma]["tryText"] }}
                </h1>
              </ion-card-content>
            </ion-card>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{
            messages[idioma]["analysisResultTitle"]
          }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="residu6" v-if="!dataON">
              <ion-row class="residu9">
                <ion-col class="container" style="max-width: 4rem">
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu3 useSora"
                  ></ion-skeleton-text>
                </ion-col>
                <ion-col>
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu4"
                    style="height: 10vh"
                  ></ion-skeleton-text>
                </ion-col>
                <ion-col class="container">
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu5"
                  ></ion-skeleton-text>
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu8"
                  ></ion-skeleton-text>
                </ion-col>
              </ion-row>
            </ion-row>

            <ion-row class="residu6" v-if="!dataON">
              <ion-row class="residu9">
                <ion-col class="container" style="max-width: 4rem">
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu3 useSora"
                  ></ion-skeleton-text>
                </ion-col>
                <ion-col>
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu4"
                    style="height: 10vh"
                  ></ion-skeleton-text>
                </ion-col>
                <ion-col class="container">
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu5"
                  ></ion-skeleton-text>
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu8"
                  ></ion-skeleton-text>
                </ion-col>
              </ion-row>
            </ion-row>

            <ion-row class="residu6" v-if="!dataON">
              <ion-row class="residu9">
                <ion-col class="container" style="max-width: 4rem">
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu3 useSora"
                  ></ion-skeleton-text>
                </ion-col>
                <ion-col>
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu4"
                    style="height: 10vh"
                  ></ion-skeleton-text>
                </ion-col>
                <ion-col class="container">
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu5"
                  ></ion-skeleton-text>
                  <ion-skeleton-text
                    animated
                    v-if="!dataON"
                    class="residu8"
                  ></ion-skeleton-text>
                </ion-col>
              </ion-row>
            </ion-row>

            <ion-row
              class="residu6"
              v-for="(item, idx) in results"
              :key="item.residuID"
            >
              <ion-row class="residu9">
                <ion-col class="container" style="max-width: 4rem">
                  <p class="residu3 useSora">{{ idx + 1 }}</p>
                </ion-col>
                <ion-col class="container">
                  <img :src="item.img" class="residu4" />
                </ion-col>
                <ion-col class="container">
                  <p class="residu5">{{ item.title }}</p>
                  <p class="residu8">{{ item.prob }}</p>
                </ion-col>
              </ion-row>

              <ion-row class="container2 residu8">
                <ion-chip color="blue" @click="openItem(item.residuID)">
                  <ion-icon
                    :icon="checkmarkCircleOutline"
                    size="large"
                  ></ion-icon>
                  <ion-label>{{
                    messages[idioma]["markAsCorrectText"]
                  }}</ion-label>
                </ion-chip>
              </ion-row>
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
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonChip,
  IonRippleEffect,
  loadingController,
  IonSkeletonText,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";

import { checkmarkCircleOutline } from "ionicons/icons";

import { Camera } from "@ionic-native/camera";
import { FileTransfer } from "@ionic-native/file-transfer";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "VisionAIScannerPage",
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
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonLabel,
    IonChip,
    IonRippleEffect,
    IonSkeletonText,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      products: require("../../public/assets/products.json"),
      cameraOptions: {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true, //Corrects Android orientation quirks
      },
      mail: "",
      img: null,
      results: null,
      loadingData: null,
      dataON: false,
    };
  },
  ionViewWillEnter: function () {
    NativeStorage.getItem("login").then((res) => {
      this.mail = res["mail"];
    });

    NativeStorage.getItem("idioma").then((x) => {
      this.idioma = x;
      this.openCamera();
    });
  },
  methods: {
    openCamera: function () {
      this.dataON = false;
      this.img = null;
      this.results = null;
      this.loadingData = null;

      loadingController
        .create({
          message: this.messages[this.idioma]["imageLoadingText"],
        })
        .then((loading) => {
          this.loadingData = loading;
          loading.present();
          Camera.getPicture(this.cameraOptions)
            .then((imageData) => {
              const fileTransfer = FileTransfer.create();

              fileTransfer
                .upload(
                  imageData,
                  encodeURI("http://192.168.1.41:3013/uploadImage"),
                  {
                    fileKey: "myImage",
                    fileName: "file",
                    mimeType: "image/jpeg",
                    params: {
                      mail: this.mail,
                    },
                  }
                )
                .then((data) => {
                  const response = JSON.parse(data.response);

                  this.img = "http://192.168.1.41:3013" + response["pathIMG"];

                  this.results = response["results"];

                  for (let i = 0; i < this.results.length; i++) {
                    const id = this.results[i]["residuID"];
                    this.results[i][
                      "img"
                    ] = require("../../public/assets/images/residus/" +
                      id +
                      "/" +
                      id +
                      "-1.jpg");

                    this.results[i]["prob"] =
                      Math.round(
                        parseFloat(this.results[i]["prob"] * 100)
                      ).toString() + "%";

                    let found = false;
                    let idx = 0;

                    while (idx < this.products.length && found != true) {
                      if (this.products[idx]["id"] == id) {
                        found = true;
                      } else {
                        idx++;
                      }
                    }

                    const productReal = this.products[idx];

                    switch (this.idioma) {
                      case "es":
                        this.results[i]["title"] = productReal["nameES"];

                        break;

                      case "ca":
                        this.results[i]["title"] = productReal["nameCA"];

                        break;

                      case "en":
                        this.results[i]["title"] = productReal["nameEN"];

                        break;

                      default:
                        break;
                    }
                  }

                  this.dataON = true;

                  this.loadingData.dismiss();
                })
                .catch((err) => {
                  this.loadingData.dismiss();
                  alert("Error: " + err.toString());
                  this.goBack();
                });
            })
            .catch((err) => {
              this.loadingData.dismiss();
              alert("Error: " + err.toString());
              this.goBack();
            });
        })
        .catch((err) => {
          this.loadingData.dismiss();
          alert("Error: " + err.toString());
          this.goBack();
        });
    },
  },
  setup: function () {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    const openItem = (p) => {
      router.push({
        name: "residu",
        params: { residuID: p, filtered: "false" },
      });
    };

    return {
      openItem,
      goBack,
      checkmarkCircleOutline,
    };
  },
});
</script>

<style>
@import "../styles/style.css";
</style>