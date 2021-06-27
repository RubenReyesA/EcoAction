<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["sendTitle2"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card :style="cardStyle">
        <ion-card-header>
          <ion-card-subtitle>{{
            messages[idioma]["quantityText"]
          }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row style="margin-bottom: 2vh">
              <ion-col>
                <ion-segment v-model="segmentValue">
                  <ion-segment-button value="tokens">
                    <ion-label>Tokens</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="fiat">
                    <ion-label>Fiat</ion-label>
                  </ion-segment-button>
                </ion-segment>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="sendCol">
                <ion-input
                  type="number"
                  pattern="[0-9]*"
                  v-model="tokenInput"
                  :disabled="disableTokens"
                ></ion-input>
              </ion-col>
              <ion-col class="midCol"> ---- </ion-col>
              <ion-col class="sendCol">
                <ion-input
                  type="number"
                  inputmode="decimal"
                  v-model="fiatInput"
                  :disabled="disableFiat"
                ></ion-input>
              </ion-col>
            </ion-row>
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

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{
            messages[idioma]["destText"]
          }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col class="midCol">
                <p>{{ messages[idioma]["insertIDText"] }}</p>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="midCol sendCol">
                <ion-input type="text" v-model="identifier" :disabled="verified"></ion-input>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <div class="container2">
        <div id="loginRegisterDiv">
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-card
                  class="btnCard3 ion-activatable"
                  color="warning"
                  :disabled="!dataCorrect"
                  @click="checkData"
                >
                  <ion-card-content>
                    <ion-ripple-effect></ion-ripple-effect>
                    <h1 class="btnLabels2 useLondrina">
                      {{ messages[idioma]["verifyText"] }}
                    </h1>
                  </ion-card-content>
                </ion-card>
              </ion-col>
              <ion-col>
                <ion-card
                  class="btnCard3 ion-activatable"
                  color="lightgreen"
                  :disabled="!verified"
                  @click="updateTokens"
                >
                  <ion-card-content>
                    <ion-ripple-effect></ion-ripple-effect>
                    <h1 class="btnLabels2 useLondrina">
                      {{ messages[idioma]["confirmText"] }}
                    </h1>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
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
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonInput,
  IonSegment,
  loadingController,
  IonLabel,
  IonCardHeader,
  IonCardSubtitle,
  IonRippleEffect,
  IonSegmentButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";
import axios from "axios";
import { sha224 } from "js-sha256";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SendPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonInput,
    IonSegment,
    IonLabel,
    IonCardHeader,
    IonRippleEffect,
    IonCardSubtitle,
    IonSegmentButton,
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
      tokenInput: 0,
      t: "",
      m: "",
      fiatInput: 0,
      changePrice: "",
      controlInfo: null,
      controlSend: null,
      segmentValue: "tokens",
      disableTokens: false,
      disableFiat: true,
      identifier: "",
      myidentifier: "",
      comission: "0",
      total: "0",
      dataCorrect: false,
      verified: false,
      correctInput: true,
      balance: 0,
      cardRed: "border: 2px solid red;",
      cardGreen: "border: 2px solid green;",
      cardStyle: "border: 2px solid red;",
      checker: [
        "T",
        "R",
        "W",
        "A",
        "G",
        "M",
        "Y",
        "F",
        "P",
        "D",
        "X",
        "B",
        "N",
        "J",
        "Z",
        "S",
        "Q",
        "V",
        "H",
        "L",
        "C",
        "K",
        "E",
      ],
    };
  },
  methods: {
    checkIdentifier: function (id) {
      if (id == this.myidentifier) {
        return false;
      } else {
        const num = parseInt(id.substring(0, id.length - 1));
        const letter = id.substring(id.length - 1, id.length);

        const r = num % 23;

        return (
          this.checker[r] == letter.toLowerCase() ||
          this.checker[r] == letter.toUpperCase()
        );
      }
    },
    checkData: function () {
      if (this.correctInput) {
        if (this.checkIdentifier(this.identifier)) {
          axios({
            url: "http://10.144.3.190:3013/checkID?id=" + this.identifier,
            method: "get",
          })
            .then((response) => {
              if (response.data == true) {
                this.verified = true;
              }
            })
            .catch((err) => {
              console.log("Error => " + err);
            });
        } else {
          alert("Error: " + this.messages[this.idioma]["idInvalid"]);
        }
      }
    },
    updateTokens: function () {
      const pass = prompt(this.messages[this.idioma]["passReqText"]);

      if (pass != null && pass != "") {
        loadingController
          .create({
            message: this.messages[this.idioma]["sendTokensText"],
          })
          .then((loading) => {
            this.controlSend = loading;
            loading.present();
            axios({
              url: "http://10.144.3.190:3013/updateTokens",
              method: "post",
              data: [this.identifier, this.m, sha224(pass), this.tokenInput],
            }).then((response) => {
              this.controlSend.dismiss();
              alert(this.messages[this.idioma][response.data]);
              this.goBack();
            });
          })
          .catch((err) => {
            this.controlSend.dismiss();
            alert("Error: " + err);
            this.goBack();
          });
      }
    },
    loadData: function () {
      loadingController
        .create({
          message: this.messages[this.idioma]["loadingData"],
        })
        .then((loading) => {
          this.controlInfo = loading;
          loading.present();
          axios({
            url:
              "http://10.144.3.190:3013/getEthPrice?currency=" + this.currency,
            method: "get",
          })
            .then((response) => {
              this.changePrice = parseFloat(response.data);
              axios({
                url:
                  "http://10.144.3.190:3013/getBalance?tokenAddress=" +
                  this.t +
                  "&currency=" +
                  this.currency,
                method: "get",
              })
                .then((response2) => {
                  this.balance = response2.data[0];
                  axios({
                    url:
                      "http://10.144.3.190:3013/getGasEstimation?method=send&addr=" +
                      this.t +
                      "&q=" +
                      this.tokenInput +
                      "&currency=" +
                      this.currency,
                    method: "get",
                  })
                    .then((response3) => {
                      this.comission =
                        response3.data[0] + " EAs - " + response3.data[1] + " ";

                      const totalT =
                        parseInt(this.tokenInput) + parseInt(response3.data[0]);
                      const totalF =
                        parseFloat(this.fiatInput) +
                        parseFloat(response3.data[1]);

                      this.total = totalT + " EAs - " + totalF + " ";
                      this.controlInfo.dismiss();
                    })
                    .catch((err) => {
                      console.log("Error => " + err);
                      this.controlInfo.dismiss();
                    });
                })
                .catch((err) => {
                  console.log("Error => " + err);
                  this.controlInfo.dismiss();
                });
            })
            .catch((err) => {
              console.log("Error => " + err);
              this.controlInfo.dismiss();
            });
        });
    },
  },
  watch: {
    segmentValue: function () {
      if (this.segmentValue == "fiat") {
        this.disableTokens = true;
        this.disableFiat = false;
      } else {
        this.disableTokens = false;
        this.disableFiat = true;
      }
    },
    tokenInput: function () {
      if (this.disableFiat) {
        this.fiatInput =
          Math.round(this.tokenInput * 0.00001 * this.changePrice * 100) / 100;
      }

      if (this.tokenInput != "" && this.tokenInput != 0) {
        if (parseFloat(this.tokenInput) < parseFloat(this.balance)) {
          this.cardStyle = this.cardGreen;
          axios({
            url:
              "http://10.144.3.190:3013/getGasEstimation?method=send&addr=" +
              this.t +
              "&q=" +
              this.tokenInput +
              "&currency=" +
              this.currency,
            method: "get",
          })
            .then((response2) => {
              this.comission =
                Math.ceil(parseInt(response2.data[0])) +
                " EAs - " +
                response2.data[1] +
                " ";

              const totalT =
                parseInt(this.tokenInput) +
                Math.ceil(parseInt(response2.data[0]));
              const totalF =
                parseFloat(this.fiatInput) + parseFloat(response2.data[1]);

              this.total = totalT + " EAs - " + totalF + " ";

              if (totalT <= this.balance) {
                this.dataCorrect = true;
                this.cardStyle = this.cardGreen;
              } else {
                this.dataCorrect = false;
                this.cardStyle = this.cardRed;
              }
            })
            .catch((err) => {
              console.log("Error => " + err);
            });
        } else {
          this.cardStyle = this.cardRed;
        }
      } else {
        this.cardStyle = this.cardRed;
      }
    },
    fiatInput: function () {
      if (this.disableTokens) {
        this.tokenInput = Math.round(
          this.fiatInput / this.changePrice / 0.00001
        );
      }
    },
  },
  ionViewDidEnter: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
    NativeStorage.getItem("currency").then((x) => (this.currency = x));
    NativeStorage.getItem("login").then((res) => {
      this.t = res["tokenAddress"];
      this.m = res["mail"];
      this.myidentifier = res["identifier"];

      this.loadData();
    });
  },
  setup: function () {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    return { goBack };
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
</style>