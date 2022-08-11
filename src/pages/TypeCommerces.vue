<template>
  <q-page padding>
    <div class="text-h4 text-capitalize q-mb-md">
      gestion des types de commerces
    </div>

    <div class="row q-mb-md">
      <div class="col-12">
        <q-table
          title="Treats"
          :rows="settingStore.typeCommerces"
          :columns="columns"
          :filter="filter"
          row-key="name"
          :rows-per-page-options="[10, 20, 50, 100]"
          wrap-cells
        >
          <template v-slot:top-left>
            <q-btn color="primary" icon="add" label="ajouter" @click="addTypeCommercesDialog = true" />
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
                      <q-item @click="typeCommerceEdit(props.row)" clickable v-close-popup>
                        <q-item-section avatar>
                          <q-avatar icon="folder" color="light" text-color="info" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Modifier</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item @click="typeCommerceDelete(props.row.id)" clickable v-close-popup>
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
    <q-dialog v-model="addTypeCommercesDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Ajouter un type de commerce</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-y-md">
            <q-input class="q-px-xs" dense color="dark" v-model="typeCommerceName" label="Nom du type de commerce  *">
            </q-input>
            <q-input class="q-px-xs" autogrow dense color="dark" v-model="typeCommerceDescription" label="Description">
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :disable="checkAddTypeCommerce" @click="validateAddTypeCommerce()" color="primary" label="Enregistrer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT TYPE COMMERCE DETAIL DIALOG -->
    <q-dialog v-model="editTypeCommerceDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Modifier type de commerce</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-y-md">
            <q-input 
              class="q-px-xs" 
              dense 
              color="dark" 
              v-model="settingStore.typeCommerce.name" 
              label="Nom du type de commerce  *"
            >
            </q-input>
            <q-input 
              class="q-px-xs" 
              autogrow 
              dense 
              color="dark" 
              v-model="settingStore.typeCommerce.description" 
              label="Description"
            >
            </q-input>
             <q-checkbox left-label v-model="settingStore.typeCommerce.enable" label="Status" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="validateTypeCommerceEdit(settingStore.typeCommerce)" color="primary" label="Enregistrer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DELETE TYPE COMMERCE DIALOG -->
    <q-dialog v-model="deleteTypeCommerceDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <div class="text-h6 q-ml-xs">Vous allez supprimer cet type de commerce</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup color="primary" label="annuler" />
          <q-btn @click="validateDeleteTypeCommerce()" no-caps color="negative" label="supprimer" />
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
  name: 'TypeCommerces',

  setup(){
    const $q = useQuasar()
    const settingStore = useSettingStore()
    const editTypeCommerceDialog = ref(false)
    const deleteTypeCommerceDialog = ref(false)
    const addTypeCommercesDialog = ref(false)
    const typeCommerceName = ref('')
    const typeCommerceDescription = ref('')
    const typeCommerceID = ref(null)
    


    // LYFE HOOCK
    onBeforeMount(() => {
      if (!settingStore.typeCommerces.length) {
        settingStore.getTypeCommerces()
      }
    })

    // COMPUTERS

    const checkAddTypeCommerce = computed(() => {
      return typeCommerceName.value == ''
    })

    // METHODS

    const typeCommerceEdit = (typeCommerce) => {
      settingStore.typeCommerce = typeCommerce
      editTypeCommerceDialog.value = true
    }

    const typeCommerceDelete = (id) => {
      typeCommerceID.value = id
      deleteTypeCommerceDialog.value = true
    }

    const validateAddTypeCommerce = () => {
      let typeCommerce = {
        name: typeCommerceName.value,
        description: typeCommerceDescription.value,
        // enable: true
      }
      settingStore.createTypeCommerces(typeCommerce)
      .then(data => {
        $q.notify({
          message: 'Vous avez ajouté un nouveau type de commerce',
          position: 'top-right',
          type: 'positive'
        })
        addTypeCommercesDialog.value = false

        typeCommerceName.value = ''
        typeCommerceDescription.value = ''
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

    const validateTypeCommerceEdit = (typeCommerce) => {
      settingStore.updateTypeCommerces(typeCommerce.id, typeCommerce)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'Les modifications ont été enregistré',
          position: 'top-right',
          type: 'positive'
        })
        editTypeCommerceDialog.value = false
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

    const validateDeleteTypeCommerce = () => {
      settingStore.deleteTypeCommerces(typeCommerceID.value)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'Le type de commerce a été supprimer',
          position: 'top-right',
          type: 'positive'
        })
        deleteTypeCommerceDialog.value = false
        typeCommerceID.value = null
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
      editTypeCommerceDialog,
      deleteTypeCommerceDialog,
      addTypeCommercesDialog,
      typeCommerceName,
      typeCommerceDescription,

      checkAddTypeCommerce,
      
      settingStore,
      validateAddTypeCommerce,
      typeCommerceDelete,
      validateDeleteTypeCommerce,
      typeCommerceEdit,
      validateTypeCommerceEdit,
    }
  }
}
</script>
