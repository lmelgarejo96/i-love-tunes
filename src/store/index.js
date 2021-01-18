import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseURI: "https://itunes.apple.com/search?",
        musics: [],
        resultsCount: 0,
        isPlaying: true,
        currentMusic: {}
    },
    mutations: {
        setMusic(state, musics) {
            state.musics = musics;
        },
        setResultsCount(state, num) {
            state.resultsCount = num;
        },
        setIsPlaying(state, bool) {
            state.isPlaying = bool;
        },
        setCurrentMusic(state, music) {
            state.currentMusic = music;
        }
    },
    actions: {
        async searchMusic({ commit, dispatch, state }, params) {
            const { data } = await axios.get(
                `https://itunes.apple.com/search?term=${params.term}`, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            );
            commit("setMusic", data.results);
            commit("setResultsCount", data.resultCount);
            console.log(data);
        }
    },
    modules: {},
    getters: {
        getMusics(state) {
            return state.musics;
        },
        getResultsCount(state) {
            return state.resultsCount;
        },
        getCurrentMusic(state) {
            return state.currentMusic;
        }
    }
});