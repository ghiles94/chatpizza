<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg  bg-body-tertiary bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="./assets/logo.png" alt="Bootstrap" width="100" height="30">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav text-white me-auto mb-2 mb-lg-0">
          <li class="nav-item" >
            <router-link class="nav-link text-white" to="/">Maison</router-link>
          </li>
          <li class="nav-item text-nowrap">
            <router-link class="nav-link text-white" to="/articles">Des articles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/commentaire">Commentaire</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/employee">Employé</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/inventaire">Inventaire</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/facture">Facture</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/role">Rôle</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/salaire">Salaire</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/utilisateurs">Utilisateurs</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <router-view />
</template>

<style scoped>
.active {
  color: #f48c24 !important
}
</style>
