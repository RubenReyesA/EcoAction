<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-if="showUser">
          <div class="overTitle">
            {{ messages[idioma]["hello"] }} {{ user.name }}!
          </div>
        </ion-title>
        <ion-title v-if="!showUser">EcoAction</ion-title>

        <ion-buttons slot="primary" collapse="true">
          <ion-button @click="openUserInfo">
            <ion-icon
              slot="icon-only"
              v-if="showUser"
              :icon="personCircleOutline"
            >
            </ion-icon>
          </ion-button>
          <ion-button @click="updateInfoUser">
            <ion-icon
              slot="icon-only"
              v-if="showUser"
              :icon="refreshCircle"
            ></ion-icon>
          </ion-button>

          <ion-button @click="logOut">
            <ion-icon slot="icon-only" v-if="showUser" :icon="logIn"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" v-if="showUser">
            <div class="overTitle">
              {{ messages[idioma]["hello"] }} {{ user.name }}!
            </div>
          </ion-title>
          <ion-title size="large" v-if="!showUser">Eco Action</ion-title>

          <ion-buttons slot="primary" collapse="true">
            <ion-button @click="openUserInfo">
              <ion-icon
                slot="icon-only"
                v-if="showUser"
                :icon="personCircleOutline"
              >
              </ion-icon>
            </ion-button>
            <ion-button @click="updateInfoUser">
              <ion-icon
                slot="icon-only"
                v-if="showUser"
                :icon="refreshCircle"
              ></ion-icon>
            </ion-button>

            <ion-button @click="logOut">
              <ion-icon
                slot="icon-only"
                v-if="showUser"
                :icon="logIn"
              ></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <div v-if="showUser">
        <ion-refresher
          slot="fixed"
          @ionRefresh="doRefresh($event)"
          pull-min="100"
        >
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <ion-grid id="helloContainer">
          <ion-row>
            <ion-col class="ion-no-padding">
              <div class="container">
                <p id="priceTitle">{{ messages[idioma]["balanceNow"] }}</p>
              </div>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col class="ion-no-padding">
              <div class="container">
                <p id="priceValue">
                  {{ user.balance }} EA2C ----> {{ user.balanceFiat }}
                  {{ currency }}
                </p>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-grid class="container">
          <ion-row>
            <ion-col>
              <ion-button
                size="large"
                class="useLondrina"
                color="cyan"
                @click="gotoSend"
                ><ion-icon slot="start" :icon="cloudUploadOutline"></ion-icon>
                {{ messages[idioma]["sendTitle"] }}</ion-button
              >
            </ion-col>
            <ion-col>
              <ion-button
                size="large"
                class="useLondrina"
                color="cyan"
                @click="gotoReceive"
                ><ion-icon slot="start" :icon="cloudDownloadOutline"></ion-icon>
                {{ messages[idioma]["receiveTitle"] }}</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ messages[idioma]["recentAct"] }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item v-for="i in user.recentActivityList" :key="i">
                <ion-label>
                  <h2>{{ i["name"] }}</h2>
                  <h3></h3>
                  <p>{{ i["date"] }}</p>
                </ion-label>
                <ion-note slot="end">
                  <div class="container1_2">
                    {{ i["amount"] }}
                    <ion-icon class="iconItem" :icon="serverOutline"></ion-icon>
                  </div>
                </ion-note>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

      <div class="container2" v-if="!showUser">
        <img id="startImage" src="../../public/assets/images/home.png" />
        <h1 id="startTitle" class="useSora">
          {{ messages[idioma]["startTitle"] }}
        </h1>

        <div id="loginRegisterDiv">
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-card
                  class="btnCard3 ion-activatable"
                  @click="gotoLogin(controlLogin, messages, idioma)"
                  color="cyan"
                >
                  <ion-card-content>
                    <ion-ripple-effect></ion-ripple-effect>
                    <h1 class="btnLabels2 useLondrina">
                      {{ messages[idioma]["loginTitle"] }}
                    </h1>
                  </ion-card-content>
                </ion-card>
              </ion-col>
              <ion-col>
                <ion-card
                  class="btnCard3 ion-activatable"
                  @click="gotoRegister"
                  color="cyan"
                >
                  <ion-card-content>
                    <ion-ripple-effect></ion-ripple-effect>
                    <h1 class="btnLabels2 useLondrina">
                      {{ messages[idioma]["registerTitle"] }}
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
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  loadingController,
  IonCard,
  IonCardContent,
  IonRippleEffect,
  IonCardTitle,
  IonCardHeader,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";

import {
  logIn,
  refreshCircle,
  cloudDownloadOutline,
  cloudUploadOutline,
  serverOutline,
  personCircleOutline,
  chevronDownCircleOutline,
} from "ionicons/icons";

import axios from "axios";
import { NativeStorage } from "@ionic-native/native-storage";

import { useRouter } from "vue-router";
import { KeychainTouchId } from "@ionic-native/keychain-touch-id";
import sha256 from "js-sha256";

import { defineComponent } from "vue";

import EventBus from "eventing-bus";

export default defineComponent({
  name: "HomeFragment",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonRippleEffect,
    IonCardTitle,
    IonCardHeader,
    IonList,
    IonLabel,
    IonItem,
    IonNote,
    IonRefresherContent,
    IonRefresher,
  },
  data: function () {
    return {
      showUser: false,
      user: {
        name: "",
        surname: "",
        tokenAddress: "",
        mail: "",
        identifier: "",
        balance: "0",
        balanceFiat: "0",
        recentActivityList: [],
      },
      controlBalances: null,
      controlLogin: null,
      controlRecentActivity: null,
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      currency: "eur",
    };
  },
  setup: function () {
    const router = useRouter();

    const doRefresh = function (event) {
      this.updateInfoUser();

      setTimeout(() => {
        event.target.complete();
      }, 5000);
    };

    const gotoLogin = (c, messages, idioma) => {
      NativeStorage.getItem("loginPRO")
        .then((res) => {
          KeychainTouchId.isAvailable()
            .then(() => {
              KeychainTouchId.verify("loginCredentials", "Use to login")
                .then((res2) => {
                  loadingController
                    .create({
                      message: messages[idioma]["loginStart"],
                    })
                    .then((loading) => {
                      c = loading;
                      loading.present();
                      axios({
                        url: "http://10.144.3.190:3013/loginUser",
                        method: "post",
                        headers: { Accept: "application/json" },
                        data: {
                          mail: res,
                        },
                      })
                        .then((response) => {
                          if (response.status == 200) {
                            c.dismiss();
                            if (sha256(res2) == response.data) {
                              alert(messages[idioma]["loginSuccess"]);

                              EventBus.publish("startLogin", res);
                            } else {
                              alert(messages[idioma]["wrongPass"]);
                            }
                          } else {
                            c.dismiss();
                            alert(messages[idioma]["loginFail"]);
                            router.push("/main/home/login");
                          }
                        })
                        .catch((err) => {
                          c.dismiss();
                          alert("Se ha producido un error: " + err);
                          router.push("/main/home/login");
                        });
                    });
                })
                .catch((err2) => {
                  alert("Error: " + err2);
                  router.push("/main/home/login");
                });
            })
            .catch((err) => {
              alert("Error: " + err);
              router.push("/main/home/login");
            });
        })
        .catch(() => {
          router.push("/main/home/login");
        });
    };

    const gotoRegister = () => {
      router.push("/main/home/register");
    };

    const openUserInfo = () => {
      router.push("/main/home/userInfo");
    };

    const gotoSend = (b1, t1, m1) => {
      router.push("/main/home/send");
    };

    const gotoReceive = () => {
      router.push("/main/home/receive");
    };

    return {
      logIn,
      refreshCircle,
      gotoLogin,
      gotoRegister,
      serverOutline,
      openUserInfo,
      gotoSend,
      gotoReceive,
      doRefresh,
      cloudDownloadOutline,
      cloudUploadOutline,
      personCircleOutline,
      chevronDownCircleOutline,
    };
  },
  methods: {
    startInfoLogin: function (i) {
      axios({
        url: "http://10.144.3.190:3013/getAccountDetails?mail=" + i,
        method: "get",
      }).then((response) => {
        NativeStorage.setItem("login", response.data);
        this.updateDetails();
      });
    },
    getBalances: function () {
      loadingController
        .create({
          message: this.messages[this.idioma]["balanceLoading"],
        })
        .then((loading) => {
          this.controlBalances = loading;
          loading.present();
          axios({
            url:
              "http://10.144.3.190:3013/getBalance?tokenAddress=" +
              this.user.tokenAddress +
              "&currency=" +
              this.currency,
            method: "get",
          })
            .then((response) => {
              setTimeout(() => {
                this.user.balance = response.data[0] + "";
                this.user.balanceFiat = response.data[1] + "";
                this.controlBalances.dismiss();
              }, 1000);
            })
            .catch((err) => {
              console.log("Error => " + err);
              this.controlBalances.dismiss();
            });
        });
    },
    getRecentActivity: function () {
      loadingController
        .create({
          message: this.messages[this.idioma]["recentActLoading"],
        })
        .then((loading) => {
          this.controlRecentActivity = loading;
          loading.present();
          axios({
            url:
              "http://10.144.3.190:3013/getRecentActivity?tokenAddress=" +
              this.user.tokenAddress +
              "&mail=" +
              this.user.mail,
            method: "get",
          })
            .then((response) => {
              this.user.recentActivityList = response.data;
              this.controlRecentActivity.dismiss();
            })
            .catch((err) => {
              console.log("Error => " + err);
              this.controlRecentActivity.dismiss();
            });
        });
    },
    logOut: function () {
      NativeStorage.remove("login");
      alert(this.messages[this.idioma]["loginExit"]);
      this.updateDetails();
    },
    updateInfoUser: function () {
      this.getBalances();

      setTimeout(() => {
        this.getRecentActivity();
      }, 3000);
    },
    updateDetails: function () {
      NativeStorage.getItem("login")
        .then((res) => {
          this.user.name = res["name"];
          this.user.surname = res["surname"];
          this.user.mail = res["mail"];
          this.user.tokenAddress = res["tokenAddress"];
          this.user.identifier = res["identifier"];

          NativeStorage.setItem("tokenAddress", this.user.tokenAddress);
          EventBus.publish("checkBiometrics");

          this.showUser = true;
          this.updateInfoUser();
        })
        .catch(() => {
          this.showUser = false;
          this.user = {
            name: "",
            surname: "",
            mail: "",
            tokenAddress: "",
            identifier: "",
            balance: "0",
            balanceFiat: "0",
            recentActivityList: [],
          };
        });
    },
  },
  mounted: async function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
    NativeStorage.getItem("currency").then((x) => {
      if (x == 0) {
        this.currency = "eur";
        NativeStorage.setItem("currency", this.currency);
      } else {
        this.currency = x;
      }
    });
    this.updateDetails();
    EventBus.on("updateDetails", this.updateDetails);
    EventBus.on("startLogin", this.startInfoLogin);
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
</style>