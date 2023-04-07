<script setup>
const { data: trainers } = await useTrainers();
</script>

<template>
  <div>
    <h1>BUCKET MONSTER：バケットモンスター</h1>
    <GamifyList>
      <GamifyItem v-if="trainers.length > 0">
        <NuxtLink to="/trainer">つづきからはじめる</NuxtLink> ({{
          trainers.length
        }}人の登録があります)
      </GamifyItem>
      <GamifyItem v-else>
        <span>つづきからはじめる</span>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink to="/new">あたらしくはじめる</NuxtLink>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
