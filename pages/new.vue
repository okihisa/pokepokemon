<script setup>
const router = useRouter();
const config = useRuntimeConfig();
const trainerName = ref("");
const safeTrainerName = computed(() => trimAvoidCharacters(trainerName.value));
const valid = computed(() => safeTrainerName.value.length > 0);
const onSubmit = async () => {
  const response = await fetch(`${config.backendOrigin}/api/trainer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: safeTrainerName.value,
    }),
  });
  if (!response.ok) return;
  router.push(`/trainer/${safeTrainerName.value}`);
};
const { dialog, onOpen, onClose } = useDialog();
</script>

<template>
  <div>
    <h1>トレーナーになるます！</h1>
    <p>はじめにあなたの名前を教えてください。</p>
    <form @submit.prevent>
      <div class="item">
        <label for="name">名前</label
        ><span id="name-description">一部の文字は都合により消えます</span>
        <input
          id="name"
          v-model="trainerName"
          aria-describedby="name-description"
          @keydown.enter="valid && onOpen(true)"
        />
      </div>
      <GamifyButton type="button" :disabled="!valid" @click="onOpen(true)"
        >きまった！</GamifyButton
      >
    </form>

    <GamifyItem
      ><RouterLink to="/">さいしょのがめんにもどる</RouterLink></GamifyItem
    >

    <GamifyDialog
      v-if="dialog"
      id="confirm-submit"
      title="かくにん"
      :description="`${safeTrainerName} というなまえで良い？`"
      @close="onClose"
    >
      <GamifyList :border="false" description="horizon">
        <GamifyItem>
          <GamifyButton @click="onClose">いいややっぱりちがいます</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onSubmit">そうです</GamifyButton>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
  </div>
</template>

<style scoped>
form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
