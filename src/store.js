import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import jwt from 'vue-jwt-decode'

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
    btnDisableUserInt: true,
    btnDisableUserExt: true,
    btnDisableCourse: true,
    btnDisableChangePass:true,
    snackbars:{
        snackbarErLogin: null,
        snackbarSuCourse: null,
        snackbarErCourse: null,
        snackbarSuTeacher: null,
        snackbarErTeacher: null
    }
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
    // activa el boton nuevo en los formularios
    enableButtonNew(state,{form,value}){
        if(form=="teacher" && value==true){
            state.btnDisableUserInt = false;
        }else if(form=="teacher" && value==false){
            state.btnDisableUserInt = true;
        }else if(form=="teacherExt" && value==true){
            state.btnDisableUserExt = false;
        }else if(form=="teacherExt" && value==false){
            state.btnDisableUserExt = true;
        }
        if(form=="course" && value==true){
            state.btnDisableCourse = false;
        }else if(form=="course" && value==false){
            state.btnDisableCourse = true;
        }
        if(form=="pass" && value==true){
            state.btnDisableChangePass = false;
        }else if(form=="pass" && value==false){
            state.btnDisableChangePass = true;
        }
    },
    //activa o no el snackbar de los formularios
    showSnackbars(state,{value,form,res}){
        if(form=="login" && res=="error"){
            return (value) ? state.snackbars.snackbarErLogin=true : state.snackbars.snackbarErLogin=false;
        }
        if(form=="course" && res=="succ"){
            return (value) ? state.snackbars.snackbarSuCourse=true : state.snackbars.snackbarSuCourse=false;
        }else if(form=="course" && res=="error"){
            return (value) ? state.snackbars.snackbarErCourse=true : state.snackbars.snackbarErCourse=false; 
        }
        if(form=="teacher" && res=="succ"){
            // state.btnDisable = false;
            return (value) ? state.snackbars.snackbarSuTeacher=true : state.snackbars.snackbarSuTeacher=false;
        }else if(form=="teacher" && res=="error"){
            return (value) ? state.snackbars.snackbarErTeacher=true : state.snackbars.snackbarErTeacher=false;
        }
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
        commit('showSnackbars', {value:false,form:"login",res:"error"});
        await axios.post('http://localhost:5000/login', dataUser)
        .then(response => {
            sessionStorage.setItem("token", response.data.data.access_token);
            commit('saveUserLogin',response);
            commit('createKeyAuth');
            commit('restartDataCourses');
            router.push("/inicio");
            console.log(response);
        })
        .catch(error => {
            console.error(error);
            commit('snackbars', {value:true,form:"login",res:"error"});
        });
    },
    //logout del usuario
    async logout({commit,state}){
        commit('createKeyAuth');
        await axios.get("http://localhost:5000/logoutA",state.keyAuth)
        .then(response => {
            console.log("Cerrando sesión");
            sessionStorage.clear()
            router.push('/login');
        })
        .catch(error => {
            console.error(error);
        })
    },
    //registro de cursos
    async saveCourse({state, commit},dataCourse){
        commit('createKeyAuth');
        commit('enableButtonNew',{form:"course",value:false});
        commit('showSnackbars', {value:false,form:"course",res:"succ"});
        commit('showSnackbars', {value:false,form:"course",res:"error"});
        await axios.post("http://localhost:5000/courses",dataCourse,state.keyAuth)
        .then(response => {
            commit('enableButtonNew',{form:"course",value:true});
            commit('showSnackbars', {value:true,form:"course",res:"succ"});
        })
        .catch(error => {
            commit('showSnackbars', {value:true,form:"course",res:"error"});
        })
    },
    async changePass({commit,state},pass){
        commit('createKeyAuth');
        await axios.post("http://localhost:5000/changePassword",pass,state.keyAuth)
        .then(response => {
            console.log("contraseña actualizada");
            commit('enableButtonNew',{form:'pass',value:true})
        })
        .catch(error => {
            console.error(error);
        })
    },
    //guarda un usuario al sistema
    async saveUser({commit,state},dataUser){
        commit('createKeyAuth');
        commit('enableButtonNew',{form:"teacher",value:false});
        commit('enableButtonNew',{form:"teacherExt",value:false});
        commit('showSnackbars', {value:false,form:"teacher",res:"succ"});
        commit('showSnackbars', {value:false,form:"teacher",res:"error"});
        await axios.post("http://localhost:5000/teachers",dataUser,state.keyAuth)
        .then(response => {
            commit('enableButtonNew',{form:"teacher",value:true});
            commit('enableButtonNew',{form:"teacherExt",value:true});
            commit('showSnackbars', {value:true,form:"teacher",res:"succ"});
        })
        .catch(error => {
            commit('showSnackbars', {value:true,form:"teacher",res:"error"});
        });
    },
    //obtencion de cursos
    async getCourses({commit,state}){
        commit('createKeyAuth');
        await axios.get("http://localhost:5000/courses",state.keyAuth)
        .then(response => {
            commit('saveCourses',response.data[0]);
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        })
    },
    //obtencion de docentes
    async getTeachers({commit,state}){
        commit('createKeyAuth');
        await axios.get("http://localhost:5000/teachers",state.keyAuth)
        .then(response => {
            console.log(response);
            commit('saveTeachers',response.data);
        })
        .catch(error => {
            console.error(error)
        })
    },
    //obtiene los periodos de todos los cursos
    async getPeriods({commit,state}){
        commit('createKeyAuth');
        await axios.get("http://localhost:5000/periods",state.keyAuth)
        .then(response => {
            commit('savePeriods',response.data.message);
        })
        .catch(error => {
            console.error(error);
        })
    },
    //obtiene los cursos disponibles para solicitar
    async getAvailableCourses({commit,state}){
        commit('createKeyAuth');
        await axios.get("http://localhost:5000/availableCourses",state.keyAuth)
        .then(response => {
            commit('saveAvailableCourses',response.data.courses);
            console.log(response.data.courses);
        })
        .catch(error => {
            console.error(error);
        })
    },
    //obtiene una lista de los cursos a los que esta inscrito el docente
    async getMyCourses({commit,state}){
        commit('createKeyAuth');
        await axios.get("http://localhost:5000/myCourses",state.keyAuth)
        .then(response => {
            console.log(response.data.courses);
            commit('saveMyCourses',response.data.courses);
        })
        .catch(error => {
            console.error(error);
        })
    },
    //obtiene los cursos impartidos por un docente
    async getCoursesTaught({commit,state}){
        commit('createKeyAuth');
        await axios.get("http://localhost:5000/myCoursesWillTeach",state.keyAuth)
        .then(response => {
            console.log(response.data.courses);
            commit('saveCoursesTaught',response.data.courses);
        })
        .catch(error => {
            console.error(error);
        })
    },
    // Obtiene los membretados de los documentos
    async getLetterheads({commit,state}){
        commit('createKeyAuth');
        await axios.get("http://localhost:5000/metadata",state.keyAuth)
        .then(response => {
            console.log(response.data);
            commit('saveLetterheads',response.data);
        })
        .catch(error => {
            console.error(error);
            
        })
    },
  }
})
