<template>
    <section>
        <el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
            <el-form label-width="150px">
                <el-form-item label="安卓包：">
                    <input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  @change="upload" id="fileInput">
                    <button type="button" class="el-button el-button--primary el-button--small">
                        <span>点击上传</span>
                    </button>
                </el-form-item>
                <el-col :offset="3" style="margin-bottom: 20px;">{{name}}</el-col>
                <el-col :offset="3" :span="24" v-show="progressShou">
                    <el-col :span="10" style="margin-bottom: 20px;">
                        <el-progress :percentage="upSize"></el-progress>
                    </el-col>
                </el-col>
                <el-form-item>
                    <el-button type="primary" :loading="loading" v-on:click="submitUpload">开始上传</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </section>
</template>

<script>
    import { state } from '../../vuex/state'
    import util from '../../common/js/util'
    import {baseUrl , editUser, addUser } from '../../api/api';

    export default {
        data() {
            return {
                token:'',
                name:'',
                formData: new FormData(),
                fileImg: '',
                loading:false,
                upSize:0,
                progressShou:false
            }
        },
        computed: {
            // 实时更新上传图片的名字，仅读取，值只须为函数
            imageChange: function () {
                return this.fileImg
            }
        },
        methods: {
            //图片上传
            upload (event) {
                this.formData = new FormData()
                let file = event.target.files
                // console.log(file)
                this.formData.append('file',file[0])
                // this.submitUpload()
                this.name = file[0].name
            },
            //添加
            submitUpload(){
                this.$confirm('上传包会覆盖原有的apk，确认上传吗？', '提示', {}).then(() => {
                    const _this= this;
                    _this.loading = true
                    _this.progressShou = true
                    let token = sessionStorage.getItem('token')
                    token = JSON.parse(token)
                    let m = 120
                    const timer = setInterval(function(){
                        m -= 1
                        _this.upSize += 1
                        if(m === 0){//满足某个条件时 清除定时器
                            clearInterval(timer);
                        }
                    }, 300)
                    _this.$http.post(baseUrl+'/sys/sysVersions/upload?type=5&token='+token, _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                            const info = JSON.parse(response.bodyText);
                            if(response.body.code === 200){
                                clearInterval(timer);
                                _this.upSize = 100
                                _this.$message({
                                    message: response.body.message,
                                    type: 'success',
                                    duration:1000
                                });
                                _this.loading = false
                            }else if(response.body.code === 403){
                                _this.$message({
                                    message: response.body.message,
                                    type: 'error',
                                    duration:1000
                                });
                                _this.loading = false
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: response.body.message,
                                    type: 'error',
                                    duration:1000
                                });
                                _this.loading = false
                            }
                        }, error => _this.$emit('complete', 500, error.message))
                });
            }
        },
        mounted() {
        }
    }
</script>

<style>

</style>