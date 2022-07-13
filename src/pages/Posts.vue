<template>
  <q-page padding>
    <div class="text-h4 text-capitalize q-mb-md">
      gestion des posts
    </div>

    <div class="row q-mb-md">
      <div class="col-12">
        <q-table
          title="Treats"
          wrap-cells
          :rows="postStore.posts"
          :columns="columns"
          :filter="filter"
          row-key="name"
          :rows-per-page-options="[10, 20, 50, 100]"
        >
          <template v-slot:top-left>
            <q-btn disable color="primary" icon="add" label="ajouter" @click="addUserDialog = true" />
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
              <!-- <q-td key="photo" :props="props">
                <q-avatar square>
                  <img :src="props.row?.photo ? props.row?.photo : 'https://cdn.quasar.dev/img/avatar.png'">
                </q-avatar>
              </q-td> -->
              <q-td key="userId" :props="props">
                <span>
                  {{ getUser(props.row.userId) }}
                </span>
              </q-td>
              <q-td key="title" :props="props" wrap>
                <span @click="postDetail(props.row)" class="my-link text-subtitle1 text-blue-10 cursor-pointer">
                  {{ props.row.title }}
                </span>
              </q-td>
              <q-td key="action" :props="props">
                <q-btn-dropdown
                  dense
                  class=""
                  color="primary"
                  icon="more_horiz"
                  disable
                >
                  <q-list dense>
                    <q-item clickable v-close-popup>
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

                    <q-item clickable v-close-popup>
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



    <!-- ONE POST DETAIL DIALOG -->
    <q-dialog v-model="onePostDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Détail du post</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <!-- <div class="text-center q-mb-md">
            <q-avatar size="100px">
              <img src="https://cdn.quasar.dev/img/avatar.png" alt="">
            </q-avatar>
          </div> -->

          <div class="">
            <span class="text-h6">{{ postStore.post.title }}</span><br>
            <span class="text-subtitle1 text-grey-9">{{ getUser(postStore.post.userId) }}</span>
          </div>

          <q-separator spaced inset />

          <div class="">
            <p>
              {{ postStore.post.body }}
            </p>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useUserStore } from "../stores/users-store";
import { usePostStore } from "../stores/posts-store";
import { useQuasar } from 'quasar';

const columns = [
  { name: 'userId', align: 'center', label: 'Autheur', field: 'userId' },
  {
    name: 'title',
    required: true,
    label: 'Titre',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'action', align: 'left', label: 'Actions', field: 'action', sortable: true },
]

export default {
  name: 'PostsPage',

  setup(){
    const $q = useQuasar()
    const userStore = useUserStore()
    const postStore = usePostStore()
    const onePostDialog = ref(false)


    // LYFE HOOCK
    onBeforeMount(() => {
      if (!postStore.posts.length) {
        postStore.getAll()
        userStore.getAll()
      }
    })

    // COMPUTERS

    
    // METHODS

    const getUser = (id) => {
      return userStore.users[id]?.name
    }

    const postDetail = (post) => {
      postStore.post = post
      onePostDialog.value = true
    }

    return{
      columns,
      filter: ref(''),
      onePostDialog,

      userStore,
      postStore,
      postDetail,
      getUser,
    }
  }
}
</script>
