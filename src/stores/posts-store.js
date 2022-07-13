import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    post: {}
  }),
  getters: {
  },
  actions: {
    getAll() {
      return new Promise((resolve, reject) => {
        api.get('posts')
        .then(data => {
          resolve(data.data)
          this.posts = data.data
          console.log(data.data)
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
      })
    },
    addPost(post){
      return new Promise((resolve, reject) => {
        api.post('posts', post)
        .then(data => {
          resolve(data.data)
          this.posts.unshift(data.data)
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
    updatePost(id, post){
      return new Promise((resolve, reject) => {
        api.put('posts/' + id, post)
        .then(data => {
          resolve(data.data)
          console.log(data.data)
        })
        .catch(error => {
          reject(error)
          console.log(error)
          // return error
        })
      })
    },
    deletePost(id){
      return new Promise((resolve, reject) => {
        api.delete('posts/' + id)
        .then(data => {
          resolve(data.data)
          console.log(data)
          this.posts = this.posts.filter(post => post.id != id)
          // return data.data
        })
        .catch(error => {
          reject(error)
          console.log(error)
          // return error
        })
      })
    },
  },
});
