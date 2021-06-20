<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["awardsTitle"] }}</ion-title>
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
            <ion-card class="default cardR1 ion-activatable" @click="goItem(1)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="default cardR2 ion-activatable" @click="goItem(2)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-card class="default cardR3 ion-activatable" @click="goItem(3)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="default cardR4 ion-activatable" @click="goItem(4)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-card class="default cardR5 ion-activatable" @click="goItem(5)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="default cardR6 ion-activatable" @click="goItem(6)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-card class="default cardR7 ion-activatable" @click="goItem(7)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="default cardR8 ion-activatable" @click="goItem(8)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-card class="default cardR9 ion-activatable" @click="goItem(9)">
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card
              class="default cardR10 ion-activatable"
              @click="goItem(10)"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-card
              class="default cardR11 ion-activatable"
              @click="goItem(11)"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card
              class="default cardR12 ion-activatable"
              @click="goItem(12)"
            >
              <ion-card-content>
                <ion-ripple-effect></ion-ripple-effect>
                <p class="hideText">
                  --------------------------------------------------------------------
                </p>
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
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  loadingController,
  IonRippleEffect,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";

import { useRouter } from "vue-router";

import axios from "axios";

export default defineComponent({
  name: "InfoAwards",
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
      fiatBalance: 0,
      tokenBalance: 0,
      controlBalances: null,
      currency: "eur",
      tokenAddress: "",
    };
  },
  methods: {
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
              "http://192.168.1.41:3013/getBalance?tokenAddress=" +
              this.tokenAddress +
              "&currency=" +
              this.currency,
            method: "get",
          })
            .then((response) => {
              setTimeout(() => {
                this.tokenBalance = response.data[0] + "";
                this.fiatBalance = response.data[1] + "";
                this.controlBalances.dismiss();
              }, 1000);
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
  },
  ionViewWillEnter: function () {
    NativeStorage.getItem("login").then((res) => {
      this.tokenAddress = res["tokenAddress"];
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

    const goItem = (id) => {
      router.push({ name: "detailsAwards", params: { idAward: id } });
    };

    return {
      goBack,
      goItem,
    };
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
@import "../styles/rewardStyle.css";
</style>