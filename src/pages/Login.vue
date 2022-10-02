<template>
  <div class="absolute left-50% top-50% -translate-x-50% -translate-y-50% w-30%">
    <NCard hoverable>
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">密码：</div>
        <NInput
          v-model:value="password"
          placeholder="请输入密码"
          @keyup.enter="handleLogin"
        ></NInput>
        <div class="ml-3">
          <NButton type="primary" :loading="isFetching" @click="handleLogin">登录</NButton>
        </div>
      </div>
    </NCard>
  </div>
</template>

<script lang="ts" setup>
import { usePost } from '~/composables/request'
// import { useGlobalState } from '~/store'

const router = useRouter()
const route = useRoute()
// const state = useGlobalState()

const password = ref('')
const { data, execute, isFetching } = usePost('auth/validate', password).json()

const handleLogin = async () => {
  await execute()
  if (data.value.returnCode === 200) {
    const exptime = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
    // document.cookie = 'token=' + data.value.data + '; path=/'
    document.cookie = `token=${data.value.data}; path=/; expires=${exptime.toUTCString()}`
    window.$message.success('登录成功，欢迎')
    // state.setToken(data.value.data)
    let url = route.query.redirect as string
    if (url) {
      router.push({ path: decodeURIComponent(url) })
    } else {
      router.push({ path: '/admin' })
    }
  } else {
    window.$message.error(data.value.msg)
  }
}
</script>
