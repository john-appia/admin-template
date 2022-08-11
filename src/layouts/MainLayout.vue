<template>
  <q-layout view="hHh Lpr fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <router-link :to="{ name: 'home' }" class="my-link">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            IsyMairie
          </router-link>
        </q-toolbar-title>

        <q-btn class="q-mr-md" color="white" no-caps flat icon="translate" label="langues">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <img style="height: 48px; width: 48px" src="https://flagcdn.com/w320/fr.png">
                </q-item-section>
                <q-item-section>
                  <q-item-label>Français</q-item-label>
                </q-item-section>
              </q-item>
              
              <q-item clickable v-close-popup >
                <q-item-section avatar>
                  <img style="height: 48px; width: 48px" src="https://flagcdn.com/w320/gb.png">
                </q-item-section>
                <q-item-section>
                  <q-item-label>Anglais</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn color="white" no-caps flat label="Username">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>profile</q-item-label>
                </q-item-section>
              </q-item>
              
              <q-item clickable v-close-popup >
                <q-item-section avatar>
                  <q-icon color="negative" name="power_settings_new" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>deconnexion</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen" 
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item :to="{ name: 'home' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section class="text-capitalize">
              dashbord
            </q-item-section>
          </q-item>

          <!-- <q-item :to="{ name: 'users' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>
            <q-item-section class="text-capitalize">
              users
            </q-item-section>
          </q-item>

          <q-item :to="{ name: 'posts' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="post_add" />
            </q-item-section>
            <q-item-section class="text-capitalize">
              posts
            </q-item-section>
          </q-item> -->

          <q-expansion-item
            expand-separator
            icon="settings"
            label="Paramètres"
          >
            <q-item class="q-ml-lg" :to="{ name: 'typeCommerces' }" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings_applications" />
              </q-item-section>
              <q-item-section class="text-capitalize">
                type de commerces
              </q-item-section>
            </q-item>

            <q-item class="q-ml-lg" :to="{ name: 'typeAdministrations' }" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings_applications" />
              </q-item-section>
              <q-item-section class="text-capitalize">
                type administrations
              </q-item-section>
            </q-item>

            <q-item class="q-ml-lg" :to="{ name: 'statutDemandes' }" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings_applications" />
              </q-item-section>
              <q-item-section class="text-capitalize">
                statut de demandes
              </q-item-section>
            </q-item>

            <q-item class="q-ml-lg" :to="{ name: 'statutIncidents' }" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings_applications" />
              </q-item-section>
              <q-item-section class="text-capitalize">
                statut incidents
              </q-item-section>
            </q-item>

            <q-item class="q-ml-lg" :to="{ name: 'secteurActivites' }" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings_applications" />
              </q-item-section>
              <q-item-section class="text-capitalize">
                secteur d'activités
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <!-- <q-item :to="{ name: 'admins' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="admin_panel_settings" />
            </q-item-section>
            <q-item-section class="text-capitalize">
              gestion admins 
            </q-item-section>
          </q-item> -->

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { onBeforeMount ,ref } from 'vue'
import { useQuasar } from "quasar";

export default {
  setup () {
    const leftDrawerOpen = ref(true)
    const $q = useQuasar()

    onBeforeMount(() => {
      console.log($q.localStorage.getItem('adminIsyMairieToken'))
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>