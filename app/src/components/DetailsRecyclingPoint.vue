<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{messages[idioma]["detailsRecyclingPTitle"]}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card>
        <ion-slides pager="true" :options="sliderOptions">
          <ion-slide v-for="i in myPoint['imgs']" :key="i">
            <img :src="i" />
          </ion-slide>
        </ion-slides>
        <ion-card-header>
          <ion-card-title> {{ myPoint["nom"] }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ul>
            <li
              v-for="t in myPoint['horari'][0].split('.').slice(0, -1)"
              :key="t"
            >
              {{ t }}
            </li>
          </ul>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle> {{messages[idioma]["addressTitle"]}} </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="c2">
            <ion-label v-for="a in addr" :key="a">{{ a }}</ion-label>
            <ion-button
              class="infoBTN"
              color="brown"
              @click="navigateTo"
              icon-end
              :disabled="!isAddr"
              >{{messages[idioma]["openGPSText"]}}
              <ion-icon
                class="iconBTN"
                :icon="navigateCircleOutline"
              ></ion-icon>
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle> {{messages[idioma]["phoneTitle"]}} </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="c2">
            <ion-label>{{ telf }}</ion-label>
            <ion-button
              class="infoBTN"
              color="green"
              @click="callTo"
              icon-end
              :disabled="!isTelf"
              >{{messages[idioma]["callText"]}} <ion-icon class="iconBTN" :icon="callOutline"></ion-icon>
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle> {{messages[idioma]["webTitle"]}} </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="c2">
            <ion-label>{{ url }}</ion-label>
            <ion-button
              class="infoBTN"
              @click="openURL"
              icon-end
              :disabled="!isUrl"
              >{{messages[idioma]["openWebText"]}}
              <ion-icon class="iconBTN" :icon="globeOutline"></ion-icon>
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-content>
          <div class="c2">
            <ion-list>
              <ion-item-group>
                <ion-item-divider>
                  <ion-label>{{messages[idioma]["valWasteText"]}}</ion-label>
                </ion-item-divider>
                <ion-item v-for="r1 in rV" :key="r1">
                  <ion-label text-wrap>{{ r1 }}</ion-label>
                </ion-item>
                <ion-item-divider>
                  <ion-label>{{messages[idioma]["spWasteText"]}}</ion-label>
                </ion-item-divider>
                <ion-item v-for="r2 in rE" :key="r2">
                  <ion-label text-wrap>{{ r2 }}</ion-label>
                </ion-item>
              </ion-item-group>
            </ion-list>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{messages[idioma]["ownerText"]}}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="c2">
            <ion-label v-for="t in tit" :key="t">{{ t }}</ion-label>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{messages[idioma]["expText"]}}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div class="c2">
            <ion-label>{{ expl }}</ion-label>
          </div>
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
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSlides,
  IonSlide,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonItemGroup,
  IonItemDivider,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";

import {
  callOutline,
  navigateCircleOutline,
  globeOutline,
} from "ionicons/icons";
import { CallNumber } from "@ionic-native/call-number";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { LaunchNavigator } from "@ionic-native/launch-navigator";

import axios from "axios";

export default defineComponent({
  name: "DetailsRecyclingPoint",
  props: ["deixalleriaNum"],
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
    IonCardTitle,
    IonCardContent,
    IonSlides,
    IonSlide,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonItemGroup,
    IonItemDivider,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      points: require("../../public/assets/deixalleries.json"),
      myPoint: null,
      sliderOptions: {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay: true,
      },
      telf: null,
      isTelf: false,
      addr: [],
      isAddr: false,
      url: null,
      isUrl: false,
      rV: [],
      rE: [],
      tit: [],
      expl: null,
      mail:"",
    };
  },
  ionViewWillEnter: function(){
    NativeStorage.getItem("login").then((res) => {
      this.mail = res["mail"];
    });
  },
  methods: {
    callTo: function () {
      CallNumber.callNumber(this.telf, true);

      setTimeout(
        (url) => {
          if (url == this.getURL()) {
            axios({
              url:
                "http://10.144.3.190:3013/updateStats?mail=" +
                this.mail +
                "&type=call",
              method: "get",
            });
          }
        },
        10000,
        this.getURL()
      );
    },
    navigateTo: function () {
      if (this.myPoint["coords"][0] != null) {
        LaunchNavigator.navigate(this.myPoint["coords"]);

        setTimeout(
          (url) => {
            if (url == this.getURL()) {
              axios({
                url:
                  "http://10.144.3.190:3013/updateStats?mail=" +
                  this.mail +
                  "&type=gps",
                method: "get",
              });
            }
          },
          10000,
          this.getURL()
        );
      } else {
        alert(this.messages[this.idioma]["noCoordsText"]);
      }
    },
    openURL: function () {
      InAppBrowser.create(this.url, "_system", "location=yes");
      setTimeout(
        (url) => {
          if (url == this.getURL()) {
            axios({
              url:
                "http://10.144.3.190:3013/updateStats?mail=" +
                this.mail +
                "&type=web",
              method: "get",
            });
          }
        },
        10000,
        this.getURL()
      );
    },
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
  created: function () {
    if (this.deixalleriaNum != null) {
      let found = false;
      let i = 0;

      let auxIdx = -1;

      while (i < this.points.length && !found) {
        if (this.points[i]["id"] == this.deixalleriaNum) {
          this.myPoint = this.points[i];

          //URL, DIR, TLF

          for (let j = 0; j < this.points[i]["info"].length; j++) {
            if (this.points[i]["info"][j] == "Telèfon:") {
              if (auxIdx == -1) {
                auxIdx = j;
              }
              this.telf = this.points[i]["info"][j + 1];
              this.isTelf = true;
            }

            if (this.points[i]["info"][j][0] == "Adreça web") {
              if (auxIdx == -1) {
                auxIdx = j;
              }
              this.url = this.points[i]["info"][j][1];
              this.isUrl = true;
            }
          }

          for (let j = 0; j < auxIdx; j++) {
            this.addr.push(this.points[i]["info"][j]);
            this.isAddr = true;
          }

          if (this.telf == null) {
            this.telf = this.messages[this.idioma]["unavailableText"];
          }
          if (this.addr.length == 0) {
            this.addr.push(this.messages[this.idioma]["unavailableText"]);
          }
          if (this.url == null) {
            this.url = this.messages[this.idioma]["unavailableText"];
          }

          //RV, RE

          for (let k = 1; k < this.points[i]["residusV"].length; k++) {
            const text = this.points[i]["residusV"][k].toLowerCase();

            this.rV.push(text.charAt(0).toUpperCase() + text.slice(1));
          }

          for (let k = 1; k < this.points[i]["residusE"].length; k++) {
            const text = this.points[i]["residusE"][k].toLowerCase();

            this.rE.push(text.charAt(0).toUpperCase() + text.slice(1));
          }

          //TIT, EXPL

          for (let l = 1; l < this.points[i]["titular"].length; l++) {
            this.tit.push(this.points[i]["titular"][l]);
          }

          this.tit.unshift(this.points[i]["titular"][0].split(": ")[1]);

          this.expl = this.points[i]["explotador"][0].split(": ")[1];

          found = true;
        } else {
          i++;
        }
      }
    }
  },
  setup: function () {
    const getURL = function () {
      return document.URL.split("#")[0];
    };

    return {
      callOutline,
      navigateCircleOutline,
      globeOutline,
      getURL,
    };
  },
});
</script>

<style>
@import "../styles/style.css";
</style>