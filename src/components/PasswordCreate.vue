<template>
    <v-container>
        
        <v-card class="mx-auto">
            <v-card-title class="white--text primary">
                Crear cuenta
            </v-card-title>
            <v-card-text class="pt-4">
                <v-form ref="form_create" v-model="valid">

                    <v-avatar
                        class="mb-5"
                        color="primary"
                        size="56"
                    ><span class="white--text headline">{{ (logourl.length == 0) ? nameAV: logourl}}</span></v-avatar>

                    <span class="ml-4 text-h3 font-weight-black">{{ name }}</span>


                    <v-text-field
                        v-model="name"
                        :counter="10"
                        :rules="nameRules"
                        label="Name"
                        outlined
                        clearable
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        :rules="passwordRules"
                        outlined
                        clearable
                        required
                    ></v-text-field>

                    <v-text-field
                        maxlength="2"
                        v-model="logourl"
                        :rules="logourlRules"
                        label="Logo URL"
                        outlined
                        clearable
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="siteurl"
                        :rules="siteurlRules"
                        label="Site URL"
                        outlined
                        clearable
                        required
                    ></v-text-field>
                </v-form>

                 <v-alert v-if="alertCreated"
                        type="success"
                        dismissible
                        elevation="2"
                    >Cuenta creada exitosamente !</v-alert>

            </v-card-text>
            <v-card-actions>

                 <v-row
                    align="center"
                    justify="space-around"
                >
                
                    <v-btn
                        color="primary"
                        x-large
                        dark
                        rounded
                        @click="crearCuenta()"
                    >
                        <v-icon>
                            fa-plus-circle
                        </v-icon>
                        &nbsp;Crear
                    </v-btn>
                 </v-row>
            </v-card-actions>
        </v-card>
       
    </v-container>
</template>

<script>
    import moment from 'moment'

    export default {
        data: () => ({
            alertCreated: false,
            valid: false,
            logourl: '',
            logourlRules: [
                //v => (v && v.length <= 2) || 'Maximo 2 caracteres',
            ],
            name: '',
            nameRules: [
                v => !!v || 'Name es requerido',
                //v => (v && v.length <= 10) || 'Al menos 10 caracteres',
            ],
            password: '',
            passwordRules: [
                v => !!v || "Password es requerido",
                v => (v || "").indexOf(" ") < 0 || "Espacios no son permitidos",
                v => (v && v.length >= 5) || "Password debe tener 6 o mas caractares"
            ],
            siteurl: '',
            siteurlRules: [
                v => !!v || 'Site URL is required',
                //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
        }),
        computed: {
            nameAV: function() {
                //var palabras = "prueba para obtener primera letra",
                if(this.name.length == 0) {
                    return;
                }

                let array = this.name.split(" "),
                total = array.length,
                resultado = "";
                
                for (var i = 0; i < total; resultado += array[i][0], i++);
                    console.log(resultado); //Imprime 'ppopl'

                return resultado;
            },
            nameAVV: function() {
                 let array = this.name.split(" "),
                total = array.length,
                resultado = "";
                
                for (var i = 0; i < total; resultado += array[i][0], i++);
                    console.log(resultado); //Imprime 'ppopl'

                return resultado;
            }
        },
        methods: {
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form_create.resetValidation()
            },
            crearCuenta() {
                console.log(`Crear cuenta`)

                if (this.$refs.form_create.validate()) {

                    this.alertCreated = true;

                    var now = new Date();
                    var dateString = moment(now).format('DD-MM-YYYY');

                    console.log(this.logourl)

                    const postData = {
                        account_name: this.name,
                        username: 'avelasquez',
                        password: this.password,
                        site_url: this.siteurl,
                        logo_url: (this.logourl == '') ? this.nameAV: this.logourl,
                        created_at: dateString
                    }

                    this.$store.dispatch("createPassword", {
                            postData
                        });

                    //this.$refs.form_create.reset()

                    
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>