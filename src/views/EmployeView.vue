<template>
  <div class="container mt-4">
    <TableauComp :rafraîchir="ensembleEmploye" modifierURL="/employee" :donnés="employe" />
    <div class="d-flex justify-content-end"><button data-bs-toggle="modal"
            data-bs-target="#create-employee" class="btn btn-outline-success"><i class="bi bi-plus"></i></button></div>
  </div>

      <!-- Modal -->
      <div class="modal fade" id="create-employee" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Ajoute un nouvel objet</h5>
          <button ref="Close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="text-capitalize" for="name">Prénom</label>
            <input type="text" id="name" class="form-control mb-2" v-model="firstName">
          </div>
          <div class="form-group">
            <label class="text-capitalize" for="last">Nom de famille</label>
            <input type="text" id="last" class="form-control mb-2" v-model="lastName">
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
const { ensembleEmploye } = store
const { employe, jetonDaccès } = storeToRefs(store)

ensembleEmploye()

export default {
  name: 'EmployeeView',
  data: function () {
    return {
      employe: [],
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    async créerUnNouvelÉlèment () {
      try {
        const chargeUtile = {
          firstName: this.firstName,
          lastName: this.lastName
        }

        const jeton = jetonDaccès.value || sessionStorage.getItem('jetonDutilisateur')

        if (!jeton) {
          window.location.href = '/connexion'
        }

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${BASE_URL}/employee`,
          headers: {
            Authorization: `Bearer ${jeton}`,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(chargeUtile)
        }

        await axios(config)
        this.$refs.Close.click()
        await ensembleEmploye()
      } catch (error) {

      }
    }
  },
  components: { TableauComp }
}
</script>
