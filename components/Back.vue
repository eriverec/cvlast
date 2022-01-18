<template>
  <div class="back">
    <a class="cursor" @click="$router.go(-1)">Volver</a>
  </div>
</template>


<style scoped>
.back .cursor{
  cursor: pointer;
}
</style>
