<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Contributor {
  login: string
  html_url: string
  avatar: string
}

const props = withDefaults(
  defineProps<{
    repo: string
    /** 补充名单：接口无法统计、但仍应列出的人 */
    extra?: string[]
    /** 排除名单：接口会统计到、但不属于本项目的账号 */
    exclude?: string[]
  }>(),
  { extra: () => [], exclude: () => [] },
)

const list = ref<Contributor[]>([])
const state = ref<'loading' | 'ready' | 'failed'>('loading')

function makeFallback(login: string): Contributor {
  return {
    login,
    html_url: `https://github.com/${login}`,
    avatar: `https://github.com/${login}.png?size=160`,
  }
}

function toAvatar(url: string): string {
  if (!url) return ''
  return `${url}${url.includes('?') ? '&' : '?'}s=160`
}

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}

onMounted(async () => {
  const base = `https://api.github.com/repos/${props.repo}`
  const blocked = new Set(props.exclude.map((login) => login.toLowerCase()))

  try {
    // 贡献者：按默认分支的提交统计
    const raw = (await getJson(`${base}/contributors?per_page=30`)) as
      | Array<{ login: string; html_url: string; avatar_url: string; type?: string }>
      | { message?: string }

    const commits: Contributor[] = (Array.isArray(raw) ? raw : [])
      .filter((item) => item && item.type !== 'Bot')
      .filter((item) => !blocked.has(item.login.toLowerCase()))
      .map((item) => ({
        login: item.login,
        html_url: item.html_url,
        avatar: toAvatar(item.avatar_url),
      }))

    // 已合并 Pull Request 的作者：历史被重写后，这些提交不再计入上面的接口
    let authors: Contributor[] = []
    try {
      const pulls = (await getJson(`${base}/pulls?state=closed&per_page=50&sort=updated&direction=desc`)) as
        | Array<{ merged_at: string | null; user: { login: string; html_url: string; avatar_url: string } | null }>
        | { message?: string }

      if (Array.isArray(pulls)) {
        const seen = new Set(commits.map((item) => item.login.toLowerCase()))
        for (const pull of pulls) {
          if (!pull.merged_at || !pull.user) continue
          const login = pull.user.login
          if (blocked.has(login.toLowerCase()) || seen.has(login.toLowerCase())) continue
          seen.add(login.toLowerCase())
          authors.push({
            login,
            html_url: pull.user.html_url,
            avatar: toAvatar(pull.user.avatar_url),
          })
        }
      }
    } catch {
      // 拉取 PR 失败时只显示提交统计的结果
    }

    const seen = new Set([...commits, ...authors].map((item) => item.login.toLowerCase()))
    const missing = props.extra
      .filter((login) => !blocked.has(login.toLowerCase()) && !seen.has(login.toLowerCase()))
      .map(makeFallback)

    list.value = [...commits, ...authors, ...missing]
    state.value = 'ready'
  } catch {
    list.value = props.extra
      .filter((login) => !blocked.has(login.toLowerCase()))
      .map(makeFallback)
    state.value = 'failed'
  }
})
</script>

<template>
  <div class="contributors">
    <a
      v-for="user in list"
      :key="user.login"
      class="contributor"
      :href="user.html_url"
      target="_blank"
      rel="noreferrer"
    >
      <img :src="user.avatar" :alt="user.login" width="80" height="80" loading="lazy" />
      <span>{{ user.login }}</span>
    </a>
    <p v-if="state === 'loading' && !list.length" class="contributors-note">正在获取名单</p>
    <p v-else-if="!list.length" class="contributors-note">
      暂时无法获取名单，可前往仓库的贡献者页面查看。
    </p>
  </div>
</template>
