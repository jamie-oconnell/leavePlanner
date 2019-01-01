<template>
<section class="loginPage">
    <div class="container">
        <div class="loginForm">
      <b-field>
            <b-input v-model="email" placeholder="Email" type="email"></b-input>
        </b-field>
        <b-input v-model="password" type="password"
                placeholder="Password">
            </b-input>
        </div>
    <button v-on:click="login">Login
    </button>
    </div>
  
</section>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'login',
    data(){
        return {
            email: '',
            password: ' '
        }
    },
    methods: {
        login: function (e) {
            console.log(this.email)
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(
                    user => {
                        console.log(user)
                        alert(`You are logged in as ${user.email}`);
                        this.$router.push('/');
                    },
                    err => {
                        alert(err.message);
                    }
                )
                e.preventDefault();
        }
    }
}
</script>


<style>
.loginPage{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}
.loginForm{
    margin: 0 auto;
    max-width: 330px;
}
</style>

