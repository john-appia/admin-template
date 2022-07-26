<template>
  <q-page padding>
    <div class="text-h4 text-capitalize q-mb-md">
      gestion des utilisateurs
    </div>

    <div class="row q-mb-md">
      <div class="col-12">
        <q-table
          title="Treats"
          :rows="userStore.users"
          :columns="columns"
          :filter="filter"
          row-key="name"
          :rows-per-page-options="[10, 20, 50, 100]"
        >
          <template v-slot:top-left>
            <q-btn color="primary" icon="add" label="ajouter" @click="addUserDialog = true" />
          </template>

          <template v-slot:top-right>
            <q-input standard dense debounce="300" v-model="filter" placeholder="Recherche">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="photo" :props="props">
                <q-avatar square>
                  <img :src="props.row?.photo ? props.row?.photo : 'https://cdn.quasar.dev/img/avatar.png'">
                </q-avatar>
              </q-td>
              <q-td key="name" :props="props">
                <span @click="userDetail(props.row)" class="my-link text-blue-10 cursor-pointer">
                  {{ props.row.name }}
                </span>
              </q-td>
              <q-td key="username" :props="props">
                {{ props.row.username }}
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>
              <q-td key="phone" :props="props">
                {{ props.row.phone }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn-dropdown
                  dense
                  class=""
                  color="primary"
                  icon="more_horiz"
                >
                  <q-list dense>
                    <q-item @click="userEdit(props.row)" clickable v-close-popup>
                      <q-item-section avatar>
                        <q-avatar icon="folder" color="light" text-color="info" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Modifier</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-avatar icon="lock" color="light" text-color="warning" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>bloquer</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item @click="userDelete(props.row)" clickable v-close-popup>
                      <q-item-section avatar>
                        <q-avatar icon="delete" color="light" text-color="negative" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>supprimer</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>



    <!-- ONE USER DETAIL DIALOG -->
    <q-dialog v-model="oneUserDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Détail de l'utilisateur</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="text-center q-mb-md">
            <q-avatar size="100px">
              <img src="https://cdn.quasar.dev/img/avatar.png" alt="">
            </q-avatar>
          </div>

          <div class="">
            <span class="text-h6">{{ userStore.user.name }}</span><br>
            <span class="text-subtitle1 text-grey-9">@{{ userStore.user.username }}</span>
          </div>

          <q-separator spaced inset />

          <div class="row">
            <div class="col-6">
              <p>
                <q-icon name="phone" />
                {{ userStore.user.phone }}
              </p>
              <p>
                <q-icon name="mail" />
                {{ userStore.user.email }}
              </p>
              <p>
                <q-icon name="person_pin_circle" />
                {{ userStore.user.address.city }}, {{ userStore.user.address.street }}
              </p>
            </div>

            <div class="col-6 text-right">
              <p>
                <q-icon name="language" />
                <a :href="'http://' + userStore.user.website" target="_blank" rel="noopener noreferrer">
                  {{ userStore.user.website }}
                </a>
              </p>
              <p>
                <q-icon name="business" />
                {{ userStore.user.company.name }}
              </p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- ADD USER DIALOG -->
    <q-dialog v-model="addUserDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Ajouter un utilisateur</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <!-- <div class="text-center q-mb-md">
            <q-avatar size="100px">
              <img src="https://cdn.quasar.dev/img/avatar.png" alt="">
            </q-avatar>
          </div> -->

          <div class="q-mb-md">
            <q-input class="q-px-xs" dense color="dark" v-model="nameForm" label="Nom et Prénoms *">
            </q-input>
            <q-input class="q-px-xs" dense color="dark" v-model="usernameForm" label="Nom d'utilisateur *">
            </q-input>
          </div>

          <!-- <q-separator spaced inset /> -->

          <div class="row ">
            <div class="col-6 q-gutter-y-sm">
              <q-input class="q-px-xs" dense color="dark" v-model="phoneForm" label="Téléphone *">
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>

              <q-input class="q-px-xs" dense color="dark" v-model="emailForm" label="Email">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>

              <q-input class="q-px-xs" dense color="dark" v-model="cityForm" label="Ville" >
                <template v-slot:prepend>
                  <q-icon name="person_pin_circle" />
                </template>
              </q-input>

              <q-input class="q-px-xs" dense color="dark" v-model="streetForm" label="Quartier">
                <template v-slot:prepend>
                  <q-icon name="person_pin_circle" />
                </template>
              </q-input>
            </div>

            <div class="col-6 text-right q-gutter-y-sm">
              <q-input class="q-px-xs" dense color="dark" v-model="websiteForm" label="site web">
                <template v-slot:prepend>
                  <q-icon name="language" />
                </template>
              </q-input>

              <q-input class="q-px-xs" dense color="dark" v-model="companyForm" label="Entreprise">
                <template v-slot:prepend>
                  <q-icon name="business" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :disable="checkAddUser" @click="validateAddUser()" color="primary" label="Enregistrer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT USER DETAIL DIALOG -->
    <q-dialog v-model="editUserDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Modifier info utilisateur</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="text-center q-mb-md">
            <q-avatar size="100px">
              <img src="https://cdn.quasar.dev/img/avatar.png" alt="">
            </q-avatar>
          </div>

          <div class="q-mb-md">
            <q-input class="q-px-xs" dense color="dark" v-model="userStore.user.name" label="Nom et Prénoms">
            </q-input>
            <q-input class="q-px-xs" dense color="dark" v-model="userStore.user.username" label="Nom d'utilisateur">
            </q-input>
          </div>

          <!-- <q-separator spaced inset /> -->

          <div class="row ">
            <div class="col-6 q-gutter-y-sm">
              <q-input class="q-px-xs" dense color="dark" v-model="userStore.user.phone" >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>

              <q-input class="q-px-xs" dense color="dark" v-model="userStore.user.email" >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>

              <q-input class="q-px-xs" dense color="dark" v-model="userStore.user.address.city" label="ville" >
                <template v-slot:prepend>
                  <q-icon name="person_pin_circle" />
                </template>
              </q-input>

              <q-input class="q-px-xs" dense color="dark" v-model="userStore.user.address.street" label="quartier">
                <template v-slot:prepend>
                  <q-icon name="person_pin_circle" />
                </template>
              </q-input>
            </div>

            <div class="col-6 text-right q-gutter-y-sm">
              <q-input class="q-px-xs" dense color="dark" v-model="userStore.user.website" label="site web">
                <template v-slot:prepend>
                  <q-icon name="language" />
                </template>
              </q-input>

              <q-input class="q-px-xs" dense color="dark" v-model="userStore.user.company.name" label="Entreprise">
                <template v-slot:prepend>
                  <q-icon name="business" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="validateUserEdit(userStore.user)" color="primary" label="Enregistrer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DELETE USER DIALOG -->
    <q-dialog v-model="deleteUserDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <div class="text-h6 q-ml-xs">Vous allez supprimer cet utilisateur</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup color="primary" label="annuler" />
          <q-btn @click="validateDeleteUser(userStore.user.id)" no-caps color="negative" label="supprimer" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useUserStore } from "../stores/users-store";
import { useQuasar } from 'quasar';

const columns = [
  { name: 'photo', align: 'center', label: 'photo', field: 'photo' },
  {
    name: 'name',
    required: true,
    label: 'Nom et Prénoms',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'username', align: 'left', label: 'Nom d\'utilisateur', field: 'username', sortable: true },
  { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
  { name: 'phone', align: 'left', label: 'Téléphone', field: 'phone' },
  { name: 'action', align: 'left', label: 'Actions', field: 'action' },
]

export default {
  name: 'UsersPage',

  setup(){
    const $q = useQuasar()
    const userStore = useUserStore()
    const oneUserDialog = ref(false)
    const editUserDialog = ref(false)
    const deleteUserDialog = ref(false)
    const addUserDialog = ref(false)
    const nameForm = ref('')
    const usernameForm = ref('')
    const emailForm = ref('')
    const phoneForm = ref('')
    const cityForm = ref('')
    const streetForm = ref('')
    const websiteForm = ref('')
    const companyForm = ref('')
    


    // LYFE HOOCK
    onBeforeMount(() => {
      if (!userStore.users.length) {
        userStore.getAll()
      }
    })

    // COMPUTERS

    const checkAddUser = computed(() => {
      return nameForm.value == '' && usernameForm.value == '' && 
            emailForm.value == '' && phoneForm.value == ''
    })

    // METHODS

    const userDetail = (user) => {
      userStore.user = user
      oneUserDialog.value = true
    }

    const userEdit = (user) => {
      userStore.user = user
      editUserDialog.value = true
    }

    const userDelete = (user) => {
      userStore.user = user
      deleteUserDialog.value = true
    }

    const validateAddUser = () => {
      let user = {
        name: nameForm.value,
        username: usernameForm.value,
        email: emailForm.value,
        phone: phoneForm.value,
        address: {
          city: cityForm.value,
          street: streetForm.value,
        },
        website: websiteForm.value,
        company: {
          name: companyForm.value
        },
      }
      userStore.addUser(user)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'Vous avez ajouté un nouvel utilisateur',
          position: 'top-right',
          type: 'positive'
        })
        addUserDialog.value = false

        nameForm.value = ''
        usernameForm.value = ''
        emailForm.value = ''
        phoneForm.value = ''
        websiteForm.value = ''
        companyForm.value = ''
        cityForm.value = ''
        streetForm.value = ''
      })
      .catch(error => {
        console.log(error)
        $q.notify({
          message: 'Error serveur, veuillez réessayer plus tard',
          position: 'top-right',
          type: 'negative'
        })
      })
    }

    const validateUserEdit = (user) => {
      userStore.updateUser(user.id, user)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'Les modifications ont été enregistré',
          position: 'top-right',
          type: 'positive'
        })
        editUserDialog.value = false
      })
      .catch(error => {
        console.log(error)
        $q.notify({
          message: 'Error serveur, veuillez réessayer plus tard',
          position: 'top-right',
          type: 'negative'
        })
      })
    }


    const validateDeleteUser = (userId) => {
      userStore.deleteUser(userId)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'L\'utilisateur a été supprimer',
          position: 'top-right',
          type: 'positive'
        })
        deleteUserDialog.value = false
      })
      .catch(error => {
        console.log(error)
        $q.notify({
          message: 'Error serveur, veuillez réessayer plus tard',
          position: 'top-right',
          type: 'negative'
        })
      })
    }

    return{
      columns,
      filter: ref(''),
      oneUserDialog,
      editUserDialog,
      deleteUserDialog,
      addUserDialog,
      nameForm,
      usernameForm,
      emailForm,
      phoneForm,
      cityForm,
      streetForm,
      websiteForm,
      companyForm,

      checkAddUser,
      

      userStore,
      userDetail,
      userEdit,
      userDelete,
      validateUserEdit,
      validateDeleteUser,
      validateAddUser,
    }
  }
}
</script>
