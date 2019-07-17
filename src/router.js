import Vue from 'vue'
import Router from 'vue-router'
import { isAuth, isAdmin, isTeacher, isComm, isBoss } from './auth';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/inicio',
      name: 'Inicio',
      component: () => import('@/views/Home.vue'),
      meta:{
        requiresAuth: true,
      }
    },
    //rutas admin
    {
      path: '/registro',
      name: 'Registro',
      component: () => import('@/views/Registro.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/Cursos',
      name: 'Cursos',
      component: () => import('@/views/Courses/ListCourses.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/Cursos/:curso',
      name: 'Curso',
      component: () => import('@/views/Courses/DetailCourse.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/Cursos-disponibles',
      name: 'CursosDisponiblesAdmin',
      component: () => import('@/views/Teachers/AvailableCoursesAdmin.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/cursos-disponibles/:cursoAdmin',
      name: 'CursoDisponibleAdmin',
      component: () => import('@/views/Teachers/DetailAvailableCourseAdmin.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/cursos-disponibles/:listaPeticion/peticiones',
      name: 'PeticionCurso',
      component: () => import('@/views/Teachers/PetitionCourse.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/mis-cursos',
      name: 'CursosDelAdmin',
      component: () => import('@/views/Teachers/MyCoursesAdmin.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/mis-cursos/:MiCursoAdmin',
      name: 'CursoDelAdmin',
      component: () => import('@/views/Teachers/DetailMyCourseAdmin.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/cursos-impartidos/',
      name: 'CursosImpartidosAdmin',
      component: () => import('@/views/Teachers/CoursesTaughtAdmin.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/cursos-impartidos/:CursoImpartidoAdmin',
      name: 'CursoImpartidoAdmin',
      component: () => import('@/views/Teachers/DetailCourseTaughtAdmin.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/docentes',
      name: 'Docentes',
      component: () => import('@/views/Teachers/ListTeachers.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/docentes/:docente',
      name: 'Docente',
      component: () => import('@/views/Teachers/DetailTeacher.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/membretado',
      name: 'Membretados',
      component: () => import('@/views/Teacher/Letterhead.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/membretado/:letterheadName',
      name: 'Membretado',
      component: () => import('@/views/Teacher/DetailLetterhead.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    //rutas docente
    {
      path: '/perfil',
      name: 'Perfil',
      component: () => import('@/views/Teacher/Profile.vue'),
      meta:{
        requiresAuth: true,
      }
    },
    {
      path: '/mis-cursos',
      name: 'MisCursos',
      component: () => import('@/views/Teacher/MyCourses.vue'),
      meta:{
        requiresAuth: true,
        requireTeacher: true
      }
    },
    {
      path: '/mis-cursos/:MiCurso',
      name: 'MiCurso',
      component: () => import('@/views/Teacher/DetailMyCourse.vue'),
      meta:{
        requiresAuth: true,
        requireTeacher: true
      }
    },
    {
      path: '/mis-cursos/:MiCurso/encuesta',
      name: 'Encuesta',
      component: () => import('@/views/Teacher/Poll.vue'),
      meta:{
        requiresAuth: true,
        requireTeacher: true
      }
    },
    {
      path: '/cursos-impartidos',
      name: 'CursosImpartidos',
      component: () => import('@/views/Teacher/CoursesTaught.vue'),
      meta:{
        requiresAuth: true,
        requireTeacher: true
      }
    },
    {
      path: '/cursos-impartidos/:CursoImpartido',
      name: 'CursoImpartido',
      component: () => import('@/views/Teacher/DetailCourseTaught.vue'),
      meta:{
        requiresAuth: true,
        requireTeacher: true
      }
    },
    {
      path: '/cursos-impartidos/:CursoImpartido/calificar-docentes',
      name: 'CalDocentes',
      component: () => import('@/views/Teacher/CalTeachers.vue'),
      meta:{
        requiresAuth: true,
        requireTeacher: true
      }
    },
    {
      path: '/cursos-disponibles',
      name: 'CursosDisponibles',
      component: () => import('@/views/Teacher/AvailableCourses.vue'),
      meta:{
        requiresAuth: true,
        requireTeacher: true
      }
    },
    {
      path: '/cursos-disponibles/:cursoDisp',
      name: 'CursoDisponible',
      component: () => import('@/views/Teacher/DetailAvailableCourse.vue'),
      meta:{
        requiresAuth: true,
        requireTeacher: true
      }
    },
    // Rutas para usuario comunicacion
    {
      path: '/cursos',
      name: 'CursosFolio',
      component: () => import('@/views/Communication/Courses.vue'),
      meta:{
        requiresAuth: true,
        requireComm: true
      }
    },
    {
      path: '/cursos/:cursoFolio',
      name: 'CursoFolio',
      component: () => import('@/views/Communication/DataCourse.vue'),
      meta:{
        requiresAuth: true,
        requireComm: true
      }
    },
    // Rutas para jefe de departamento
    {
      path: '/cursos-disponibles',
      name: 'CursosDisponiblesJefe',
      component: () => import('@/views/Boss/AvailableCoursesBoss.vue'),
      meta:{
        requiresAuth: true,
        requireBoss: true
      }
    },
    {
      path: '/cursos-disponibles/recomendar-docentes/:recDocente',
      name: 'RecomendarDocente',
      component: () => import('@/views/Boss/RecTeacher.vue'),
      meta:{
        requiresAuth: true,
        requireBoss: true
      }
    },
  ]
})

router.beforeEach( (to, from, next) => {
  to.matched.some( route => {
    // Requiere autenticacion de cualquier usuario
    if(route.meta.requiresAuth){
      if(!isAuth()){
        next({ path: '/login' })
      }
    }
    // Requiere autenticacion de administrador
    if(route.meta.requireAdmin){
      if(!isAdmin()){
        next({name: 'Inicio'})
      }
    }
    // Requiere autenticacion de docente
    if(route.meta.requireTeacher){
      if(!isTeacher()){
        next({name: 'Inicio'})
      }
    }
    // Requiere autenticacion de jefe de departamento
    if(route.meta.requireBoss){
      if(!isBoss()){
        next({name: 'Inicio'})
      }
    }
    // Requiere autenticacion de comunicacion
    if(route.meta.requireComm){
      if(!isComm()){
        next({name: 'Inicio'})
      }
    }
    next()
  })
})

export default router;
