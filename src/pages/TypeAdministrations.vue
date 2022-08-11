<template>
  <q-page padding>
    <div class="text-h4 text-capitalize q-mb-md">
      gestion des types d'administrations
    </div>

    <div class="row q-mb-md">
      <div class="col-12">
        <q-table
          title="Treats"
          :rows="settingStore.typeAdministrations"
          :columns="columns"
          :filter="filter"
          row-key="name"
          :rows-per-page-options="[10, 20, 50, 100]"
          wrap-cells
        >
          <template v-slot:top-left>
            <q-btn color="primary" icon="add" label="ajouter" @click="addTypeAdministrationDialog = true" />
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
              <q-td key="name" :props="props">
                <span class="">
                  {{ props.row.name }}
                </span>
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="enable" :props="props">
                <q-badge :color="props.row.enable ? 'primary':'negative'">
                  {{ props.row.enable ? 'Activé':'Désactivé' }}
                </q-badge>
              </q-td>
              <q-td key="version" :props="props">
                <q-badge color="secondary">
                  {{ props.row.version }}
                </q-badge>
              </q-td>
              <q-td key="action" :props="props">
                <q-btn 
                  class="q-mr-md" 
                  color="primary" 
                  no-caps 
                  flat 
                  icon="more_vert"
                >
                  <q-menu>
                    <q-list dense>
                      <q-item @click="typeAdministrationEdit(props.row)" clickable v-close-popup>
                        <q-item-section avatar>
                          <q-avatar icon="folder" color="light" text-color="info" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Modifier</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item @click="typeAdministrationDelete(props.row.id)" clickable v-close-popup>
                        <q-item-section avatar>
                          <q-avatar icon="delete" color="light" text-color="negative" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>supprimer</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>


    <!-- ADD TYPE COMMERCE DIALOG -->
    <q-dialog v-model="addTypeAdministrationDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Ajouter un type d'administration</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-y-md">
            <q-input class="q-px-xs" dense color="dark" v-model="typeAdministrationName" label="Nom du type de commerce  *">
            </q-input>
            <q-input class="q-px-xs" autogrow dense color="dark" v-model="typeAdministrationDescription" label="Description">
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :disable="checkAddTypeAdministration" @click="validateAddTypeAdministration()" color="primary" label="Enregistrer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT TYPE COMMERCE DETAIL DIALOG -->
    <q-dialog v-model="editTypeAdministrationDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Modifier type d'administration</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-y-md">
            <q-input 
              class="q-px-xs" 
              dense 
              color="dark" 
              v-model="settingStore.typeAdministration.name" 
              label="Nom du type d'administration  *"
            >
            </q-input>
            <q-input 
              class="q-px-xs" 
              autogrow 
              dense 
              color="dark" 
              v-model="settingStore.typeAdministration.description" 
              label="Description"
            >
            </q-input>
             <q-checkbox left-label v-model="settingStore.typeAdministration.enable" label="Status" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="validateTypeAdministrationEdit(settingStore.typeAdministration)" color="primary" label="Enregistrer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DELETE TYPE COMMERCE DIALOG -->
    <q-dialog v-model="deleteTypeAdministrationDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <div class="text-h6 q-ml-xs">Vous allez supprimer cet type d'administration</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup color="primary" label="annuler" />
          <q-btn @click="validateDeleteTypeAdministration()" no-caps color="negative" label="supprimer" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useSettingStore } from "../stores/settings-store";
import { useQuasar } from 'quasar';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Type de commerce',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'description', align: 'left', label: 'Description', field: 'description' },
  { name: 'enable', align: 'left', label: 'Status', field: 'enable', sortable: true },
  { name: 'version', align: 'left', label: 'Version', field: 'version' },
  { name: 'action', align: 'left', label: 'Actions', field: 'action' },
]

export default {
  name: 'TypeAdministrations',

  setup(){
    const $q = useQuasar()
    const settingStore = useSettingStore()
    const editTypeAdministrationDialog = ref(false)
    const deleteTypeAdministrationDialog = ref(false)
    const addTypeAdministrationDialog = ref(false)
    const typeAdministrationName = ref('')
    const typeAdministrationDescription = ref('')
    const typeAdministrationID = ref(null)
    


    // LYFE HOOCK
    onBeforeMount(() => {
      if (!settingStore.typeAdministrations.length) {
        settingStore.getTypeAdministrations()
      }
    })

    // COMPUTERS

    const checkAddTypeAdministration = computed(() => {
      return typeAdministrationName.value == ''
    })

    // METHODS

    const typeAdministrationEdit = (typeAdministration) => {
      settingStore.typeAdministration = typeAdministration
      editTypeAdministrationDialog.value = true
    }

    const typeAdministrationDelete = (id) => {
      typeAdministrationID.value = id
      deleteTypeAdministrationDialog.value = true
    }

    const validateAddTypeAdministration = () => {
      let typeAdministration = {
        name: typeAdministrationName.value,
        description: typeAdministrationDescription.value,
        //enable: true
      }
      settingStore.createTypeAdministrations(typeAdministration)
      .then(data => {
        $q.notify({
          message: 'Vous avez ajouté un nouveau type d\'administration',
          position: 'top-right',
          type: 'positive'
        })
        addTypeAdministrationDialog.value = false

        typeAdministrationName.value = ''
        typeAdministrationDescription.value = ''
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

    const validateTypeAdministrationEdit = (typeAdministration) => {
      settingStore.updateTypeAdministrations(typeAdministration.id, typeAdministration)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'Les modifications ont été enregistré',
          position: 'top-right',
          type: 'positive'
        })
        editTypeAdministrationDialog.value = false
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

    const validateDeleteTypeAdministration = () => {
      settingStore.deleteTypeAdministrations(typeAdministrationID.value)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'Le type d\'administration a été supprimer',
          position: 'top-right',
          type: 'positive'
        })
        deleteTypeAdministrationDialog.value = false
        typeAdministrationID.value = null
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
      editTypeAdministrationDialog,
      deleteTypeAdministrationDialog,
      addTypeAdministrationDialog,
      typeAdministrationName,
      typeAdministrationDescription,

      checkAddTypeAdministration,
      
      settingStore,
      validateAddTypeAdministration,
      typeAdministrationDelete,
      validateDeleteTypeAdministration,
      typeAdministrationEdit,
      validateTypeAdministrationEdit,
    }
  }
}
</script>
