<template>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>

      <v-flex xs12 sm8 md4>
        <v-card dark>
          <v-toolbar color="primary">
            <v-toolbar-title>Signup Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
            <v-card-text>
          <v-form v-model="valid">
          <v-text-field
            prepend-icon="person"
            type="text"
            v-model="name"
            :rules="nameRules"
            label="Name"
            required>
          </v-text-field>

          <v-text-field
            prepend-icon="email"
            type="text"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required>
          </v-text-field>

          <v-text-field
            prepend-icon="lock"
            v-model="password"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show = !show">
          </v-text-field>

        </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="register">Sign up</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import Axios from 'axios'
import swal from 'sweetalert'
export default {
  name: 'signup',
  data () {
    return {
      show: false,
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailMatch: () => 'The email and password you entered don\'t match'
      },
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        // eslint-disable-next-line
        v => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    register: function() {
      Axios
        .post('http://localhost:3000/users/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then((response) => {
          console.log(response)
          this.$router.push('login') 
        })
        .catch(err => {
          if (err.response) {
            swal(err.response.data.message)
          }
          // console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style>
</style>
