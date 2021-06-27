import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Main from '../views/Main.vue';
import Register from "../components/RegisterPage.vue";
import Login from "../components/LoginPage.vue";
import UserInfo from "../components/UserInfo.vue";
import Achievements from "../components/Achievements.vue";
import SendPage from "../components/SendPage.vue";
import ReceivePage from "../components/ReceivePage.vue";
import BarcodeScanner from "../components/BarcodeScannerPage.vue";
import VisionAIScanner from "../components/VisionAIScannerPage.vue";
import KeyboardScanner from "../components/KeyboardScannerPage.vue";
import InfoAwards from "../components/InfoAwards.vue";
import InfoContainers from "../components/InfoContainers.vue";
import InfoDetailContainer from "../components/InfoDetailContainer.vue";
import InfoRecyclingPoints from "../components/InfoRecyclingPoints.vue";
import InfoWaste from "../components/InfoWaste.vue";
import InfoWhyRecycling from "../components/InfoWhyRecycling.vue";
import DetailsRecyclingPoint from "../components/DetailsRecyclingPoint.vue";
import DetailsAwards from "../components/DetailsAwards.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main/home'
  },
  {
    path: '/main/',
    component: Main,
    children: [
      {
        path: '',
        redirect: '/main/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomeFragment.vue'),
        children: [
          {
            path: "register",
            component: Register,
          },
          {
            path: "login",
            component: Login,
          },
          {
            path: "userInfo",
            component: UserInfo,
            children: [
              {
                path: "achievements",
                component: Achievements,
              },
            ]
          },
          {
            path: "send",
            component: SendPage,
          },
          {
            path: "receive",
            component: ReceivePage
          }
        ]
      },
      {
        path: 'search',
        component: () => import('@/views/SearchFragment.vue'),
        children: [
          {
            path: "barcode",
            component: BarcodeScanner,
            children: [{
              path: ":residuID",
              component: InfoWaste,
              props: true,
              name: "residu",
            }]
          },
          {
            path: "vision",
            component: VisionAIScanner,
            children: [{
              path: ":residuID",
              component: InfoWaste,
              props: true,
              name: "residu",
            }]
          },
          {
            path: "keyboard",
            component: KeyboardScanner,
            children: [{
              path: ":residuID",
              component: InfoWaste,
              props: true,
              name: "residu",
            }]
          }
        ]
      },
      {
        path: 'info',
        component: () => import('@/views/InfoFragment.vue'),
        children: [
          {
            path: "recyclingPoints",
            component: InfoRecyclingPoints,
            children: [{
              path: ":deixalleriaNum",
              component: DetailsRecyclingPoint,
              props: true,
              name: "deixalleria",
            },
            ]
          },
          {
            path: "whyReciclying",
            component: InfoWhyRecycling
          },
          {
            path: "keyboard",
            component: KeyboardScanner,
          },
          {
            path: "containers",
            component: InfoContainers,
            children: [
              {
                path: "details/:detailNum",
                component: InfoDetailContainer,
                props: true,
                name: "detailContainer",
                children: [
                  {
                    path: "keyboardFilter/:filter",
                    component: KeyboardScanner,
                    name: "keyboardFilter",
                    props: true,
                    children: [{
                      path: ":residuID",
                      component: InfoWaste,
                      props: true,
                      name: "residuFilter",
                    }]
                  }
                ]
              }
            ]
          },
          {
            path: "awards",
            component: InfoAwards,
            children:[{
              path:"detailsAwards/:idAward",
              component: DetailsAwards,
              name:"detailsAwards",
              props: true,
            }]
          },
        ]
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsFragment.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
