<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["achievementsTitle"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="container2" v-if="idioma == 'es'">
        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-title>{{
              messages[idioma]["sumUpAchTitle"]
            }}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div class="container1_1">
              <ion-icon
                size="large"
                slot="icon-only"
                :icon="trophyOutline"
              ></ion-icon>
              <ion-progress-bar
                color="success"
                class="progress"
                :value="achievementsSuccessValue"
                :buffer="achievementsSuccessValue"
              >
              </ion-progress-bar>
              <p class="useCircular">
                {{ achievementsSuccess }}/{{ achievementsCount }}
              </p>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin" v-for="item in achievements" :key="item.id">
          <ion-card-header>
            <ion-card-subtitle>{{ item.TitleES }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="container1_1">
              <ion-icon
                size="large"
                slot="icon-only"
                :name="item.Logo"
              ></ion-icon>
              <ion-progress-bar
                class="progress"
                :value="achievementsProcess[item.id] / item.Total"
              >
              </ion-progress-bar>
              <p class="useCircular">
                {{ achievementsProcess[item.id] }}/{{ item.Total }}
              </p>
            </div>
            <div class="container3">
              <ion-chip class="chip" color="warning">
                <ion-icon :icon="trophyOutline"></ion-icon>
                <ion-label
                  >{{ messages[idioma]["priceText"] }}
                  {{ item.Price }} EAs</ion-label
                >
              </ion-chip>
              <ion-button
                @click="
                  askForReward(
                    achievementsProcess[item.id],
                    item.Total,
                    item.id,
                    item.Price
                  )
                "
                :disabled="achievementsStatus[item.id]"
                >{{
                  achievementsStatus[item.id]
                    ? messages[idioma]["reclaimedText"]
                    : messages[idioma]["reclaimText"]
                }}</ion-button
              >
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <div class="container2" v-if="idioma == 'ca'">
        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-title>{{
              messages[idioma]["sumUpAchTitle"]
            }}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div class="container1_1">
              <ion-icon
                size="large"
                slot="icon-only"
                :icon="trophyOutline"
              ></ion-icon>
              <ion-progress-bar
                color="success"
                class="progress"
                :value="achievementsSuccessValue"
                :buffer="achievementsSuccessValue"
              >
              </ion-progress-bar>
              <p class="useCircular">
                {{ achievementsSuccess }}/{{ achievementsCount }}
              </p>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin" v-for="item in achievements" :key="item.id">
          <ion-card-header>
            <ion-card-subtitle>{{ item.TitleCA }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="container1_1">
              <ion-icon
                size="large"
                slot="icon-only"
                :name="item.Logo"
              ></ion-icon>
              <ion-progress-bar
                class="progress"
                :value="achievementsProcess[item.id] / item.Total"
              >
              </ion-progress-bar>
              <p class="useCircular">
                {{ achievementsProcess[item.id] }}/{{ item.Total }}
              </p>
            </div>
            <div class="container3">
              <ion-chip class="chip" color="warning">
                <ion-icon :icon="trophyOutline"></ion-icon>
                <ion-label
                  >{{ messages[idioma]["priceText"] }}
                  {{ item.Price }} EAs</ion-label
                >
              </ion-chip>
              <ion-button
                @click="
                  askForReward(
                    achievementsProcess[item.id],
                    item.Total,
                    item.id,
                    item.Price
                  )
                "
                :disabled="achievementsStatus[item.id]"
                >{{
                  achievementsStatus[item.id]
                    ? messages[idioma]["reclaimedText"]
                    : messages[idioma]["reclaimText"]
                }}</ion-button
              >
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <div class="container2" v-if="idioma == 'en'">
        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-title>{{
              messages[idioma]["sumUpAchTitle"]
            }}</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div class="container1_1">
              <ion-icon
                size="large"
                slot="icon-only"
                :icon="trophyOutline"
              ></ion-icon>
              <ion-progress-bar
                color="success"
                class="progress"
                :value="achievementsSuccessValue"
                :buffer="achievementsSuccessValue"
              >
              </ion-progress-bar>
              <p class="useCircular">
                {{ achievementsSuccess }}/{{ achievementsCount }}
              </p>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin" v-for="item in achievements" :key="item.id">
          <ion-card-header>
            <ion-card-subtitle>{{ item.TitleEN }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="container1_1">
              <ion-icon
                size="large"
                slot="icon-only"
                :name="item.Logo"
              ></ion-icon>
              <ion-progress-bar
                class="progress"
                :value="achievementsProcess[item.id] / item.Total"
              >
              </ion-progress-bar>
              <p class="useCircular">
                {{ achievementsProcess[item.id] }}/{{ item.Total }}
              </p>
            </div>
            <div class="container3">
              <ion-chip class="chip" color="warning">
                <ion-icon :icon="trophyOutline"></ion-icon>
                <ion-label
                  >{{ messages[idioma]["priceText"] }}
                  {{ item.Price }} EAs</ion-label
                >
              </ion-chip>
              <ion-button
                @click="
                  askForReward(
                    achievementsProcess[item.id],
                    item.Total,
                    item.id,
                    item.Price
                  )
                "
                :disabled="achievementsStatus[item.id]"
                >{{
                  achievementsStatus[item.id]
                    ? messages[idioma]["reclaimedText"]
                    : messages[idioma]["reclaimText"]
                }}</ion-button
              >
            </div>
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
  IonButton,
  IonButtons,
  IonBackButton,
  IonCard,
  IonIcon,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonProgressBar,
  IonChip,
  loadingController,
  IonLabel,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";
import { addIcons } from "ionicons";

import axios from "axios";
import { useRouter } from "vue-router";

import {
  searchCircleOutline,
  trophyOutline,
  sendOutline,
  arrowUndoOutline,
  navigateCircleOutline,
  callOutline,
  globeOutline,
  pricetagOutline,
  pricetagsOutline,
  helpCircleOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "Achievements",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonCard,
    IonCardTitle,
    IonIcon,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonProgressBar,
    IonChip,
    IonLabel,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      achievements: require("../../public/assets/achievements.json"),
      idioma: "es",
      achievementsStatus: [],
      achievementsSuccess: 0,
      achievementsCount: 0,
      achievementsSuccessValue: 0,
      stats: [],
      achievementsProcess: [],
      controlLoading: null,
      controlReward: null,
      mail: "",
    };
  },
  setup: function () {
    const router = useRouter();

    const goBack = function () {
      router.go(-1);
    };

    return {
      goBack,
      searchCircleOutline,
      trophyOutline,
      sendOutline,
      arrowUndoOutline,
      navigateCircleOutline,
      callOutline,
      globeOutline,
      pricetagOutline,
      pricetagsOutline,
      helpCircleOutline,
    };
  },
  created: function () {
    addIcons({
      search: searchCircleOutline,
      send: sendOutline,
      receive: arrowUndoOutline,
      maps: navigateCircleOutline,
      call: callOutline,
      internet: globeOutline,
      reward: pricetagOutline,
      rewards: pricetagsOutline,
      faq: helpCircleOutline,
    });
  },
  ionViewWillEnter: function () {
    NativeStorage.getItem("login").then((res) => {
      this.mail = res["mail"];
      this.identifier = res['identifier']
    });
    NativeStorage.getItem("idioma").then((x) => {
      this.idioma = x;
         this.update();
    });
  },
  methods: {
    update: function () {
      this.achievementsStatus = [];
      this.achievementsSuccess = 0;
      this.achievementsCount = 0;
      this.achievementsSuccessValue = 0;
      this.stats = [];
      this.achievementsProcess = [];

      loadingController
        .create({
          message: this.messages[this.idioma]["loadingData"],
        })
        .then((loading) => {
          this.controlLoading = loading;
          loading.present();

          axios({
            url: "http://10.144.3.190:3013/getStats?mail=" + this.mail,
            method: "get",
          }).then((response) => {
            this.achievementsStatus = response.data[0];
            this.stats = response.data[1];

            this.checkAchievementsAndStats();

            setTimeout(() => {
              this.controlLoading.dismiss();
            }, 2000);
          });
        })
        .catch((err) => {
          this.controlLoading.dismiss();
          alert("Error: " + err);
          this.goBack();
        });
    },
    askForReward: function (process, total, id, price) {
      if (process == total && !this.achievementsStatus[id]) {
        loadingController
          .create({
            message: this.messages[this.idioma]["reclaimingText"],
          })
          .then((loading) => {
            this.controlReward = loading;
            loading.present();

            axios({
              url:
                "http://10.144.3.190:3013/exchangeAchievement?mail=" +
                this.mail +
                "&id=" +
                id +
                "&p=" +
                price +
                "&identifier="+
                this.identifier,
              method: "get",
            }).then((response) => {
              setTimeout(() => {
                alert(this.messages[this.idioma][response.data]);
                this.controlReward.dismiss();
                this.update();
              }, 2000);
            });
          })
          .catch((err) => {
            this.controlReward.dismiss();
            alert("Error: " + err);
          });
      } else {
        alert(this.messages[this.idioma]["notAch"]);
      }
    },
    checkAchievementsAndStats: function () {
      for (const key in this.achievementsStatus) {
        if (this.achievementsStatus[key] == true) {
          this.achievementsSuccess++;
        }

        this.achievementsCount++;
      }

      this.achievementsSuccessValue =
        this.achievementsSuccess / this.achievementsCount;

      for (let index = 0; index < this.achievements.length; index++) {
        switch (this.achievements[index].id) {
          case "ach1":
            if (
              this.stats.searchCode + this.stats.searchPict >=
              this.achievements[index].Total
            ) {
              this.achievementsProcess["ach1"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach1"] =
                this.stats.searchCode + this.stats.searchPict;
            }
            break;

          case "ach2":
            if (this.stats.send >= this.achievements[index].Total) {
              this.achievementsProcess["ach2"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach2"] = this.stats.send;
            }
            break;

          case "ach3":
            if (this.stats.receive >= this.achievements[index].Total) {
              this.achievementsProcess["ach3"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach3"] = this.stats.receive;
            }
            break;

          case "ach4":
            if (this.stats.gps >= this.achievements[index].Total) {
              this.achievementsProcess["ach4"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach4"] = this.stats.gps;
            }
            break;

          case "ach5":
            if (this.stats.call >= this.achievements[index].Total) {
              this.achievementsProcess["ach5"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach5"] = this.stats.call;
            }
            break;

          case "ach6":
            if (this.stats.web >= this.achievements[index].Total) {
              this.achievementsProcess["ach6"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach6"] = this.stats.web;
            }
            break;

          case "ach7":
            if (this.stats.reward >= this.achievements[index].Total) {
              this.achievementsProcess["ach7"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach7"] = this.stats.reward;
            }
            break;

          case "ach8":
            if (this.stats.reward >= this.achievements[index].Total) {
              this.achievementsProcess["ach8"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach8"] = this.stats.reward;
            }
            break;

          case "ach9":
            if (this.stats.searchCode >= this.achievements[index].Total) {
              this.achievementsProcess["ach9"] = this.achievements[index].Total;
            } else {
              this.achievementsProcess["ach9"] = this.stats.searchCode;
            }
            break;

          case "ach10":
            if (this.stats.searchPict >= this.achievements[index].Total) {
              this.achievementsProcess["ach10"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach10"] = this.stats.searchPict;
            }
            break;

          case "ach11":
            if (this.stats.reward >= this.achievements[index].Total) {
              this.achievementsProcess["ach11"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach11"] = this.stats.reward;
            }
            break;

          case "ach12":
            if (
              this.stats.searchCode + this.stats.searchPict >=
              this.achievements[index].Total
            ) {
              this.achievementsProcess["ach12"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach12"] =
                this.stats.searchCode + this.stats.searchPict;
            }
            break;

          case "ach13":
            if (this.stats.send >= this.achievements[index].Total) {
              this.achievementsProcess["ach13"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach13"] = this.stats.send;
            }
            break;
          case "ach14":
            if (this.stats.receive >= this.achievements[index].Total) {
              this.achievementsProcess["ach14"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach14"] = this.stats.receive;
            }
            break;

          case "ach15":
            if (this.stats.call >= this.achievements[index].Total) {
              this.achievementsProcess["ach15"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach15"] = this.stats.call;
            }
            break;
          case "ach16":
            if (this.stats.reward >= this.achievements[index].Total) {
              this.achievementsProcess["ach16"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach16"] = this.stats.reward;
            }
            break;
          case "ach17":
            if (
              this.stats.searchCode + this.stats.searchPict >=
              this.achievements[index].Total
            ) {
              this.achievementsProcess["ach17"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach17"] =
                this.stats.searchCode + this.stats.searchPict;
            }
            break;
          case "ach18":
            if (
              this.stats.searchCode + this.stats.searchPict >=
              this.achievements[index].Total
            ) {
              this.achievementsProcess["ach18"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach18"] =
                this.stats.searchCode + this.stats.searchPict;
            }
            break;
          case "ach19":
            if (this.stats.gps >= this.achievements[index].Total) {
              this.achievementsProcess["ach19"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach19"] = this.stats.gps;
            }
            break;
          case "ach20":
            if (this.stats.send >= this.achievements[index].Total) {
              this.achievementsProcess["ach20"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach20"] = this.stats.send;
            }
            break;
          case "ach21":
            if (this.stats.receive >= this.achievements[index].Total) {
              this.achievementsProcess["ach21"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach21"] = this.stats.receive;
            }
            break;
          case "ach22":
            if (this.stats.web >= this.achievements[index].Total) {
              this.achievementsProcess["ach22"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach22"] = this.stats.web;
            }
            break;
          case "ach23":
            if (this.stats.reward >= this.achievements[index].Total) {
              this.achievementsProcess["ach23"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach23"] = this.stats.reward;
            }
            break;
          case "ach24":
            if (
              this.stats.searchCode + this.stats.searchPict >=
              this.achievements[index].Total
            ) {
              this.achievementsProcess["ach24"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach24"] =
                this.stats.searchCode + this.stats.searchPict;
            }
            break;
          case "ach25":
            if (
              this.stats.searchCode + this.stats.searchPict >=
              this.achievements[index].Total
            ) {
              this.achievementsProcess["ach25"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach25"] =
                this.stats.searchCode + this.stats.searchPict;
            }
            break;
          case "ach26":
            if (
              this.stats.searchCode + this.stats.searchPict >=
              this.achievements[index].Total
            ) {
              this.achievementsProcess["ach26"] = this.achievements[
                index
              ].Total;
            } else {
              this.achievementsProcess["ach26"] =
                this.stats.searchCode + this.stats.searchPict;
            }
            break;

          default:
            break;
        }
      }
    },
  },
});
</script>

<style scoped>
@import "../styles/style.css";
@import "../styles/fontStyle.css";
@import "../styles/colorStyle.css";
</style>