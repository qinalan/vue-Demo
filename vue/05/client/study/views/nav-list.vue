<template>
    <nav class="fix">
        <ul class="fl nav-list">
            <li v-for="item of list" :key="item" class="fl">
                <router-link :to="{ path: '/nav/'+item}">{{item}}</router-link>
            </li>
        </ul>
        <ul class="user fr">
            <li class="fl">
                <router-link to="/control/login" class="a-link" v-if="showLoginState">登录</router-link>
                <login-state v-else></login-state>
            </li>
            <li class="fl">
                <router-link to="/control/res" class="a-link">注册</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'nav-list',
        data() {
            return {
                list: [11, 22, 33, 44, 55, 66, 77, 88, 99]
            };
        },
        mounted() {
            /* this.axios.get('/user/init').then(({ data }) => {
                if (data.loginExisted) {
                    this.$store.commit('updateShowLoginState', false);
                } else {
                    this.$store.commit('updateShowLoginState');
                }
            }).catch(errors => {
                console.log(errors);
            }); */
        },
        computed: {
            showLoginState() {
                return this.$store.state.isShowLoginState;
            }
        }
    };
</script>

<style scoped lang="scss">
    $l-height: 30px;
    nav{
        width: 700px;
        height: 30px;
        margin: 10px auto 0;
        .nav-list{
            width: 500px;
            height: 30px;
            li{
                width: 50px;
                height: 30px;
                background: greenyellow;
                border-radius: 5px;
                margin-left: 5px;
                text-align: center;
                line-height: $l-height;
                a {
                    color: black;
                }
            }
        }
        .user{
            width: 110px;
            height: 100%;
            li{
                width: 50px;
                height: 30px;
                margin-left: 5px;
                border-radius: 5px;
                background: greenyellow;
                text-align: center;
                line-height: $l-height;
                .a-link{
                    color: black;
                }
            }
        }
    }
</style>
