import Vue from 'vue'
import Router from 'vue-router'
import { isAuth, isAdmin, isTeacher } from './auth';

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
      path: '/cursos',
      name: 'Cursos',
      component: () => import('@/views/Courses/ListCourses.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/cursos/:curso',
      name: 'Curso',
      component: () => import('@/views/Courses/DetailCourse.vue'),
      meta:{
        requiresAuth: true,
        requireAdmin: true
      }
    },
    {
      path: '/cursos-disponibles/:listaPeticion',
      name: 'PeticionCurso',
      component: () => import('@/views/Teachers/PetitionCourse.vue'),
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
        requireTeacher: true
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
    }
  ]
})

router.beforeEach( (to, from, next) => {
  to.matched.some( route => {
    // Requiere autenticacion de cualquier usuario
    if(route.meta.requiresAuth){
      if(isAuth()){
        next()
      }
      else {
        next({ path: '/login' })
      }
    }
    else{
      next()
    }
    // Requiere autenticacion de administrador
    if(route.meta.requireAdmin){
      if(isAdmin()){
        next()
      }else{
        next({name: 'Inicio'})
      }
    }else{
      next()
    }
    // Requiere autenticacion de docente
    if(route.meta.requireTeacher){
      if(isTeacher()){
        next()
      }else{
        next({name: 'Inicio'})
      }
    }else{
      next()
    }
  })
})

export default router;
