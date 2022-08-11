<template>
  <q-page padding>
    <div class="text-h4 text-capitalize q-mb-md">
      gestion des statuts de demandes
    </div>

    <div class="row q-mb-md">
      <div class="col-12">
        <q-table
          title="Treats"
          :rows="settingStore.statutDemandes"
          :columns="columns"
          :filter="filter"
          row-key="name"
          :rows-per-page-options="[10, 20, 50, 100]"
          wrap-cells
        >
          <template v-slot:top-left>
            <q-btn color="primary" icon="add" label="ajouter" @click="addStatutDemandeDialog = true" />
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
                      <q-item @click="statutDemandeEdit(props.row)" clickable v-close-popup>
                        <q-item-section avatar>
                          <q-avatar icon="folder" color="light" text-color="info" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Modifier</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item @click="statutDemandeDelete(props.row.id)" clickable v-close-popup>
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


    <!-- ADD TYPE STATUT DEMANDES DIALOG -->
    <q-dialog v-model="addStatutDemandeDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Ajouter type de statut de demandes</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-y-md">
            <q-input class="q-px-xs" dense color="dark" v-model="statutDemandeName" label="Nom du statut de demades  *">
            </q-input>
            <q-input class="q-px-xs" autogrow dense color="dark" v-model="statutDemandeDescription" label="Description">
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :disable="checkAddStatutDemande" @click="validateAddStatutDemande()" color="primary" label="Enregistrer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT TYPE STATUT DEMANDES DETAIL DIALOG -->
    <q-dialog v-model="editStatutDemandeDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Modifier statut de demandes</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-y-md">
            <q-input 
              class="q-px-xs" 
              dense 
              color="dark" 
              v-model="settingStore.statutDemande.name" 
              label="Nom du type d'administration  *"
            >
            </q-input>
            <q-input 
              class="q-px-xs" 
              autogrow 
              dense 
              color="dark" 
              v-model="settingStore.statutDemande.description" 
              label="Description"
            >
            </q-input>
             <q-checkbox left-label v-model="settingStore.statutDemande.enable" label="Status" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="validateStatutDemandeEdit(settingStore.statutDemande)" color="primary" label="Enregistrer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DELETE TYPE STATUT DEMANDES DIALOG -->
    <q-dialog v-model="deleteStatutDemandeDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <div class="text-h6 q-ml-xs">Vous allez supprimer cet de statut de demandes</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup color="primary" label="annuler" />
          <q-btn @click="validateDeleteStatutDemande()" no-caps color="negative" label="supprimer" />
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
  name: 'StatutDemandes',

  setup(){
    const $q = useQuasar()
    const settingStore = useSettingStore()
    const editStatutDemandeDialog = ref(false)
    const deleteStatutDemandeDialog = ref(false)
    const addStatutDemandeDialog = ref(false)
    const statutDemandeName = ref('')
    const statutDemandeDescription = ref('')
    const statutDemandeID = ref(null)
    


    // LYFE HOOCK
    onBeforeMount(() => {
      if (!settingStore.statutDemandes.length) {
        settingStore.getStatutDemandes()
      }
    })

    // COMPUTERS

    const checkAddStatutDemande = computed(() => {
      return statutDemandeName.value == ''
    })

    // METHODS

    const statutDemandeEdit = (statutDemande) => {
      settingStore.statutDemande = statutDemande
      editStatutDemandeDialog.value = true
    }

    const statutDemandeDelete = (id) => {
      statutDemandeID.value = id
      deleteStatutDemandeDialog.value = true
    }

    const validateAddStatutDemande = () => {
      let statutDemande = {
        name: statutDemandeName.value,
        description: statutDemandeDescription.value,
        //enable: true
      }
      settingStore.createStatutDemande(statutDemande)
      .then(data => {
        $q.notify({
          message: 'Vous avez ajouté un nouveau statut de demandes',
          position: 'top-right',
          type: 'positive'
        })
        addStatutDemandeDialog.value = false

        statutDemandeName.value = ''
        statutDemandeDescription.value = ''
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

    const validateStatutDemandeEdit = (statutDemande) => {
      settingStore.updateStatutDemande(statutDemande.id, statutDemande)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'Les modifications ont été enregistré',
          position: 'top-right',
          type: 'positive'
        })
        editStatutDemandeDialog.value = false
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

    const validateDeleteStatutDemande = () => {
      settingStore.deleteStatutDemande(statutDemandeID.value)
      .then(data => {
        // console.log(data)
        $q.notify({
          message: 'Le statut de demandes a été supprimer',
          position: 'top-right',
          type: 'positive'
        })
        deleteStatutDemandeDialog.value = false
        statutDemandeID.value = null
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
      editStatutDemandeDialog,
      deleteStatutDemandeDialog,
      addStatutDemandeDialog,
      statutDemandeName,
      statutDemandeDescription,

      checkAddStatutDemande,
      
      settingStore,
      validateAddStatutDemande,
      statutDemandeDelete,
      validateDeleteStatutDemande,
      statutDemandeEdit,
      validateStatutDemandeEdit,
    }
  }
}
</script>
