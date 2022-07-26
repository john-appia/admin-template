<template>
  <q-page padding class="relative-position">
    <!-- content -->
    <!-- <div class="bule1"></div>
    <div class="bule2"></div>
    <div class="bule3 absolute-bottom-right"></div> -->
    <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated bounceOut"
    >
      <q-card class="my-card absolute-center shadow-10 my-anime" style="width: 350px">
        <q-card-section>
          <q-img
            src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
            style="height: 100px; width: 100px"
          />
          <div class="text-h5 text-capitalize q-mt-sm">se connecter</div>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input color="" v-model="text" label="Login">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Mot de passe">
              <template v-slot:prepend>
                <q-icon name="password" />
              </template>

              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            
            <div>
              <q-btn label="connexion" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </transition>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LoginPage',

  setup(){
    const isPwd = ref(true)

    return{
      isPwd
    }
  }
}
</script>
