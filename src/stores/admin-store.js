import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { LocalStorage } from "quasar";

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // users: [],
    admin: {}
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    getAll() {
      return new Promise((resolve, reject) => {
        api.get('users')
        .then(data => {
          resolve(data.data)
          this.users = data.data
          console.log(data.data)
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
      })
    },
    addUser(user){
      return new Promise((resolve, reject) => {
        api.post('users', user)
        .then(data => {
          resolve(data.data)
          this.users.unshift(data.data)
          console.log(data.data)
          // return data.data
        })
        .catch(error => {
          reject(error)
          console.log(error)
          // return error
        })
      })
    },
    updateUser(id, user){
      return new Promise((resolve, reject) => {
        api.put('users/' + id, user)
        .then(data => {
          resolve(data.data)
          // this.users = data.data
          console.log(data.data)
          // return data.data
        })
        .catch(error => {
          reject(error)
          console.log(error)
          // return error
        })
      })
    },
    deleteUser(id){
      return new Promise((resolve, reject) => {
        api.delete('users/' + id)
        .then(data => {
          resolve(data.data)
          console.log(data)
          this.users = this.users.filter(user => user.id != id)
          // return data.data
        })
        .catch(error => {
          reject(error)
          console.log(error)
          // return error
        })
      })
    },
    login(admin){
      return new Promise((resolve, reject) => {
        api.post('authenticate', admin)
        .then(data => {
          resolve(data.data.id_token)
          console.log(data.data.id_token)
          LocalStorage.set('adminIsyMairieToken', data.data.id_token)
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
      })
    }
  },
});
