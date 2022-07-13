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
            My Dashbord
          </router-link>
        </q-toolbar-title>

         <q-btn-dropdown
          class=""
          color="white"
          label="username"
          no-caps
          flat
        >
          <q-list dense>
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
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen" 
      show-if-above
      bordered
      :width="200"
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

          <q-item :to="{ name: 'users' }" clickable v-ripple>
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
          </q-item>

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
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(true)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>