<template>
  <q-page padding class="">
    <div class="row q-gutter-y-md">
      <div class="col-12 col-sm-6 col-md-3 q-px-xs ">
        <q-card class="my-card q-pa-md shadow-3">
          <q-card-section class="row">
            <div class="col">
              <q-avatar class="col-4" color="primary" text-color="white" icon="groups" />
            </div>
            <div class="col-7 offset-1">
              <div class="text-h6 text-bold">491</div>
              <div class="text-capitalize text-body1 text-grey-7">clients</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3 q-px-xs">
        <q-card class="my-card q-pa-md shadow-3">
          <q-card-section class="row">
            <div class="col">
              <q-avatar class="col-4" color="info" text-color="white" icon="post_add" />
            </div>
            <div class="col-7 offset-1">
              <div class="text-h6 text-bold">91</div>
              <div class="text-capitalize text-body1 text-grey-7">posts</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3 q-px-xs">
        <q-card class="my-card q-pa-md shadow-3">
          <q-card-section class="row">
            <div class="col">
              <q-avatar class="col-4" color="secondary" text-color="white" icon="comment" />
            </div>
            <div class="col-7 offset-1">
              <div class="text-h6 text-bold">225</div>
              <div class="text-capitalize text-body1 text-grey-7">commentaires</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3 q-px-xs">
        <q-card class="my-card q-pa-md shadow-3">
          <q-card-section class="row">
            <div class="col">
              <q-avatar class="col-4" color="warning" text-color="white" icon="task" />
            </div>
            <div class="col-7 offset-1">
              <div class="text-h6 text-bold">200</div>
              <div class="text-capitalize text-body1 text-grey-7">todos</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
