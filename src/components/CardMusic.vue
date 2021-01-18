<template>
  <v-card class="my-3" dark>
    <v-img  class="white--text align-end" height="250px" :src="redimension(item.artworkUrl100)">
    </v-img>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline" v-text="item.collectionName"></v-card-title>
        <v-card-subtitle v-text="`${item.artistName} - ${item.trackName}`"></v-card-subtitle>
        <v-card-text>
          <v-btn v-if="!isCurrentMusic" color="primary" fab @click="playMusic">
            <i class="material-icons">play_arrow</i>
          </v-btn>
          <v-btn v-else class="pulse" color="primary" fab @click="pauseMusic">
            <i class="material-icons">pause</i>
          </v-btn>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: {
    item: Object
  },
  computed: {
    ...mapState({
      isCurrentMusic: function(state) {
        if (state.currentMusic.trackViewUrl === this.item.trackViewUrl && state.isPlaying) {
            return true;
        }
        return false;
      } 
    }),
    ...mapGetters(["getCurrentMusic"])
  },
  methods: {
    redimension(str) {
      return str.replace("100x100", "400x400");
    },
    playMusic() {
      this.$emit("playThisMusic", this.item);
      document.getElementById('reproductor').classList.remove('d-none');
      document.getElementById('reproductor').classList.remove('hidden');
      document.getElementById('reproductor').classList.add('animation-wave');
    },
    pauseMusic() {
      this.$emit("pauseThisMusic", this.item);
    }
  }
};
</script>

<style>
button.pulse {
  animation: shadow-pulse-purple 1s infinite;
}

.single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 300px;
}

@keyframes shadow-pulse-purple {
  0% {
    box-shadow: 0 0 0 0px rgba(53, 134, 128, 0.25);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(233, 30, 99, 0);
  }
}
</style>
