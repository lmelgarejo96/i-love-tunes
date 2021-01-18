<template>
  <v-card width="500" dark id="reproductor" class="reproductor d-none">
    <v-img
      class="white--text align-top o-hidden"
      height="150px"
      gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.7)"
      :src="redimension(music.artworkUrl100)"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline single-line" v-text="music.collectionName"></v-card-title>
          <v-card-subtitle class="single-line" v-text="`${music.artistName} - ${music.trackName}`"></v-card-subtitle>
          <v-card-text class="pb-0">
            <audio
              id="audio-player"
              controlslist="nodownload"
              preload
              controls
              :src="music.previewUrl"
            ></audio>
          </v-card-text>
        </div>
      </div>
    </v-img>

    <div class="close-reproductor">
      <v-btn class="mx-2" small dark icon @click="closeReproductor">
        <i class="material-icons" style="color: #fff !important; ">close</i>
      </v-btn>
    </div>

    <div class="open">
      <v-btn color="primary" fab dark @click="openReproductor">
        <i class="material-icons">keyboard_arrow_up</i>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      music: state => state.currentMusic
    })
  },
  data() {
    return {
      reproductor: null
    };
  },
  methods: {
    closeReproductor() {
      const rep = document.querySelector("#reproductor");
      rep.classList.add("hidden");
    },
    openReproductor() {
      const rep = document.querySelector("#reproductor");
      rep.classList.remove("hidden");
    },
    redimension(str) {
      if (!str) return "";
      return str.replace("100x100", "400x400");
    }
  }
};
</script>

<style lang="scss">
.reproductor {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0) scale(1);
  background: rgb(0, 99, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 99, 255, 1) 0%,
    rgba(9, 62, 121, 1) 53%,
    rgba(0, 99, 255, 1) 100%
  );
  width: 500px;
  height: 150px;
  max-height: 150px;
  transition: all ease-in-out 0.3s;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  .close-reproductor {
    position: absolute;
    top: 2px;
    right: 2px;
    button {
      outline: none;
      z-index: 10;
    }
  }
  .d-flex {
    overflow: hidden;
    position: relative;
  }
  .open {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-weight: bold;
    position: absolute;
    top: -45px;
    width: auto;
    height: auto;
    left: 50%;
    transform: translate(-50%, 0);
    transition: all ease-in-out 0.3s;
    visibility: hidden;
    button {
      outline: none !important;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: #fff;
      }
    }
  }
  audio {
    outline: none !important;
  }
  .single-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    max-width: 400px;
  }
}
.reproductor.hidden {
  bottom: -152px !important;
  .open {
    visibility: visible;
  }
}

.reproductor.d-none {
  transform: scale(0);
}

.reproductor.animation-wave {
  animation: shadow-pulse-blue ease-in-out 1s infinite;
}

@media screen and (max-width: 400px) {
  .single-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    max-width: 350px;
  }
}
//rgb(53, 134, 128)
@keyframes shadow-pulse-blue {
  0% {
    box-shadow: 0 0 0 0px rgba(53, 134, 128, 0.25);
    transform: translate(-50%, 0) scale(1);
  }
  75% {
    transform: translate(-50%, 0) scale(1.003);
  }
  100% {
    box-shadow: 0 0 0 50px rgba(0, 99, 255, 0);
    transform: translate(-50%, 0) scale(1.005);
  }
}
</style>

