import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = process.env.VUE_APP_API_URL

export const useStateStore = defineStore('app-state', {
  state: () => {
    return {
      erreurDidentification: '',
      jetonDaccès: '',
      isLoading: false,
      commentaire: [],
      articles: [],
      employe: [],
      facture: [],
      inventaire: [],
      role: [],
      salaire: [],
      utilisateurs: []
    }
  },
  actions: {
    async connexion (email, password) {
      try {
        this.erreurDidentification = null
        const response = await axios(`${BASE_URL}/user/auth`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            email,
            password
          })
        })
        this.jetonDaccès = response.data.token
        sessionStorage.setItem('jetonDutilisateur', response.data.token)
        window.location.href = '/'
      } catch (error) {
        this.erreurDidentification = error.response?.data?.message || 'Échec de la connexion'
      }
    },
    async ensembleCommentaire () {
      try {
        if (!this.jetonDaccès) {
          this.jetonDaccès = sessionStorage.getItem('jetonDutilisateur')
        }

        const response = await axios(`${BASE_URL}/comment`, {
          headers: {
            Authorization: `bearer ${this.jetonDaccès}`
          }
        })
        this.commentaire = response?.data?.data || []
      } catch (error) {

      }
    },
    async ensembleDesArticles () {
      try {
        if (!this.jetonDaccès) {
          this.jetonDaccès = sessionStorage.getItem('jetonDutilisateur')
        }

        const response = await axios(`${BASE_URL}/article`, {
          headers: {
            Authorization: `bearer ${this.jetonDaccès}`
          }
        })
        this.articles = response?.data?.data || []
      } catch (error) {

      }
    },
    async ensembleEmploye () {
      try {
        if (!this.jetonDaccès) {
          this.jetonDaccès = sessionStorage.getItem('jetonDutilisateur')
        }

        const response = await axios(`${BASE_URL}/employee`, {
          headers: {
            Authorization: `bearer ${this.jetonDaccès}`
          }
        })
        this.employe = response?.data?.data || []
      } catch (error) {

      }
    },
    async ensembleFacture () {
      try {
        if (!this.jetonDaccès) {
          this.jetonDaccès = sessionStorage.getItem('jetonDutilisateur')
        }

        const response = await axios(`${BASE_URL}/invoice`, {
          headers: {
            Authorization: `bearer ${this.jetonDaccès}`
          }
        })
        this.facture = response?.data?.data || []
      } catch (error) {

      }
    },
    async ensembleInventaire () {
      try {
        if (!this.jetonDaccès) {
          this.jetonDaccès = sessionStorage.getItem('jetonDutilisateur')
        }

        const response = await axios(`${BASE_URL}/inventory`, {
          headers: {
            Authorization: `bearer ${this.jetonDaccès}`
          }
        })
        this.inventaire = response?.data?.data || []
      } catch (error) {

      }
    },
    async ensembleRole () {
      try {
        if (!this.jetonDaccès) {
          this.jetonDaccès = sessionStorage.getItem('jetonDutilisateur')
        }

        const response = await axios(`${BASE_URL}/role`, {
          headers: {
            Authorization: `bearer ${this.jetonDaccès}`
          }
        })
        this.role = response?.data?.data || []
      } catch (error) {

      }
    },
    async ensembleSalaire () {
      try {
        if (!this.jetonDaccès) {
          this.jetonDaccès = sessionStorage.getItem('jetonDutilisateur')
        }
        console.log(this.jetonDaccès)
        const response = await axios(`${BASE_URL}/salary`, {
          headers: {
            Authorization: `bearer ${this.jetonDaccès}`
          }
        })
        this.salaire = response?.data?.data || []
      } catch (error) {

      }
    },
    async ensembleUtilisateurs () {
      try {
        if (!this.jetonDaccès) {
          this.jetonDaccès = sessionStorage.getItem('jetonDutilisateur')
        }
        console.log(this.jetonDaccès)
        const response = await axios(`${BASE_URL}/user`, {
          headers: {
            Authorization: `bearer ${this.jetonDaccès}`
          }
        })
        this.utilisateurs = response?.data?.data || []
      } catch (error) {

      }
    }
  },
  getters: {
    obtenirCommentaire () {
      return this.commentaire
    }
  }
})
