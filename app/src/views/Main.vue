<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom" v-if="control">
        <ion-tab-button tab="home" href="/main/home">
          <ion-icon :icon="home" />
          <ion-label>{{ messages[idioma]["homeTab"] }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/main/search">
          <ion-icon :icon="search" />
          <ion-label>{{ messages[idioma]["searchTab"] }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="info" href="/main/info">
          <ion-icon :icon="informationCircle" />
          <ion-label>{{ messages[idioma]["infoTab"] }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/main/settings">
          <ion-icon :icon="cog" />
          <ion-label>{{ messages[idioma]["configTab"] }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { informationCircle, search, home, cog } from "ionicons/icons";

import { NativeStorage } from "@ionic-native/native-storage";

import { defineComponent } from "vue";
import { Keyboard } from "@ionic-native/keyboard";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

export default defineComponent({
  name: "Main",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      control: true,
    };
  },
  methods: {},
  created: function () {
    NativeStorage.remove("login");
    NativeStorage.remove("tokenAddress");
    NativeStorage.remove("administrator");
    Keyboard.onKeyboardWillShow().subscribe(() => {
      setTimeout(() => {
      this.control = false;
      },250);
    });
    Keyboard.onKeyboardWillHide().subscribe(() => {
      setTimeout(() => {
      this.control = true;
      },250);
    });
    ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
  setup() {
    return {
      informationCircle,
      search,
      home,
      cog,
    };
  },
});
</script>