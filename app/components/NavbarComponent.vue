<template>

    <header class="w-full py-4 px-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-black">Dropadox</h1>
        <div>
            <NuxtLink to="/signup">
                <Button variant="outline" class="m-2 border-black text-black hover:bg-black/20">
                    Sign up
                </Button>
            </NuxtLink>
            <NuxtLink to="/login">
                <Button variant="outline" class="m-2 border-black text-black hover:bg-black/20">
                    Login
                </Button>
            </NuxtLink>
        </div>
    </header>

</template>

<script lang="ts" setup>
</script>
