
<template>
  <div class="d-flex justify-content-between">
    <div v-if="!donnés.length">
    <p>Pas de données</p>
  </div>
  </div>
  <table v-if="donnés.length" class="table">
    <thead>
      <tr>
        <th class="text-uppercase" v-for="header in créerDesEntêtes()" v-bind:key="header" v-bind:todo="header" scope="col">
          {{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in créerDesLignes()" v-bind:key="row[0]">
        <td v-for="_row in row" v-bind:key="_row">{{ _row }}</td>
        <td class="cl">
          <button type="button" class="btn btn-primary btn-sm" @click="surModifier(row[0])" data-bs-toggle="modal"
            data-bs-target="#staticBackdrop">Modifier</button>
          <button type="button" class="btn btn-danger btn-sm" @click="retirerlObjet(row[0])">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Mettre à jour l'élément</h5>
          <button ref="Close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group" v-for="(input, k) in contributions" :key="k">
            <label class="text-capitalize" for="input[input.key]">{{ input.key }}</label>
            <input type="text" id="input[input.key]" class="form-control mb-2" v-model="input[input.key]">
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" @click="àLaMiseàJour" class="btn btn-success">Mise à jour</button>
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
import axios from 'axios'

const BASE_URL = process.env.VUE_APP_API_URL

const magasin = useStateStore()

const { jetonDaccès } = storeToRefs(magasin)

export default {
  name: 'TableauComp',
  data () {
    return {
      contributions: [],
      modifierIdentifiant: ''
    }
  },
  props: {
    modifierURL: {
      type: String
    },
    rafraîchir: {
      type: Function,
      required: true,
      default () {
        return () => {}
      }
    },
    donnés: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  methods: {
    créerDesEntêtes () {
      if (!this.donnés.length) {
        return []
      }
      const enTêtes = this.donnés[0]

      return Object.keys(enTêtes)
    },
    créerDesLignes () {
      if (!this.donnés.length) {
        return []
      }
      const enTêtes = this.donnés[0]
      const lignes = []
      const clésDentête = Object.keys(enTêtes)
      for (const ligne of this.donnés) {
        const _ligne = []
        for (let i = 0; i < clésDentête.length; i++) {
          _ligne.push(ligne[clésDentête[i]])
        }

        lignes.push(_ligne)
      }

      return lignes
    },
    surModifier (id) {
      const modifier = this.donnés.filter(i => i.id === id)?.[0] || {}
      const modifierLaCopie = { ...modifier }

      delete modifierLaCopie.id
      delete modifierLaCopie.updatedAt
      delete modifierLaCopie.createdAt
      delete modifierLaCopie.Roles

      const keys = Object.keys(modifierLaCopie)
      const _contributions = []

      for (const key of keys) {
        _contributions.push({
          [key]: modifierLaCopie[key],
          key: key
        })
      }

      this.contributions = _contributions
      this.modifierIdentifiant = id
    },
    async retirerlObjet (id) {
      try {
        const jeton = jetonDaccès.value || sessionStorage.getItem('jetonDutilisateur')

        if (!jeton) {
          window.location.href = '/connexion'
        }

        const config = {
          method: 'delete',
          url: `${BASE_URL}${this.modifierURL}/${id}`,
          headers: {
            Authorization: `Bearer ${jeton}`,
            'Content-Type': 'application/json'
          }
        }

        await axios(config)

        this.rafraîchir()
      } catch (error) {

      }
    },
    async àLaMiseàJour () {
      const chargeUtileDéployer = this.contributions.map(({ key, ...rest }) => rest)
      const chargeUtile = {}
      chargeUtile.id = this.modifierIdentifiant

      for (const input of chargeUtileDéployer) {
        const key = Object.keys(input)[0]
        chargeUtile[key] = input[key]
      }

      const jeton = jetonDaccès.value || sessionStorage.getItem('jetonDutilisateur')

      if (!jeton) {
        window.location.href = '/connexion'
      }

      try {
        const config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: `${BASE_URL}${this.modifierURL}/${this.modifierIdentifiant}`,
          headers: {
            Authorization: `Bearer ${jeton}`,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(chargeUtile)
        }

        await axios(config)
        this.$refs.Close.click()
        this.rafraîchir()
      } catch (error) {

      }
    }
  }
}
</script>

<style>
.cl {
  gap: 2px;
  display: flex;
}
</style>
