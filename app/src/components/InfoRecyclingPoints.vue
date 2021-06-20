<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <IonButtons>
          <ion-back-button :text="messages[idioma]['backText']" />
        </IonButtons>
        <ion-title>{{ messages[idioma]["deixalleriesTitle"] }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card>
        <ion-card-content>
          <ion-list>
            <ion-item lines="none">
              <ion-label>{{ messages[idioma]["gps"] }}</ion-label>
              <ion-toggle v-model="usedGPS"></ion-toggle>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-segment v-model="type" id="segmentBar">
        <ion-segment-button value="list">
          <ion-label>{{ messages[idioma]["list"] }}</ion-label>
        </ion-segment-button>
        <ion-segment-button value="map">
          <ion-label>{{ messages[idioma]["map"] }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div
        id="SList"
        style="display: block"
        class="animate__animated animate__fadeIn"
      >
        <ion-toolbar>
          <ion-searchbar
            animated
            :placeholder="messages[idioma]['S_D_placeholder']"
            inputmode="search"
            id="searchBar"
            v-model="inputText"
          ></ion-searchbar>
        </ion-toolbar>

        <ion-list>
          <ion-item
            button
            @click="gotoDetails(point)"
            v-for="point in orderList(filteredItems)"
            :key="point[0]"
          >
            <ion-label>{{ point["nom"] }}</ion-label>
            <ion-note v-if="usedGPS" slot="end">{{ point["km"] }} km</ion-note>
          </ion-item>
        </ion-list>
      </div>

      <div
        id="SMap"
        style="display: block"
        class="animate__animated animate__fadeIn"
      >
        <div id="map"></div>
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
  IonCard,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSearchbar,
  IonList,
  IonItem,
  IonNote,
  IonToggle,
} from "@ionic/vue";
import { defineComponent } from "vue";

import { Geolocation } from "@ionic-native/geolocation";
import { NativeStorage } from "@ionic-native/native-storage";

import EventBus from "eventing-bus";
import { useRouter } from "vue-router";

import * as L from "leaflet";
import * as L1 from "leaflet.markercluster";

export default defineComponent({
  name: "InfoRecyclingPoints",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSearchbar,
    IonList,
    IonItem,
    IonNote,
    IonToggle,
  },
  data: function () {
    return {
      messages: {
        es: require("../../public/assets/i18n/es.json"),
        ca: require("../../public/assets/i18n/ca.json"),
        en: require("../../public/assets/i18n/en.json"),
      },
      idioma: "es",
      inputText: "",
      usedGPS: false,
      points: require("../../public/assets/deixalleries.json"),
      type: "list",
      markers: null,
      mapCenter: { lat: 41.3879, lng: 2.16992 },
      map: null,
      circle: null,
    };
  },
  watch: {
    usedGPS: function () {
      if (this.usedGPS) {
        this.lookPos();
      } else {
        this.mapCenter.lat = 41.3879;
        this.mapCenter.lng = 2.16992;
        this.map.setView([this.mapCenter.lat, this.mapCenter.lng], 12);
        if (this.circle != null) {
          this.map.removeLayer(this.circle);
        }
        this.orderList(this.filteredItems);
      }
    },
    type: function () {
      if (this.type == "list") {
        document.getElementById("SList").style.display = "block";
        document.getElementById("SMap").style.display = "none";
      } else {
        document.getElementById("SList").style.display = "none";
        document.getElementById("SMap").style.display = "block";
      }
    },
  },
  methods: {
    orderList: function (l) {
      if (this.usedGPS) {
        return l.sort((pA, pB) => {
          return pB["km"] < pA["km"];
        });
      } else {
        return l.sort((pA, pB) => {
          return pA["id"] > pB["id"];
        });
      }
    },
    generateMarkers: function () {
      this.markers = [];

      for (let i = 0; i < this.points.length; i++) {
        if (this.points[i]["coords"][0] != null) {
          this.markers.push({
            lat: this.points[i]["coords"][0],
            lng: this.points[i]["coords"][1],
            title: this.points[i]["nom"],
            id: this.points[i]["id"],
          });
        }
      }
    },
    lookPos: function () {
      Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then((resp) => {
          this.mapCenter.lat = resp.coords.latitude;
          this.mapCenter.lng = resp.coords.longitude;
          this.usedGPS = true;
          this.map.setView([this.mapCenter.lat, this.mapCenter.lng], 12);

          this.circle = L.circleMarker(
            [this.mapCenter.lat, this.mapCenter.lng],
            {
              radius: 10,
              color: "#ffffff",
              weight: 2,
              fillColor: "#5384ED",
              fillOpacity: 0.8,
            }
          ).addTo(this.map);

          const txt = `<h2 style="color: #5e9ca0; text-align: center;">${this.messages[this.idioma]['realPositionText']}</h2>`;

          this.circle.bindPopup(txt);

          for (let i = 0; i < this.points.length; i++) {
            if (this.points[i]["coords"][0] == null) {
              this.points[i]["km"] = Number.POSITIVE_INFINITY;
            } else {
              this.points[i]["km"] = this.calculateDistance(
                this.mapCenter.lng,
                this.points[i]["coords"][1],
                this.mapCenter.lat,
                this.points[i]["coords"][0]
              );
            }
          }

          this.orderList(this.filteredItems);
          console.log(resp);
        })
        .catch((err) => {
          alert(this.messages[this.idioma]['unavailableGPSText'] + err.message);
          this.usedGPS = false;
        });
    },
    calculateDistance: function (lon1, lon2, lat1, lat2) {
      const p = 0.017453292519943295;
      const c = Math.cos;
      const a =
        0.5 -
        c((lat1 - lat2) * p) / 2 +
        (c(lat2 * p) * c(lat1 * p) * (1 - c((lon1 - lon2) * p))) / 2;
      const dis = 12742 * Math.asin(Math.sqrt(a));
      return Math.trunc(dis);
    },
    a: function (x) {
      alert(x);
    },
  },
  computed: {
    filteredItems: function () {
      return this.points.filter((item) => {
        return (
          item["nom"]
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
  created: function () {
    EventBus.on("openDetails", (code) => {
      this.gotoDetails({ id: code });
    });
  },
  ionViewDidEnter() {
    this.generateMarkers();

    const mymap = L.map("map").setView([41.3879, 2.16992], 12);

    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });

    tiles.addTo(mymap);

    window.sendCode = function (code) {
      EventBus.publish("openDetails", code);
    };

    const markers = new L1.MarkerClusterGroup();

    for (let i = 0; i < this.markers.length; i++) {
      const marker = L.marker([this.markers[i].lat, this.markers[i].lng]);
      const txt = `<h2 onclick="sendCode(${this.markers[i].id})" style="color: #5e9ca0; text-align: center;">${this.markers[i].title}</h2>`;

      marker.bindPopup(txt);
      markers.addLayer(marker);
    }

    mymap.addLayer(markers);

    mymap.invalidateSize();

    this.map = mymap;
    document.getElementById("SList").style.display = "block";
    document.getElementById("SMap").style.display = "none";
  },
  mounted: function () {
    NativeStorage.getItem("idioma").then((x) => (this.idioma = x));
  },
  setup: function () {
    const router = useRouter();

    const gotoDetails = (p) => {
      router.push({ name: "deixalleria", params: { deixalleriaNum: p["id"] } });
    };

    return {
      gotoDetails,
    };
  },
});
</script>

<style>
@import "../styles/style.css";
@import "~animate.css/animate.min.css";
</style>