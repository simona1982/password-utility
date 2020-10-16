<template>
<v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="500"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
    height="500"
      :src="require('@/assets/IMG_0860.jpg')"
    ></v-img>

    <v-card-title class="text-center">Andres Velasquez Delgado</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="12"
          length=12
          color="amber"
          small
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          12 (years of experience)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        Fullstack Developer and Mobile Developer
      </div>

      <div>Since 2003, I have worked as a developer of desktop, web and mobile applications with emphasis in the web area
with different digital and conventional advertising agencies, multinationals and government companies, developing
Web applications, corporate Websites, CRM(s), E-Commerce, SPA’s, mobile apps, Frontend and Backend
solutions.
As a professional, I always focus my efforts in the company and my clients needs, I´m always seeking to be effective
without losing sight of the available resources and users requirements. Within my academic and work learning
over time, I've acquired the ability to work as a team, both directing and being part of it, contributing my skills into the
common goals.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>KNOWLEDGES AND SKILLS</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>Vuejs</v-chip>

        <v-chip>Angular</v-chip>

        <v-chip>React</v-chip>

        <v-chip>React Native</v-chip>

        <v-chip>Flutter</v-chip>

        <v-chip>Nodejs</v-chip>

        <v-chip>Laravel</v-chip>

        <v-chip>Java</v-chip>

        <v-chip>Spring boot</v-chip>

        <v-chip>.NET entity core</v-chip>
      </v-chip-group>

       
    </v-card-text>

    
  </v-card>
</template>

<script>
    export default {
        data: () => ({
            loading: true,
            selection: 1,
            }),
            methods: {
            reserve () {
                this.loading = true

                setTimeout(() => (this.loading = false), 2000)
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>