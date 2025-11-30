<template>
    <header class="w-full py-4 px-6 flex justify-between items-center max-h-[5dvh]">
        <div class="flex justify-center items-center gap-8">
            <NuxtLink class="self-baseline" to="/">
                <h1 class="text-2xl font-bold text-black">{{ t("common.siteName") }}</h1>
            </NuxtLink>

            <NuxtLink to="/dashboard">
                <p>{{ t("common.nav.dashboard") }}</p>
            </NuxtLink>
        </div>
        <div>
            <NuxtLink to="/signup" v-if="!isLoggedIn">
                <Button variant="outline" class="m-2 border-black text-black hover:bg-black/20">
                    {{ t("common.nav.signup") }}
                </Button>
            </NuxtLink>
            <NuxtLink to="/login" v-if="!isLoggedIn">
                <Button variant="outline"
                    class="m-2 border-black text-black bg-blue-500 hover:bg-blue-400 cursor-pointer text-white hover:text-white">
                    {{ t("common.nav.login") }}
                </Button>
            </NuxtLink>
            <NuxtLink to="/settings" v-if="isLoggedIn">
                <Button variant="outline" class="m-2 border-black text-black hover:bg-black/20">
                    {{ t("common.nav.settings") }}
                </Button>
            </NuxtLink>
            <Button @click="logoff" variant="outline"
                class="m-2 border-black bg-red-500 hover:bg-red-400 text-white hover:text-white cursor-pointer"
                v-if="isLoggedIn">
                {{ t("common.nav.logOut") }}
            </Button>
        </div>
    </header>

</template>

<script lang="ts" setup>
const { t } = useI18n();
const isLoggedIn = useCookie('token') ?? false
const router = useRouter()
async function logoff() {
    if (isLoggedIn) {
        isLoggedIn.value = null;
        router.push('/')
    }
}
</script>
