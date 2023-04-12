<template>
  <div class="container mt-4">
    <TableauComp :rafraîchir="ensembleInventaire" modifierURL="/inventory" :donnés="inventaire" />

    <div class="d-flex justify-content-end"><button data-bs-toggle="modal"
            data-bs-target="#create-inventaire" class="btn btn-outline-success"><i class="bi bi-plus"></i></button></div></div>
      <!-- Modal -->
      <div class="modal fade" id="create-inventaire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Ajoute un nouvel objet</h5>
          <button ref="Close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="text-capitalize" for="quantite">Quantité</label>
            <input type="text" id="quantite" class="form-control mb-2" v-model="quantity">
          </div>
          <div class="form-group">
            <label class="text-capitalize" for="nom">Nom</label>
            <input type="text" id="nom" class="form-control mb-2" v-model="name">
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
const { ensembleInventaire } = store
const { inventaire, jetonDaccès } = storeToRefs(store)

ensembleInventaire()

export default {
  name: 'InventoryView',
  data: function () {
    return {
      quantity: 1,
      name: ''
    }
  },
  methods: {
    async créerUnNouvelÉlèment () {
      try {
        const chargeUtile = {
          quantity: this.quantity,
          name: this.name
        }

        const jeton = jetonDaccès.value || sessionStorage.getItem('jetonDutilisateur')

        if (!jeton) {
          window.location.href = '/connexion'
        }

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${BASE_URL}/inventory`,
          headers: {
            Authorization: `Bearer ${jeton}`,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(chargeUtile)
        }

        await axios(config)
        this.$refs.Close.click()

        await ensembleInventaire()
      } catch (error) {

      }
    }
  },
  components: { TableauComp }

}
</script>
