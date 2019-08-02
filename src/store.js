import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import jwt from 'vue-jwt-decode'
import EventBus from './bus';
const url = 'http://192.168.0.7:5000'

Vue.use(Vuex)
Vue.use(VueAxios,axios);

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
            const response = await axios.post(`${url}/login`,dataUser)
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
            await axios.get(`${url}/logoutA`,state.keyAuth);
            sessionStorage.clear()
            router.push('/login');
        } catch (error) {

        }
    },
    // Obtiene los datos del usuario
    async getDataProfile({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/teacher/${state.userLoged.rfc}`,state.keyAuth);
            EventBus.$emit('getDataProfile',response);
        } catch (error) {
            
        }
    },
    // Obtiene los datos de un docente
    async getDataTeacher({commit,state},rfc){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/teacher/${rfc}`,state.keyAuth);
            EventBus.$emit('getDataTeacher',response);
        } catch (error) {
            
        }
    },
    // Elimina un docente
    async deleteTeacher({state},rfc){
        try {
            await axios.delete(`${url}/teacher/${rfc}`,state.keyAuth);
            EventBus.$emit('deleteTeacher');     
        } catch (error) {
            
        }
    },
    // Actualiza un docente
    async updateTeacher({state},{rfc,body}){
        try {
            await axios.put(`${url}/teacher/${rfc}`,body,state.keyAuth);
            EventBus.$emit('suUpdateTeacher');
        } catch (error) {
            EventBus.$emit('erUpdateTeacher', error.response.data.message);
        }
    },
    //registro de cursos
    async saveCourse({state, commit},dataCourse){
        commit('createKeyAuth');
        try {
            await axios.post(`${url}/courses`,dataCourse,state.keyAuth);
            return true;
        } catch (error) {
            return error.response.data.message
        }
    },
    // Obtiene los datos del curso
    async getDataCourse({commit,state},nameCourse){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/course/${nameCourse}`,state.keyAuth);
            EventBus.$emit('getDataCourse',response);
        } catch (error) {
            
        }
    },
    // Regresa valor para saber si hay docentes inscritos al curso
    async getTeachersList({state},nameCourse){
        try {
            await axios.get(`${url}/teacherList/${nameCourse}`,state.keyAuth);
            EventBus.$emit('suGetTeachersList');
        } catch (error) {
            
        }
    },
    // Peticiones a un curso
    async requestsTo({state},courseName){
        try {
            const response = await axios.get(`${url}/requestsTo/${courseName}`,state.keyAuth);
            return response;
        } catch (error) {
            
        }
    },
    // Solicita un curso
    async requestCourse({state},courseName){
        try {
            await axios.get(`${url}/courseRequest/${courseName}`,state.keyAuth);
            const response = await axios.get(`${url}/inscriptionDocument/${courseName}`,state.keyAuth);
            EventBus.$emit('suRequestCourse',response);
        } catch (error) {
            
        }
    },
    // Actualiza el curso
    async updateCourse({state},{nameCourse,body}){
        try {
            await axios.put(`${url}/course/${nameCourse}`,body,state.keyAuth);
            EventBus.$emit('suUpdateCourse');      
        } catch (error) {
            EventBus.$emit('erUpdateCourse',error.response.data.message);
        }
    },
    // Elimina un curso
    async deleteCourse({state},nameCourse){
        try {
            await axios.delete(`${url}/course/${nameCourse}`,state.keyAuth);
            EventBus.$emit('suDeleteCourse');
        } catch (error) {
            
        }
    },
    // Obtiene el PDF de lista de asistencia
    async getPDFList({state},nameCourse){
        try {
            const response = await axios.get(`${url}/course/${nameCourse}/assistantList`,state.keyAuth)
            EventBus.$emit('getPDFList',response)
        } catch (error) {
            
        }
    },
    // Cambia la contraseña del usuario
    async changePass({commit,state},pass){
        commit('createKeyAuth');
        try {
            await axios.post(`${url}/changePassword`,pass,state.keyAuth)
            return true;
        } catch (error) {
            return error.response.data.message;
        }
    },
    //guarda un usuario al sistema
    async saveUser({commit,state},dataUser){
        commit('createKeyAuth');
        try {
            await axios.post(`${url}/teachers`,dataUser,state.keyAuth);
            return true;
        } catch (error) {
            return error.response.data.message;
        }
    },
    //obtencion de cursos
    async getCourses({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/courses`,state.keyAuth);
            commit('saveCourses',response.data[0]);
        } catch (error) {

        }
    },
    //obtencion de docentes
    async getTeachers({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/teachers`,state.keyAuth);
            commit('saveTeachers',response.data);
        } catch (error) {

        }
    },
    //obtiene los periodos de todos los cursos
    async getPeriods({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/periods`,state.keyAuth);
            commit('savePeriods',response.data.message);
        } catch (error) {

        }
    },
    //obtiene los cursos disponibles para solicitar
    async getAvailableCourses({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/availableCourses`,state.keyAuth);
            commit('saveAvailableCourses',response.data.courses);
        } catch (error) {

        }
    },
    //obtiene una lista de los cursos a los que esta inscrito el docente
    async getMyCourses({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/myCourses`,state.keyAuth);
            commit('saveMyCourses',response.data.courses);
        } catch (error) {

        }
    },
    //obtiene los cursos impartidos por un docente
    async getCoursesTaught({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/myCoursesWillTeach`,state.keyAuth);
            commit('saveCoursesTaught',response.data.courses);
        } catch (error) {

        }
    },
    // Obtiene los membretados de los documentos
    async getLetterheads({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/metadata`,state.keyAuth)
            commit('saveLetterheads',response.data);
        } catch (error) {   

        }
    },
    // Obtiene el PDF de los datos concentrados
    async getConcentredFile({commit,state}){
        commit('createKeyAuth');
        try {
            const response = await axios.get(`${url}/dataConcentrated`,state.keyAuth);
            let name = "ConcentradoDeDatos";
            let blob = new Blob([response.data], { type:'application/pdf' } );
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = name;
            link.target = '_blank';
            link.click();
        } catch (error) {
            console.error(error);
        }
    }
  }
})