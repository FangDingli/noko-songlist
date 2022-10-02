import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
// import { useGlobalState } from '~/store'
import { useGet } from '~/composables/request'

// const state = useGlobalState()

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) {
    /* if (state.token.value && state.token.value.length > 0) {
      const { data, execute } = useGet('auth/token/check').json()
      await execute()
      if (!data) {
        next({ path: '/login', query: { redirect: to.fullPath } })
      } else {
        next()
      }
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } */
    const { data, execute } = useGet('auth/token/check').text()
    await execute()

    if (data.value === "{'msg':'NO USER MSG'}" || data.value === "{'msg':'HAVE NO COOKIE'}") {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
