<template>
  <div class="home">
    <v-container>
      <v-card dark width="600" light class="mx-auto p-4">
        <v-container>
          <h1>Find your fav song</h1>
          <v-form v-on:submit.prevent="searchMusicOnTemplate">
            <v-row >
              <v-col  cols="12" lg="11" md="12" sm="1" class="d-flex">
                <v-text-field placeholder="Coldplay - yellow" v-model="search" type="text"></v-text-field>
                <div class="my-auto">
                  <v-btn type="submit" icon>
                    <i class="material-icons">search</i>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>

        </v-container>
      </v-card>

      <main>
        <v-row >
          <v-col v-for="(music, idx) in getMusics" :key="idx" cols="12" lg="4" md="6" sm="12">
              <CardMusic  
                :item="music" 
                v-on:playThisMusic="playMusic($event)" 
                v-on:pauseThisMusic="pauseMusic($event)"
              />
          </v-col>
        </v-row>
      </main>

    </v-container>
    <Reproductor :music="currentMusic"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CardMusic from '@/components/CardMusic';
import Reproductor from '@/components/Reproductor';

export default {
  name: "Home",
  components: {
    CardMusic,
    Reproductor
  },
  data() {
    return {
      search: "",
      currentMusic: {},
      reproductor: null,
      tempMusic: null
    };
  },
  mounted(){  
    this.reproductor = document.getElementById("audio-player");
    //this.reproductor.addEventListener('canplaythrough', this.playAudio);
    this.reproductor.addEventListener('canplay', this.playAudio);
    this.reproductor.addEventListener('ended', this.playAudio);
    this.reproductor.addEventListener('pause', this.pauseAudio);
    this.reproductor.addEventListener('play', this.playAudio);
  },
  computed: {
    ...mapGetters(["getMusics", "getResultsCount"])
  },
  methods: {
    ...mapActions(["searchMusic"]),
    async searchMusicOnTemplate() {
      if(!this.search) return alert("Escribe una palabra clave para buscar")
      const params = {
        term: this.search,
        lang: 'en_us',
        version: 2
      };
      await this.searchMusic(params);
    },
    playAudio(){
      document.getElementById('reproductor').classList.add('animation-wave');
      this.$store.commit('setIsPlaying', true);
      this.reproductor.play();
    },
    pauseAudio(){
      document.getElementById('reproductor').classList.remove('animation-wave');
      this.$store.commit('setIsPlaying', false);
      this.reproductor.pause();
    },
    playMusic(tema){
      try {
        this.currentMusic = tema;
        this.$store.commit('setCurrentMusic', tema);
        if(!this.$store.state.isPlaying){
          this.playAudio();
        }
      } catch (error) {}
    },
    pauseMusic(tema){
      this.tempMusic = {...tema}
      this.pauseAudio();
    }
  }
};
</script>
<style>
.p-4 {
  padding: 25px !important;
}
</style>
