<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const nickname = ref("");
const { data: trainer, refresh } = await useFetch(
  () => `${config.backendOrigin}/api/trainer/${route.params.name}`
);

const onDelete = async () => {
  const response = await fetch(
    `${config.backendOrigin}/api/trainer/${route.params.name}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) return;
  router.push("/");
};

const onNickname = async (pokemon) => {
  const newTrainer = trainer.value;
  const index = newTrainer.pokemons.findIndex(({ id }) => id === pokemon.id);
  newTrainer.pokemons[index].nickname = nickname.value;
  const response = await fetch(
    `${config.backendOrigin}/api/trainer/${route.params.name}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrainer),
    }
  );
  nickname.value = "";
  console.log(JSON.stringify(newTrainer));
  if (!response.ok) return;
  await refresh();
  onCloseNickname();
};

const onRelease = async (pokemonId) => {
  const response = await fetch(
    `${config.backendOrigin}/api/trainer/${route.params.name}/pokemon/${pokemonId}`,
    {
      method: "DELETE",
    }
  );
  console.log({ pokemonId, response });
  if (!response.ok) return;
  await refresh();
  onCloseRelease();
};

const {
  dialog: deleteDialog,
  onOpen: onOpenDelete,
  onClose: onCloseDelete,
} = useDialog();

const {
  dialog: nicknameDialog,
  onOpen: onOpenNickname,
  onClose: onCloseNickname,
} = useDialog();

const {
  dialog: releaseDialog,
  onOpen: onOpenRelease,
  onClose: onCloseRelease,
} = useDialog();
</script>

<template>
  <div>
    <h1>トレーナー情報</h1>
    <div class="trainer-info">
      <img src="/avatar.png" />
      <span>{{ trainer.name }}</span>
    </div>
    <GamifyButton @click="onOpenDelete(true)"
      >トレーナーをやめて家に帰る</GamifyButton
    >
    <h1>てもちポケモン</h1>
    <CatchButton :to="`/trainer/${trainer.name}/catch`"
      >ポケモンをつかまえる</CatchButton
    >
    <GamifyList>
      <GamifyItem v-for="pokemon in trainer.pokemons" :key="pokemon.id">
        {{ pokemon.id }}
        <img :src="pokemon.sprites.front_default" />
        <span class="pokemon-name">{{ pokemon.nickname || pokemon.name }}</span>
        <GamifyButton @click="onOpenNickname(pokemon)"
          >ニックネームをつける</GamifyButton
        >
        <GamifyButton @click="onOpenRelease(pokemon)"
          >はかせにおくる</GamifyButton
        >
        <ol>
          おおきさ
          {{
            pokemon.height
          }}
        </ol>
        <ol>
          おもさ
          {{
            pokemon.weight
          }}
        </ol>
      </GamifyItem>
    </GamifyList>
    <GamifyItem
      ><RouterLink to="/trainer">トレーナーを交代する</RouterLink></GamifyItem
    >
    <GamifyDialog
      v-if="deleteDialog"
      id="confirm-delete"
      title="かくにん"
      description="ほんとうにトレーナーをやめてしまうんだな！？"
      @close="onCloseDelete"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <GamifyButton @click="onCloseDelete">いいえ</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onDelete">はい</GamifyButton>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
    <GamifyDialog
      v-if="nicknameDialog"
      id="confirm-nickname"
      title="ニックネーム"
      :description="`${nicknameDialog.name}をどんなニックネームにしますか？`"
      @close="onCloseNickname"
    >
      <div class="item">
        <label for="name">ニックネーム</label>
        <input
          id="name"
          v-model="nickname"
          @keydown.enter="onNickname(nicknameDialog.nickname)"
        />
      </div>
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <GamifyButton @click="onCloseNickname">やめる</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onNickname(nicknameDialog)"
            >けってい</GamifyButton
          >
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
    <GamifyDialog
      v-if="releaseDialog"
      id="confirm-release"
      title="check"
      :description="`${releaseDialog.nickname || releaseDialog.name}`"
      @close="onCloseRelease"
    >
      <GamifyList :border="false" direction="horizon">
        <GamifyItem>
          <GamifyButton @click="onCloseRelease">いいえ</GamifyButton>
        </GamifyItem>
        <GamifyItem>
          <GamifyButton @click="onRelease(releaseDialog.id)">はい</GamifyButton>
        </GamifyItem>
      </GamifyList>
    </GamifyDialog>
  </div>
</template>

<style scoped>
.item > label {
  display: block;
  margin-bottom: 0.25rem;
}
.gamify-item:hover img {
  animation: bounce;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
}
.trainer-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.trainer-info > img {
  width: 3rem;
  height: 3rem;
}
</style>
