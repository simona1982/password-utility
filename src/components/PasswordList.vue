<template>
    <v-container>
        <v-card class="mx-auto">
            <v-card-title class="white--text primary">
                <v-row>
                    <v-col cols="12" sm="9">
                        <v-text-field
                            solo
                            label="Buscar"
                            v-model="query"
                            prepend-inner-icon="fa-search"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-btn
                        @click="nuevaPassword()"
                            large
                            >
                            <v-icon>fa-plus</v-icon>
                        </v-btn>
                    </v-col>

                    <!--v-spacer></v-spacer-->

                    </v-row>  
            </v-card-title>

            <v-card-text class="pt-4">
                <v-row>
                    <v-col md="8">
                        <h1>Cuentas</h1>
                    </v-col>
                    <v-col md="2">
                        <v-btn @click="direccion = 'UP'" small>
                            <v-icon>
                                fa-sort-up
                            </v-icon>
                        </v-btn>
                    </v-col>
                    <v-col md="2">
                        <v-btn @click="direccion = 'DOWN'" small>
                            <v-icon>
                                fa-sort-down
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                
               
            </v-card-text>

            <v-divider></v-divider>

                <v-virtual-scroll
                    :items="searchPasswords"
                    :item-height="60"
                    height="500"
                >
                    <template v-slot="{ item }">
                        <v-list-item @click="editarPassword(item)">
                            <v-list-item-avatar>
                                <v-avatar
                                :color="color"
                                size="62"
                                class="white--text"
                                >
                                {{ item.logo_url | uppercase }}
                                </v-avatar>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.account_name }}</v-list-item-title>
                                <v-list-item-subtitle v-html="item.site_url"></v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    {{ item.created_at }}
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                    depressed
                                    small
                                >
                                {{ item.username }}

                                <v-icon
                                    color="orange darken-4"
                                    right
                                >
                                    fa-user
                                </v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </template>
                </v-virtual-scroll>
        </v-card>
        

    </v-container>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        data: () => ({
        direccion: 'DOWN',
        query: '',
        colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF'],
        }),
        created() {
            this.$store.dispatch("getAllPasswords");
        },
        computed: {
            color() {
                const colorsLength = this.colors.length
                return this.colors[this.genRandomIndex(colorsLength)];
            },
            ...mapGetters([
                "allPasswords",
                "allPasswordsUP",
                "allPasswordsDOWN",
                "edit"
            // ...
            ]),
             searchPasswords: function() {
                const query = this.query;

                console.log(this.direccion)
                
                if(this.direccion == 'UP') { 
                    return this.allPasswords.filter((cuenta) => {
                        return cuenta.account_name.includes(query);
                    }).sort((a, b)=> this.convertirFecha(b.created_at) - this.convertirFecha(a.created_at))
                }else {
                     return this.allPasswords.filter((cuenta) => {
                        return cuenta.account_name.includes(query);
                    }).sort((a, b)=> this.convertirFecha(a.created_at) - this.convertirFecha(b.created_at))
                }

            },
            
        },
        methods: {
            genRandomIndex (length) {
                return Math.ceil(Math.random() * (length - 1))
            },
            buscarCuentas(event) {
                console.log(event)
            },
            convertirFecha: function (fechaString) {
                let fechaSp = fechaString.split("-");
                let anio = new Date().getFullYear();
                if (fechaSp.length == 3) {
                    anio = fechaSp[2];
                }
                let mes = fechaSp[1] - 1;
                let dia = fechaSp[0];

                return new Date(anio, mes, dia);
            },
            editarPassword(item) {
                console.log(item)
                this.$store.dispatch("setEdit", 'edit'); 
                this.$store.dispatch("passwordEdit", item);
            },
            nuevaPassword() {
                this.$store.dispatch("setEdit", 'nuevo');
            }
        },
        filters: {
            uppercase: function (value) {
                return value.toUpperCase();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>