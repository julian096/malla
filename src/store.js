import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import jwt from 'vue-jwt-decode'
import EventBus from './bus';
const url = 'http://10.10.20.205:5000'

Vue.use(Vuex)
Vue.use(VueAxios,axios);

// axios.defaults.baseURL = 'http://10.10.20.205:5000';
// axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

export default new Vuex.Store({
  state: {
    userLoged:{
        token:"",
        rfc:""
    },
    dataUserLoged:null,
    keyAuth: null,
    courses:[],
    availableCourses:[],
    myCourses:[],
    coursesTaught:[],
    teachers:null,
    periods:null,
    letterheads:null,
},
mutations: {
    //guarda los datos del usuario logeado
    saveUserLogin(){
        let token = jwt.decode(sessionStorage.getItem("token"));
        sessionStorage.setItem("userType",token.identity[1]);
        sessionStorage.setItem("user",token.identity[0]);
    },
    // Crea el header y los datos del usuario logeado para las peticiones
    createKeyAuth(state){
        state.userLoged.token = sessionStorage.getItem("token");
        state.userLoged.rfc = sessionStorage.getItem("user");
        state.keyAuth = {headers: {'Authorization': 'Bearer '+ sessionStorage.getItem("token")}};
    },
    //guarda los cursos en el estado
    saveCourses(state,data){
        state.courses = data;
    },
    // guarda los docentes en el estado
    saveTeachers(state,data){
        state.teachers = data;
    },
    // guarda los periodos en el estado
    savePeriods(state,data){
        state.periods = data;
    },
    //guarda los cursos disponibles en el estado
    saveAvailableCourses(state,data){
        state.availableCourses = data;
    },
    //guarda la lista de los cursos en los que esta inscrito el docente
    saveMyCourses(state,data){
        state.myCourses = data;
    },
    // guarda los cursos a impartir
    saveCoursesTaught(state,data){
        state.coursesTaught = data;
    },
    // guarda los membretados
    saveLetterheads(state,data){
        state.letterheads = data;
    },
    // restaura los arrays a vacios
    restartDataCourses(state){
        state.myCourses = [];
        state.availableCourses = [];
        state.courses = [];
        state.coursesTaught = [];
    }
},
actions: {
    //login del usuario
    async login({commit},dataUser){
        try {
            const response = await axios.post(`/login`,dataUser)
            sessionStorage.setItem("token", response.data.data.access_token);
            commit('saveUserLogin',response);
            commit('createKeyAuth');
            commit('restartDataCourses');
            router.push("/inicio");
        } catch (error) {
            EventBus.$emit('getErrorMsg',error.response.data.data.message);
        }
    },
    //logout del usuario
    async logout({commit,state}){
        commit('createKeyAuth');
        try {
            await axios.get(`/logout`,state.keyAuth);
            sessionStorage.clear()
            router.push('/login');
        } catch (error) {

        }
    },
    //registro de cursos
    async saveCourse({state, commit},dataCourse){
        commit('createKeyAuth');
        try {
            await axios.post(`/courses`,dataCourse,state.keyAuth);
            return true;
        } catch (error) {
            return error.response.data.message
        }
    },
    // Cambia la contraseña del usuario
    async changePass({commit,state},pass){
        commit('createKeyAuth');
        try {
            await axios.post(`/changePassword`,pass,state.keyAuth)
            return true;
        } catch (error) {
            return error.response.data.message;
        }
    },
    //guarda un usuario al sistema
    async saveUser({commit,state},dataUser){
        commit('createKeyAuth');
        try {
            await axios.post(`/teachers`,dataUser,state.keyAuth);
            return true;
        } catch (error) {
            return error.response.data.message;
        }
    },
    //obtencion de cursos
    async getCourses({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`/courses`,state.keyAuth);
            commit('saveCourses',response.data[0]);
        } catch (error) {

        }
    },
    //obtencion de docentes
    async getTeachers({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`/teachers`,state.keyAuth);
            commit('saveTeachers',response.data);
        } catch (error) {

        }
    },
    //obtiene los periodos de todos los cursos
    async getPeriods({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`/periods`,state.keyAuth);
            commit('savePeriods',response.data.message);
        } catch (error) {

        }
    },
    //obtiene los cursos disponibles para solicitar
    async getAvailableCourses({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`/availableCourses`,state.keyAuth);
            commit('saveAvailableCourses',response.data.courses);
        } catch (error) {

        }
    },
    //obtiene una lista de los cursos a los que esta inscrito el docente
    async getMyCourses({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`/myCourses`,state.keyAuth);
            commit('saveMyCourses',response.data.courses);
        } catch (error) {

        }
    },
    // Obtiene los membretados de los documentos
    async getLetterheads({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`/metadata`,state.keyAuth)
            commit('saveLetterheads',response.data);
        } catch (error) {   

        }
    }
  }
})