<script setup>
import HeaderHome from "./components/HeaderHome.vue";


</script>

<template>
  <header>
    <HeaderHome />


      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    
  </header>

  <RouterView />
</template>
