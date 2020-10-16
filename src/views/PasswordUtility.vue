<template>
    <div>
        <v-row align="start" justify="start" color="red">
            <v-col xs="12" sm="12" md="6" lg="6" xl="6" class="ml-0">
               <password-list />
            </v-col>

            <v-col xs="12" sm="12" md="6" lg="6" xl="6" class="ml-0">
                <password-create v-if="!edit"/>
                <password-update v-else/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import PasswordList from './../components/PasswordList.vue';
    import PasswordUpdate from './../components/PasswordUpdate'
    import PasswordCreate from './../components/PasswordCreate'

    export default {
        components: { PasswordList, PasswordCreate, PasswordUpdate },
        computed: {
            ...mapGetters([
                "edit"
            ]),
        }
    }
</script>

<style lang="scss" scoped>

</style>