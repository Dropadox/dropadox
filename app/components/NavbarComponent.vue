<template>
    <header
        class="w-full py-4 px-6 flex justify-between items-center max-h-[5dvh] dark:bg-neutral-950/91 dark:text-white shadow-lg">
        <div class="flex justify-center items-center gap-8">
        <NuxtLink class="mb-1" to="/">
                <h1 class="text-2xl font-black tracking-tight text-shadow-sm m-0 p-0">{{ t("common.siteName") }}</h1>
            </NuxtLink>

            <div class="flex justify-center items-center dark:text-white/80 hover:dark:text-white/50">
                <NuxtLink to="/dashboard">
                    {{ t("common.nav.dashboard") }}
                </NuxtLink>
            </div>
        </div>
        <div>
            <NuxtLink to="/signup" v-if="!isLoggedIn">
                <Button variant="default" class="m-2 pointer-events-auto cursor-pointer shadow-md">
                    {{ t("common.nav.signup") }}
                </Button>
            </NuxtLink>
            <NuxtLink to="/login" v-if="!isLoggedIn">
                <Button variant="default"
                    class="m-2 bg-blue-500 hover:bg-blue-400 text-white shadow-md hover:text-white pointer-events-auto cursor-pointer">
                    {{ t("common.nav.login") }}
                </Button>
            </NuxtLink>
            <NuxtLink to="/settings" v-if="isLoggedIn">
                <Button variant="default" class="m-2 pointer-events-auto cursor-pointer shadow-md">
                    {{ t("common.nav.settings") }}
                </Button>
            </NuxtLink>
            <Button @click="logoff" variant="default"
                class="m-2 border-black bg-red-500 hover:bg-red-400 text-white shadow-md hover:text-white pointer-events-auto cursor-pointer"
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
