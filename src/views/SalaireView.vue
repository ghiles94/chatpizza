<template>
  <div class="container mt-4">
    <TableauComp :rafraîchir="ensembleSalaire" modifierURL="/salary" :donnés="salaire" />

    <div class="d-flex justify-content-end"><button data-bs-toggle="modal"
            data-bs-target="#create-salaire" class="btn btn-outline-success"><i class="bi bi-plus"></i></button></div></div>
      <!-- Modal -->
      <div class="modal fade" id="create-salaire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Ajoute un nouvel objet</h5>
          <button ref="Close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="text-capitalize" for="montante">Montante</label>
            <input type="text" id="montante" class="form-control mb-2" v-model="amount">
          </div>
          <div class="form-group">
            <label class="text-capitalize" for="userId">User Id</label>
            <input type="text" id="userId" class="form-control mb-2" v-model="userId">
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
const { ensembleSalaire } = store
const { salaire, jetonDaccès } = storeToRefs(store)

ensembleSalaire()

export default {
  name: 'SalaireView',
  data: function () {
    return {
      amount: 0,
      userId: ''
    }
  },
  methods: {
    async créerUnNouvelÉlèment () {
      try {
        const chargeUtile = {
          amount: this.amount,
          userId: Number(this.userId)
        }

        const jeton = jetonDaccès.value || sessionStorage.getItem('jetonDutilisateur')

        if (!jeton) {
          window.location.href = '/connexion'
        }

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${BASE_URL}/salary`,
          headers: {
            Authorization: `Bearer ${jeton}`,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(chargeUtile)
        }

        await axios(config)
        this.$refs.Close.click()
        await ensembleSalaire()
      } catch (error) {

      }
    }
  },
  components: { TableauComp }
}
</script>
