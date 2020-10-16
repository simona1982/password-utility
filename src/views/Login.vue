<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-hover v-slot:default="{ hover }" open-delay="200">
                    <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="mx-auto">
                        <v-toolbar color="primary" dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
                            <v-toolbar-title>Login</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form_login" v-model="valid" lazy-validation>
                                <v-text-field
                                v-model="login.email"
                                label="Email"
                                name="email"
                                :rules="emailRules"
                                prepend-icon="person"
                                type="text"
                                />

                                <v-text-field
                                v-model="login.password"
                                label="Password"
                                name="password"
                                :rules="passwordRules"
                                prepend-icon="lock"
                                type="password"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-row align="center" justify="center">
                                <v-btn
                                    color="primary"
                                    x-large
                                    rounded
                                    :loading="loading"
                                    @click.prevent="handleLoginFormSubmit"
                                    >
                                    <v-icon left>fa-sign-in-alt</v-icon>Login
                                    <template v-slot:loader>
                                        <span class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                        </span>
                                    </template>
                                </v-btn>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        data: () => ({
            url: process.env.BASE_URL_BACKEND, 
            valid: false,
            loading: false,
            login: {
                email: "",
                password: ""
            },
            passwordRules: [
                v => !!v || "Password es requerido",
                v => (v || "").indexOf(" ") < 0 || "Espacios no son permitidos",
                v => (v && v.length >= 5) || "Password debe tener 6 o mas caractares"
            ],
            emailRules: [
                v => !!v || "Email es requerido",
                v => (v || "").indexOf(" ") < 0 || "Espacios no son permitidos",
                v => /.+@.+/.test(v) || "Email debe ser valido"
            ]
        }),
        methods: {
            handleLoginFormSubmit() {
                if (this.$refs.form_login.validate()) {
                    const postData = {
                        email: this.login.email,
                        password: this.login.password
                    }

                    this.$store.dispatch("login", {
                        postData
                    });

                }else {
                    this.loading = false;
                    /*this.isLoading = false;*/
                    //console.log("no pasaste la validacion");
                }
            }
        },
        computed: {
            ...mapGetters([
                // map this.productItems to this.$store.getters.productItems
                "accessToken"
            ])
        }
    }
</script>

<style lang="scss" scoped>

</style>