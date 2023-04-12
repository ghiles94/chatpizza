<template>
  <div class="container mt-4">
    <TableauComp :rafraîchir="ensembleUtilisateurs" modifierURL="/user" :donnés="utilisateurs" />
    <div class="d-flex justify-content-end"><button data-bs-toggle="modal" data-bs-target="#create-utilisateurs"
        class="btn btn-outline-success"><i class="bi bi-plus"></i></button></div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="create-utilisateurs" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Ajoute un nouvel objet</h5>
          <button  ref="Close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="text-capitalize" for="nom">Nom</label>
            <input type="text" id="nom" class="form-control mb-2" v-model="name">
          </div>
          <div class="form-group">
            <label class="text-capitalize" for="prénom">Prénom</label>
            <input type="text" id="prénom" class="form-control mb-2" v-model="firstName">
          </div>
          <div class="form-group">
            <label class="text-capitalize" for="naissance">Naissance</label>
            <input type="text" id="naissance" class="form-control mb-2" v-model="birth">
          </div>
          <div class="form-group">
            <label class="text-capitalize" for="email">E-mail</label>
            <input type="email" id="email" class="form-control mb-2" v-model="email">
          </div>
          <div class="form-group">
            <label class="text-capitalize" for="password">Mot de passe</label>
            <input type="password" id="password" class="form-control mb-2" v-model="password">
          </div>
          <div class="form-group">
            <label class="text-capitalize" for="role">Rôle</label>
            <input type="text" id="role" class="form-control mb-2" v-model="role">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" @click="créerUnNouvelÉlèment" class="btn btn-success">Ajouter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStateStore } from '@/stores/state'
import { storeToRefs } from 'pinia'
</script>

<script>
import TableauComp from '../components/TableauComp.vue'
import axios from 'axios'

const BASE_URL = process.env.VUE_APP_API_URL
const store = useStateStore()
const { ensembleUtilisateurs } = store
const { utilisateurs, jetonDaccès } = storeToRefs(store)

ensembleUtilisateurs()

export default {
  name: 'RowView',
  data: function () {
    return {
      name: '',
      firstName: '',
      birth: '',
      email: '',
      password: '',
      role: ''
    }
  },
  methods: {
    async créerUnNouvelÉlèment () {
      try {
        const chargeUtile = {
          name: this.name,
          firstName: this.firstName,
          birth: this.birth,
          email: this.email,
          password: this.password,
          role: this.role
        }

        const jeton = jetonDaccès.value || sessionStorage.getItem('jetonDutilisateur')

        if (!jeton) {
          window.location.href = '/connexion'
        }

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${BASE_URL}/user`,
          headers: {
            Authorization: `Bearer ${jeton}`,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(chargeUtile)
        }

        await axios(config)
        this.$refs.Close.click()
        await ensembleUtilisateurs()
      } catch (error) {

      }
    }
  },
  components: { TableauComp }
}
</script>
