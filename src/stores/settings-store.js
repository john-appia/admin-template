import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';

export const useSettingStore = defineStore('setting', {
  state: () => ({
    typeCommerces: [],
    typeCommerce: {},

    typeAdministrations: [],
    typeAdministration: {},

    statutDemandes: [],
    statutDemande: {},

    statutIncidents: [],
    statutIncident: {},
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // TYPE COMMERCES

    getTypeCommerces() {
      return new Promise((resolve, reject) => {
        api.get('type-commerces', { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.typeCommerces = data.data
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    createTypeCommerces(typeCommerce) {
      return new Promise((resolve, reject) => {
        api.post('type-commerces', typeCommerce, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.typeCommerces.push(data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updateTypeCommerces(id, typeCommerce) {
      return new Promise((resolve, reject) => {
        api.put('type-commerces/'+id, typeCommerce, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    deleteTypeCommerces(id) {
      return new Promise((resolve, reject) => {
        api.delete('type-commerces/'+id, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.typeCommerces = this.typeCommerces.filter(item => item.id != id)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    // TYPE ADMINISTRATIONS

    getTypeAdministrations() {
      return new Promise((resolve, reject) => {
        api.get('type-administrations', { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.typeAdministrations = data.data
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    createTypeAdministrations(typeAdministration) {
      return new Promise((resolve, reject) => {
        api.post('type-administrations', typeAdministration, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.typeAdministrations.push(data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updateTypeAdministrations(id, typeAdministration) {
      return new Promise((resolve, reject) => {
        api.put('type-administrations/'+id, typeAdministration, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    deleteTypeAdministrations(id) {
      return new Promise((resolve, reject) => {
        api.delete('type-administrations/'+id, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.typeAdministrations = this.typeAdministrations.filter(item => item.id != id)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

     // TYPE STATUT-DEMANDES

    getStatutDemandes() {
      return new Promise((resolve, reject) => {
        api.get('statut-demandes', { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.statutDemandes = data.data
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    createStatutDemande(statutDemande) {
      return new Promise((resolve, reject) => {
        api.post('statut-demandes', statutDemande, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.statutDemandes.push(data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updateStatutDemande(id, statutDemande) {
      return new Promise((resolve, reject) => {
        api.put('statut-demandes/'+id, statutDemande, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    deleteStatutDemande(id) {
      return new Promise((resolve, reject) => {
        api.delete('statut-demandes/'+id, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.statutDemandes = this.statutDemandes.filter(item => item.id != id)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    // TYPE STATUT INCIDENTS

    getStatutIncidents() {
      return new Promise((resolve, reject) => {
        api.get('status-incidents', { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.statutIncidents = data.data
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    createStatutIncident(statutIncident) {
      return new Promise((resolve, reject) => {
        api.post('status-incidents', statutIncident, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.statutIncidents.push(data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    updateStatutIncident(id, statutIncident) {
      return new Promise((resolve, reject) => {
        api.put('status-incidents/'+id, statutIncident, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    deleteStatutIncident(id) {
      return new Promise((resolve, reject) => {
        api.delete('status-incidents/'+id, { 
          headers: { 
            'Authorization': 'Bearer ' + LocalStorage.getItem('adminIsyMairieToken') 
        }})
        .then(data => {
          resolve(data.data)
          this.statutIncidents = this.statutIncidents.filter(item => item.id != id)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
  },
});
