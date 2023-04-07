<script setup>
const { data: trainers } = await useTrainers();
</script>

<template>
  <div>
    <h1>つづきからはじめる</h1>
    <GamifyList>
      <GamifyItem v-for="trainer in trainers" :key="trainer">
        <NuxtLink :to="`/trainer/${trainer}`"> {{ trainer }}</NuxtLink>
        (てもちバケモンは　{{ trainer.length }}ひき)
      </GamifyItem>
    </GamifyList>
  </div>
  <div>
    <GamifyItem
      ><RouterLink to="/">さいしょのがめんにもどる</RouterLink>
    </GamifyItem>
  </div>
</template>
