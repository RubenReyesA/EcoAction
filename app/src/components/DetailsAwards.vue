<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["detailAwardsTitle"] }} </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{
            messages[idioma]["balanceNow2"]
          }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <div class="container">
                  <p id="priceValue2">
                    {{ tokenBalance }} EA2C ----> {{ fiatBalance }}
                    {{ currency }}
                  </p>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="container">
              <ion-card v-if="idAward == 1" class="default cardR1"> </ion-card>
              <ion-card v-if="idAward == 2" class="default cardR2"> </ion-card>
              <ion-card v-if="idAward == 3" class="default cardR3"> </ion-card>
              <ion-card v-if="idAward == 4" class="default cardR4"> </ion-card>
              <ion-card v-if="idAward == 5" class="default cardR5"> </ion-card>
              <ion-card v-if="idAward == 6" class="default cardR6"> </ion-card>
              <ion-card v-if="idAward == 7" class="default cardR7"> </ion-card>
              <ion-card v-if="idAward == 8" class="default cardR8"> </ion-card>
              <ion-card v-if="idAward == 9" class="default cardR9"> </ion-card>
              <ion-card v-if="idAward == 10" class="default cardR10">
              </ion-card>
              <ion-card v-if="idAward == 11" class="default cardR11">
              </ion-card>
              <ion-card v-if="idAward == 12" class="default cardR12">
              </ion-card>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-list>
        <ion-radio-group v-model="quantitySelected">
          <ion-list-header>
            <ion-label>{{ messages[idioma]["quantitySelect"] }}</ion-label>
          </ion-list-header>

          <ion-item :disabled="possible['5']">
            <ion-label>5€</ion-label>
            <ion-radio slot="start" value="5"></ion-radio>
            <ion-badge color="black" slot="end" class="useCircular"
              >({{ quantities["5"] }} EAs)</ion-badge
            >
          </ion-item>

          <ion-item :disabled="possible['10']">
            <ion-label>10€</ion-label>
            <ion-radio slot="start" value="10"></ion-radio>
            <ion-badge color="black" slot="end" class="useCircular"
              >({{ quantities["10"] }} EAs)</ion-badge
            >
          </ion-item>

          <ion-item :disabled="possible['20']">
            <ion-label>20€</ion-label>
            <ion-radio slot="start" value="20"></ion-radio>
            <ion-badge color="black" slot="end" class="useCircular"
              >({{ quantities["20"] }} EAs)</ion-badge
            >
          </ion-item>

          <ion-item :disabled="possible['50']">
            <ion-label>50€</ion-label>
            <ion-radio slot="start" value="50"></ion-radio>
            <ion-badge color="black" slot="end" class="useCircular"
              >({{ quantities["50"] }} EAs)</ion-badge
            >
          </ion-item>

          <ion-item :disabled="possible['100']">
            <ion-label>100€</ion-label>
            <ion-radio slot="start" value="100"></ion-radio>
            <ion-badge color="black" slot="end" class="useCircular"
              >({{ quantities["100"] }} EAs)</ion-badge
            >
          </ion-item>

          <ion-item :disabled="possible['200']">
            <ion-label>200€</ion-label>
            <ion-radio slot="start" value="200"></ion-radio>
            <ion-badge color="black" slot="end" class="useCircular"
              >({{ quantities["200"] }} EAs)</ion-badge
            >
          </ion-item>

          <ion-item :disabled="possible['500']">
            <ion-label>500€</ion-label>
            <ion-radio slot="start" value="500"></ion-radio>
            <ion-badge color="black" slot="end" class="useCircular"
              >({{ quantities["500"] }} EAs)</ion-badge
            >
          </ion-item>
        </ion-radio-group>
      </ion-list>

      <ion-card>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col class="midCol">
                <p>
                  {{ messages[idioma]["comissionFeeText"] }} {{ comission }}
                  {{ currency.toUpperCase() }}
                </p>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="midCol">
                <p>
                  {{ messages[idioma]["totalPayText"] }} {{ total }}
                  {{ currency.toUpperCase() }}
                </p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <div class="container">
        <ion-card class="btnCard3 ion-activatable" @click="buy" color="black">
          <ion-card-content>
            <ion-ripple-effect></ion-ripple-effect>
            <h1 class="btnLabels2 useLondrina">
              {{ messages[idioma]["exchangeText"] }}
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
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  loadingController,
  IonList,
  IonLabel,
  IonItem,
  IonRadio,
  IonRadioGroup,
  IonListHeader,
  IonRippleEffect,
  IonBadge,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";

import { useRouter } from "vue-router";

import axios from "axios";

export default defineComponent({
  name: "DetailsAwards",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonLabel,
    IonItem,
    IonRadio,
    IonRadioGroup,
    IonListHeader,
    IonRippleEffect,
    IonBadge,
  },
  props: ["idAward"],
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      fiatBalance: 0,
      tokenBalance: 0,
      controlBalances: null,
      controlSend: null,
      currency: "eur",
      tokenAddress: "",
      quantities: {},
      quantitySelected: "0",
      possible: {},
      name: "",
      mail: "",
      comission: "0",
      total: "0",
    };
  },
  watch: {
    quantitySelected: function () {
      axios({
        url:
          "http://192.168.1.41:3013/getGasEstimation?method=send&addr=" +
          this.tokenAddress +
          "&q=" +
          this.quantities[this.quantitySelected].toString() +
          "&currency=" +
          this.currency,
        method: "get",
      })
        .then((response2) => {
          this.comission =
            response2.data[0] + " EAs - " + response2.data[1] + " ";

          const totalT =
            parseInt(this.quantities[this.quantitySelected].toString()) +
            parseInt(response2.data[0]);
          const totalF =
            parseFloat(this.quantitySelected.toString()) +
            parseFloat(response2.data[1]);

          this.total = totalT + " EAs - " + totalF + " ";
        })
        .catch((err) => {
          console.log("Error: " + err.toString());
        });
    },
  },
  methods: {
    getBalances: function () {
      loadingController
        .create({
          message: this.messages[this.idioma]["loadingData"],
        })
        .then((loading) => {
          this.controlBalances = loading;
          loading.present();
          axios({
            url:
              "http://192.168.1.41:3013/getBalance?tokenAddress=" +
              this.tokenAddress +
              "&currency=" +
              this.currency,
            method: "get",
          })
            .then((response) => {
              axios({
                url: "http://192.168.1.41:3013/getQuantities",
                method: "get",
              }).then((response2) => {
                this.quantities = {};

                this.quantities["5"] = response2.data[0];
                this.quantities["10"] = response2.data[1];
                this.quantities["20"] = response2.data[2];
                this.quantities["50"] = response2.data[3];
                this.quantities["100"] = response2.data[4];
                this.quantities["200"] = response2.data[5];
                this.quantities["500"] = response2.data[6];

                this.tokenBalance = 2000;

                this.tokenBalance = response.data[0] + "";
                this.fiatBalance = response.data[1] + "";

                this.possible["5"] =
                  parseInt(this.quantities["5"]) > parseInt(this.tokenBalance);
                this.possible["10"] =
                  parseInt(this.quantities["10"]) > parseInt(this.tokenBalance);
                this.possible["20"] =
                  parseInt(this.quantities["20"]) > parseInt(this.tokenBalance);
                this.possible["50"] =
                  parseInt(this.quantities["50"]) > parseInt(this.tokenBalance);
                this.possible["100"] =
                  parseInt(this.quantities["100"]) >
                  parseInt(this.tokenBalance);
                this.possible["200"] =
                  parseInt(this.quantities["200"]) >
                  parseInt(this.tokenBalance);
                this.possible["500"] =
                  parseInt(this.quantities["500"]) >
                  parseInt(this.tokenBalance);

                this.controlBalances.dismiss();
              });
            })
            .catch((err) => {
              this.controlBalances.dismiss();

              alert("Error => " + err);
              this.goBack;
            });
        })
        .catch((err) => {
          this.controlBalances.dismiss();

          alert("Error => " + err);
          this.goBack;
        });
    },
    buy: function () {
      if (this.quantitySelected != "") {
        loadingController
          .create({
            message: this.messages[this.idioma]["exchangeSuccess"],
          })
          .then((loading) => {
            this.controlSend = loading;
            loading.present();

            axios({
              url:
                "http://192.168.1.41:3013/redeemCode?id=" +
                this.idAward +
                "&name=" +
                this.name +
                "&mail=" +
                this.mail +
                "&q=" +
                this.quantitySelected +
                "&language=" +
                this.idioma.toUpperCase() +
                "&price=" +
                this.quantities[this.quantitySelected.toString()],
              method: "get",
            }).then((response) => {
              alert(this.messages[this.idioma][response.data]);
              this.controlSend.dismiss();
              this.goBack();
            });
          })
          .catch((err) => {
            console.log("Error: " + err);
            this.controlSend.dismiss();
            this.goBack();
          });
      } else {
        alert("Error");
      }
    },
  },
  ionViewWillEnter: function () {
    NativeStorage.getItem("login").then((res) => {
      this.tokenAddress = res["tokenAddress"];
      this.name = res["name"];
      this.mail = res["mail"];
    });

    NativeStorage.getItem("idioma").then((x) => {
      this.idioma = x;
      this.getBalances();
    });
  },
  setup: function () {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    return {
      goBack,
    };
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
</style>