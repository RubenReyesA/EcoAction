<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="messages[idioma]['backText']">
          </ion-back-button>
        </ion-buttons>
        <ion-title>{{ messages[idioma]["userInfoTitle"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="container2">
        <img
          class="loginImage"
          style="width: 50vw"
          src="../../public/assets/images/userInfoImage.png"
        />

        <h2>{{ messages[idioma]["personalDataText"] }}</h2>

        <ion-card class="cardLogin">
          <ion-card-header>
            <div class="container1_1">
              <ion-card-subtitle>{{
                messages[idioma]["nameTitle"]
              }}</ion-card-subtitle>
              <ion-buttons>
                <ion-button @click="editName">
                  <ion-icon
                    slot="icon-only"
                    :icon="pencilOutline"
                    v-if="!nameIsEdit"
                  ></ion-icon>
                  <ion-icon
                    slot="icon-only"
                    :icon="checkmarkCircleOutline"
                    v-if="nameIsEdit"
                  ></ion-icon>
                </ion-button>
              </ion-buttons>
            </div>
          </ion-card-header>
          <ion-card-content>
            <ion-input
              v-model="name"
              slot="end"
              type="text"
              v-if="nameIsEdit"
              class="inputBar"
            ></ion-input>

            <div v-if="!nameIsEdit">{{ name }}</div>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <div class="container1_1">
              <ion-card-subtitle>{{
                messages[idioma]["surnameTitle"]
              }}</ion-card-subtitle>
              <ion-buttons>
                <ion-button @click="editSurname">
                  <ion-icon
                    slot="icon-only"
                    :icon="pencilOutline"
                    v-if="!surnameIsEdit"
                  ></ion-icon>
                  <ion-icon
                    slot="icon-only"
                    :icon="checkmarkCircleOutline"
                    v-if="surnameIsEdit"
                  ></ion-icon>
                </ion-button>
              </ion-buttons>
            </div>
          </ion-card-header>
          <ion-card-content>
            <ion-input
              v-model="surname"
              slot="end"
              type="text"
              v-if="surnameIsEdit"
              class="inputBar"
            ></ion-input>

            <div v-if="!surnameIsEdit">{{ surname }}</div>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-subtitle>{{
              messages[idioma]["identifierTitle"]
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content> {{ identifier }} </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-subtitle>{{
              messages[idioma]["mailTitle"]
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content> {{ mail }} </ion-card-content>
        </ion-card>

        <h2>{{ messages[idioma]["generalDataText"] }}</h2>

        <ion-card class="cardLogin">
          <ion-card-header>
            <div class="container1_1">
              <ion-card-subtitle>{{
                messages[idioma]["achReceivedText"]
              }}</ion-card-subtitle>
              <ion-buttons>
                <ion-button @click="showAchievements">
                  <ion-icon
                    slot="icon-only"
                    :icon="arrowRedoCircleOutline"
                  ></ion-icon>
                </ion-button>
              </ion-buttons>
            </div>
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

        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-subtitle>{{
              messages[idioma]["searchesDoneText"]
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="container1_1">
              <ion-icon
                size="large"
                slot="icon-only"
                :icon="barcodeOutline"
              ></ion-icon>
              <ion-progress-bar class="progress" :value="searchCodeValue">
              </ion-progress-bar>
              <p class="useCircular">
                {{ stats.searchCode }}/{{ stats.searchCode + stats.searchPict }}
              </p>
            </div>

            <div class="container1_1">
              <ion-icon
                size="large"
                slot="icon-only"
                :icon="cameraOutline"
              ></ion-icon>
              <ion-progress-bar class="progress" :value="searchPictValue">
              </ion-progress-bar>
              <p class="useCircular">
                {{ stats.searchPict }}/{{ stats.searchCode + stats.searchPict }}
              </p>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card class="cardLogin">
          <ion-card-header>
            <ion-card-subtitle>{{
              messages[idioma]["ecoAddressText"]
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <p style="font-size: 0.8rem">{{ tokenAddress }}</p>
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
  IonButton,
  IonIcon,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  loadingController,
  IonProgressBar,
  IonInput,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";
import { useRouter } from "vue-router";
import {
  arrowRedoCircleOutline,
  cameraOutline,
  barcodeOutline,
  trophyOutline,
  pencilOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";

import axios from "axios";

export default defineComponent({
  name: "UserInfo",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonProgressBar,
    IonInput,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      controlLoading: null,
      achievements: [],
      achievementsSuccess: 0,
      achievementsCount: 0,
      achievementsSuccessValue: 0,
      searchPictValue: 0,
      searchCodeValue: 0,
      stats: [],
      name: "",
      surname: "",
      mail: "",
      tokenAddress: "",
      identifier: "",
      nameIsEdit: false,
      surnameIsEdit: false,
    };
  },
  methods: {
    update: function () {
      this.achievements = [];
      this.achievementsSuccess = 0;
      this.achievementsCount = 0;
      this.achievementsSuccessValue = 0;
      this.searchPictValue = 0;
      this.searchCodeValue = 0;
      this.stats = [];

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
            this.achievements = response.data[0];
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
    checkAchievementsAndStats: function () {
      for (const key in this.achievements) {
        if (this.achievements[key] == true) {
          this.achievementsSuccess++;
        }

        this.achievementsCount++;
      }

      this.achievementsSuccessValue =
        this.achievementsSuccess / this.achievementsCount;

      this.searchCodeValue =
        this.stats.searchCode / (this.stats.searchCode + this.stats.searchPict);

      this.searchPictValue =
        this.stats.searchPict / (this.stats.searchCode + this.stats.searchPict);
    },
    editName: function () {
      if (!this.nameIsEdit) {
        this.nameIsEdit = true;
      } else {
        const confirmation = confirm(
          this.messages[this.idioma]["modifyNameText"] + " " + this.name + "?"
        );

        if (confirmation) {
          //do Axios call
          this.nameIsEdit = false;
        }
      }
    },
    editSurname: function () {
      if (!this.surnameIsEdit) {
        this.surnameIsEdit = true;
      } else {
        const confirmation = confirm(
          this.messages[this.idioma]["modifySurnameText"] +
            " " +
            this.surname +
            "?"
        );

        if (confirmation) {
          //do Axios call
          this.surnameIsEdit = false;
        }
      }
    },
  },
  mounted: function () {
    NativeStorage.getItem("login")
      .then((res) => {
        this.name = res["name"];
        this.surname = res["surname"];
        this.mail = res["mail"];
        this.tokenAddress = res["tokenAddress"];
        this.identifier = res["identifier"];
        NativeStorage.getItem("idioma").then((x) => {
          this.idioma = x;
          this.update();
        });
      })
      .catch(() => {
        this.name = "";
        this.surname = "";
        this.mail = "";
        this.tokenAddress = "";
        this.identifier = "";
      });
  },

  setup: function () {
    const router = useRouter();

    const goBack = function () {
      router.go(-1);
    };

    const showAchievements = function () {
      router.push("/main/home/userInfo/achievements");
    };
    return {
      arrowRedoCircleOutline,
      showAchievements,
      goBack,
      cameraOutline,
      barcodeOutline,
      trophyOutline,
      pencilOutline,
      checkmarkCircleOutline,
    };
  },
});
</script>

<style scoped>
</style>