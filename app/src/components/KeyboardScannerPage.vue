<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["keyboardScannerTitle"] }}</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          animated
          :placeholder="messages[idioma]['S_R_placeholder']"
          inputmode="search"
          id="searchBar"
          v-model="inputText"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-list v-if="idioma == 'es'">
        <ion-item
          button
          @click="openItem(product.id, filter)"
          v-for="product in filteredItems"
          :key="product.nameES"
        >
          <ion-icon :icon="trashBin" slot="end" :color="product.recycle">
          </ion-icon>

          <ion-label>{{ product.nameES }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-list v-if="idioma == 'en'">
        <ion-item
          button
          @click="openItem(product.id, filter)"
          v-for="product in filteredItems"
          :key="product.nameEN"
        >
          <ion-icon :icon="trashBin" slot="end" :color="product.recycle">
          </ion-icon>

          <ion-label>{{ product.nameEN }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-list v-if="idioma == 'ca'">
        <ion-item
          button
          @click="openItem(product.id, filter)"
          v-for="product in filteredItems"
          :key="product.nameCA"
        >
          <ion-icon :icon="trashBin" slot="end" :color="product.recycle">
          </ion-icon>

          <ion-label>{{ product.nameCA }}</ion-label>
        </ion-item>
      </ion-list>

      <p v-if="filteredItems == 0">{{messages[idioma]['noResultsText']}}</p>
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
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { NativeStorage } from "@ionic-native/native-storage";
import { trashBin } from "ionicons/icons";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "KeyboardScannerPage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
  },
  props: ["filter"],
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      products: require("../../public/assets/products.json"),
      inputText: "",
    };
  },
  computed: {
    filteredItems: function () {
      return this.products.filter((item) => {
        return (
          item["name" + this.idioma.toUpperCase()]
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .indexOf(
              this.inputText
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            ) > -1
        );
      });
    },
  },
  mounted: function () {

    NativeStorage.getItem("idioma").then((x) => {
      this.idioma = x;

      if (this.filter != undefined) {
        const products2 = [];

        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i]["recycle"] == this.filter) {
            products2.push(this.products[i]);
          }
        }

        this.products = products2;
      }

      switch (this.idioma) {
        case "ca":
          this.products.sort(function (a, b) {
            if (a["nameCA"] < b["nameCA"]) {
              return -1;
            }
            if (a["nameCA"] > b["nameCA"]) {
              return 1;
            }
            return 0;
          });
          break;

        case "es":
          this.products.sort(function (a, b) {
            if (a["nameES"] < b["nameES"]) {
              return -1;
            }
            if (a["nameES"] > b["nameES"]) {
              return 1;
            }
            return 0;
          });
          break;

        case "en":
          this.products.sort(function (a, b) {
            if (a["nameEN"] < b["nameEN"]) {
              return -1;
            }
            if (a["nameEN"] > b["nameEN"]) {
              return 1;
            }
            return 0;
          });
          break;

        default:
          break;
      }
    });
  },
  setup: function () {
    const router = useRouter();

    const openItem = (p, f) => {
      if (f != undefined) {
        router.push({ name: "residuFilter", params: { residuID: p, filtered: "true" } });
      } else {
        router.push({ name: "residu", params: { residuID: p , filtered: "false"} });
      }
    };

    return {
      trashBin,
      openItem,
    };
  },
});
</script>

<style>
@import "../styles/style.css";
@import "../styles/colorStyle.css";
</style>