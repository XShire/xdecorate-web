<template>
    <div class="login-box">
        <div class="login-in">
            <mu-text-field label="用户名" hintText="请输入用户名" type="text" labelFloat fullWidth @input="inputUsername"/>
            <mu-text-field label="密码" hintText="请输入密码" type="password" labelFloat fullWidth @input="inputPassword"/>
            <mu-checkbox label="微信绑定该用户" class="demo-checkbox" @input="inputConnect"/>

            <mu-raised-button label="登录" class="demo-raised-button" primary fullWidth @click="userSubmit"/>
        </div>

        <form id="real-login-form" action="/xdecorate/j_spring_security_check" method="post">
            <input type="text" id="j_username" name="j_username" v-model="username" placeholder="用户名">
            <input type="password" id="j_password" name="j_password" v-model="password" placeholder="密码">
            <button type="submit" id="j_submit">登录</button>
        </form>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                username: '',
                password: '',
                connect: false
            }
        },
        created: function(){

        },
        methods: {
            inputUsername (val) {
                this.username = val
            },
            inputPassword (val) {
                this.password = val
            },
            inputConnect (val) {
                this.connect = val
            },
            userSubmit () {
                document.getElementById('j_submit').click();
            }
        }
    }

</script>

<style lang="less">
    .login-box{
        width: 100%;
        height: 100%;
        z-index: 1000;
        background-color: rgba(255,255,255,1);
        position: fixed;
        top: 0;
        left: 0;
    }
    .login-in{
        width: 70%;
        margin: 0 auto;
        padding-top: 60px;
    }
    .login-in button{
        margin-top: 40px;
    }
    #real-login-form{
        display: none;
    }
</style>

