<template>
  <div class="yh-login">
    <div class="login-container">
      <h2 class="title">中国银河证券</h2>
        <el-form class="login-form" autoComplete="on" :model="loginForm" ref="loginForm" label-position="left">
          <el-form-item style="width:400px;overflow:hidden;">
            <span class="login-container-svg">
              <svg-icon icon-class="user" />
            </span>
            <div class="login-container-input">
              <el-input
                style="float:left"
                type="text"
                @blur="handleuserName"
                @keyup.13.native="handleLogin"
                v-model="loginForm.userName"
                autoComplete="on"
                placeholder="用户名" />
            </div>
          </el-form-item>
          <el-form-item style="width:400px;overflow:hidden;">
            <span class="login-container-svg">
              <svg-icon icon-class="password" />
            </span>
            <div class="login-container-input">
              <el-input
                :type="passwordType"
                v-model="loginForm.password"
                @keyup.13.native="handleLogin"
                autoComplete="on"
                placeholder="密码" />
            </div>
          </el-form-item>

          <el-form-item style="width:400px;overflow:hidden;">
            <span class="svg-container login-container-svg svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <div class="login-container-input">
              <el-select width="800" v-model="loginForm.uposId" no-data-text="暂无机构" placeholder="机构">
                <el-option v-for="item in pos_items" :key="item.value" :label="item.value" :value="item.key">
                </el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item style="width:400px;overflow:hidden;">
            <span class="login-container-svg">
              <svg-icon icon-class="user"/>
            </span>
            <div class="login-container-inputx">
              <el-input class="actioncode" id="verificationcode" type="text"  autocomplete="off" @keyup.13.native="handleLogin" v-model="loginForm.Captcha"/>
            </div>
            <identify
              class="randcode"
              @setcode="setcode"
              :initWait="codeInfo">
            </identify>
          </el-form-item>
          <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
          <el-button type="primary" class="loginbutton" :loading="loading" @click="handleLogin">{{$t('login.logIn')}}</el-button>
        </el-form>
    </div>
  </div>

</template>

<script>
  import {
    isvalidUsername
  } from "@/utils/validate";
  import LangSelect from "@/components/LangSelect";
  import SocialSign from "./socialsignin";
  import {
    doRequestGet,
    doRequestPost
  } from '@/utils/request'
  import {getPositionList, getloginuserstatus} from "@/api/login.js";
  import {decryptByDES,encryptByDES} from "@/utils/Cryptojs";
  import global_ from '@/common/Global';
  import identify from './identify'


  export default {
    components: {
      LangSelect,
      SocialSign,
      identify
    },
    name: "login",
    data() {
      return {
        // 提交的数据
        loginForm: {
          userName: "", // 用户名
          password: "", // 密码
          uposId: null, // 机构Id
          Captcha: "" // 验证码
        },
        checkCode: '', // 后台返回的原始验证码
        passwordType: "password",
        loading: false,
        showDialog: false,
        checked: false,
        pos_items: [],
        codeInfo:'init',
        options: [],
      };
    },

    mounted () {
      this.init();

    },

    methods: {
      init () {
        // 勾选记住密码
        this.checkInput();
      },

      /**
       * 勾选记住密码
       */
      checkInput() {
        let userData = localStorage.getItem('userData');
        if (userData) {
          let data = JSON.parse(this.uncompileStr(userData));
          this.loginForm.userName = data.userName || '';
          this.loginForm.password = data.passWord || '';
          this.checked = true;
          // 查询机构
          this.handleuserName();
        };
      },

      /**
       * 记住密码
       */
      setPassword() {
        if (this.checked) {
          let logoinData = {
            userName: this.loginForm.userName,
            passWord: this.loginForm.password
          }
          localStorage.setItem('userData', this.compileStr(JSON.stringify(logoinData)));
        } else {
          this.loginForm.userName = '';
          this.loginForm.password = '';
          localStorage.removeItem('userData');
        }
      },

      // 获取原始的验证码
      setcode(code = ''){
        this.checkCode = code;
      },

      /**
       * 依据用户名查询机构
       */
      handleuserName() {
        let userName = this.loginForm.userName || ''; // 用户名
        if (userName && userName.replace(/\s+/g, '')) {
          var req = {
            "Param":{
              "sysId": process.env.SYSID,
              "userName":userName
            }
          };
          getPositionList(req).then((response = {}) => {
            let data = response.Data || [];
            if (data.length) {
              let datas = [];
              data.forEach(ele => {
                if (ele.Status == '0') {
                  datas.push({
                    value: ele.Name,
                    key: ele.Id
                  });
                }
              });
              this.pos_items = datas;
              // 设置机构名称
              this.setmechanismName();
            } else {
              this.pos_items = [];
              this.$nextTick(() => {
                this.loginForm.uposId = null;
              });
            }
          })
          .catch(function (error) {
            this.$message.error('查询机构失败');
          });
        };
      },

      /**
       * 设置机构名称
       */
      setmechanismName() {
        this.$nextTick(() => {
          this.loginForm.uposId = this.pos_items[0].key || null;
        });
      },

      showPwd() {
        if (this.passwordType === "password") {
          this.passwordType = "";
        } else {
          this.passwordType = "password";
        }
      },

      /**
       * 提交from表单
       */
      handleLogin() {
        if (this.checkFrom()) {
          this.loading = true;
          this.$store.dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.loading = false;
              // 记住密码勾选
              this.setPassword();
              this.$router.push({
                path: "/"
              });
            })
            .catch(() => {
              this.loading = false;
              ///this.$forceUpdate();
              this.codeInfo=Math.random();
            });
        }
      },

      /**
       * 校验表单
       */
      checkFrom () {
        let fromData = this.loginForm;
        if (!fromData.userName.replace(/\s+/g, '') || !fromData.userName) {
          this.$message.error('请填写用户名');
          return false;
        } else if (!fromData.password.replace(/\s+/g, '') || !fromData.password) {
          this.$message.error('请填写密码');
          return false;
        } else if (!fromData.uposId) {
          this.$message.error('请选择机构');
          return false;
        } else if (!fromData.Captcha) {
          this.$message.error('填写验证码');
          return false;
        } else if (this.checkCode.toLowerCase() !== fromData.Captcha.toLowerCase()) {
          this.$message.error('填写正确验证码');
          // 更新验证码
          this.codeInfo = Math.random();
          return false;
        } else {
          return true;
        }
      },

      /**
       * 字符串加密
       */
      compileStr(code) {
        var c=String.fromCharCode(code.charCodeAt(0)+code.length);
        for(var i=1;i<code.length;i++){
          c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
        }
        return escape(c);
      },

      /**
       * 字符串解密
       */
      uncompileStr(code) {
        code=unescape(code);
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);
        for(var i=1;i<code.length;i++){
          c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
        }
        return c;
      }

      // afterQRScan() {
      //   const hash = window.location.hash.slice(1)
      //   const hashObj = getQueryObject(hash)
      //   const originUrl = window.location.origin
      //   history.replaceState({}, '', originUrl)
      //   const codeMap = {
      //     wechat: 'code',
      //     tencent: 'code'
      //   }
      //   const codeName = hashObj[codeMap[this.auth_type]]
      //   if (!codeName) {
      //     alert('第三方登录失败')
      //   } else {
      //     this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //       this.$router.push({ path: '/' })
      //     })
      //   }
      // }
    }

    // destroyed() {
    //   window.removeEventListener('hashchange', this.afterQRScan)
    // }
  };

</script>
<style scoped>
  .randcode{
      float: right;
  }

  #particles-js {
    font-family: "微软雅黑";
    background-color: #ffffff;
  }

  .login-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 500px;
  }
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #000000;
    margin-bottom:15px;
  }
  .login-container-svg {
    float: left;
    width: 30px;
  }
  .login-container-input {
    width: 370px;
    float: right;
  }


  .login-container-inputx {
    width: 200px;
    float: left;
  }

  .remember {
    float: left;
  }
  .loginbutton {
    width: 100%;
    margin-top: 15px;
  }
  .actioncode .el-input{
    width: 30%;
  }

</style>
