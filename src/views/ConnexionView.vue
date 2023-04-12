<template>
  <div class="container mt-5">
    <FormKit :actions="false" :submit-attrs="{
      inputClass: 'btn btn-primary'
    }" submit-label="Log in" type="form" form-class="col-md-4 col-lg-3 mt-5 mx-auto p-5 border rounded"
      @submit="submit">
      <h2>Connexion</h2>
      <FormKit name="email" label="E-mail" validation="required|email" outer-class="mb-3" input-class="form-control"
        label-class="form-label" />
      <FormKit type="password" name="password" label="Mot de passe" validation="required|length:6" outer-class="mb-3"
        input-class="form-control" label-class="form-label" />
      <button class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Connexion
      </button>
      <div v-if="erreurDidentification" class="alert alert-danger mt-3" role="alert">
       {{ erreurDidentification }}
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { useStateStore } from '@/stores/state'
import { storeToRefs } from 'pinia'
</script>

<script>

const store = useStateStore()

const { connexion } = store
const { isLoading, erreurDidentification } = storeToRefs(store)

export default {
  methods: {
    async submit (e) {
      console.log(e)
      await connexion(e.email, e.password)
    }
  }
}
</script>
