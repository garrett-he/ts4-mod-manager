<script lang="ts" setup>
import {useStore} from "vuex";

const store = useStore();
</script>

<template>
    <div class="index-page">
        <ul>
            <li v-for="mod in store.state.mods">
                {{ mod }}
            </li>
        </ul>
    </div>
</template>
