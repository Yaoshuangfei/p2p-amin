<template>
    <section>
        <el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
            <el-form label-width="150px">
                <el-form-item label="是否开启弹框：">
                    <el-switch @change="offBtn"
                      v-model="value"
                      on-color="#13ce66"
                      off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="上传弹框图片：">
                    <input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  multiple="multiple"  @change="upload" id="fileInput">
                    <button type="button" class="el-button el-button--primary el-button--small">
                        <span>点击上传</span>
                    </button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" :offset="1">
            <el-col :span="24" style="margin-left: 20px;">
                <el-col :span="2">弹框图片：</el-col>
                <el-col :span="2">
                    <img style="width: 100%" :src="frameImageUrl" alt="">
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-left: 20px;">
                <el-col :span="2">弹框活动链接：</el-col><a v-if="frame_src" :href="frameActivityUrl" target="view_window">{{frameActivityUrl}} </a>
                <el-input v-model="edit_frameActivityUrl" v-else style="width: 150px;"></el-input>
                
                <el-button type="text" size="small" style="margin-left: 10px;" v-if="frame_src" @click="show_frame">修改</el-button>
                <el-button type="text" size="small" style="margin-left: 10px;" v-else @click="upload_frame">确定修改</el-button>
            </el-col>
        </el-col>
        <el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
            <el-form label-width="150px">
                <el-form-item label="是否开启浮标：">
                    <el-switch @change="offBtn1"
                      v-model="value1"
                      on-color="#13ce66"
                      off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="上传浮标图片：">
                    <input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  multiple="multiple"  @change="uploadF" id="fileI qnput">
                    <button type="button" class="el-button el-button--primary el-button--small">
                        <span>点击上传</span>
                    </button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" :offset="1">
            <el-col :span="24" style="margin-left: 20px;">
                <el-col :span="2">浮标图片：</el-col>
                <el-col :span="2">
                    <img style="width: 100%" :src="floatImageUrl" alt="">
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-left: 20px;">
                <el-col :span="2">浮标活动链接：</el-col><a v-if="float_src" :href="floatActivityUrl" target="view_window">{{floatActivityUrl}}</a>
                <el-input v-model="edit_floatActivityUrl" v-else style="width: 150px;"></el-input>
                
                <el-button type="text" size="small" style="margin-left: 10px;" v-if="float_src" @click="show_float">修改</el-button>
                <el-button type="text" size="small" style="margin-left: 10px;" v-else @click="upload_float">确定修改</el-button>
            </el-col>
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
                img:'',
                img1:'',
                token:'',
                formData: new FormData(),
                fileImg: '',
                value:true,
                value1:true,
                token:'',
                float_src:true,
                frame_src:true,
                edit_frameActivityUrl:'',//修改弹窗活动链接
                edit_floatActivityUrl:'',//修改浮标活动链接
                frameSwitch:'',//弹框开关
                floatSwitch:'',//浮标开关
                frameImageUrl:'',//弹框的图片路径
                floatImageUrl:'',//浮标的图片路径
                frameActivityUrl:'',//弹框的活动链接
                floatActivityUrl:''//浮标的活动链接
            }
        },
        computed: {
            // 实时更新上传图片的名字，仅读取，值只须为函数
            imageChange: function () {
                return this.fileImg
            }
        },
        methods: {
            show_frame(){
                this.frame_src = false
            },
            upload_frame(){
                const _this = this
                const params = {
                    id:62,
                    value:_this.edit_frameActivityUrl
                }
                var url = baseUrl+"/sys/config/update?token="+_this.token
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.getlist()
                            _this.frame_src = true
                            _this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:1000
                            });
                        }
                    }
                });
            },
            show_float(){
                this.float_src = false
            },
            upload_float(){
                const _this = this
                const params = {
                    id:63,
                    value:_this.edit_floatActivityUrl
                }
                var url = baseUrl+"/sys/config/update?token="+_this.token
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.getlist()
                            _this.float_src = true
                            _this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:1000
                            });
                        }
                    }
                });
            },
            getlist(){
                const _this = this
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/sys/config/loadSysFloat?token='+_this.token,
                    // data:JSON.stringify(params),
                    // data:'',
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.floatActivityUrl = data.data.floatActivityUrl
                            _this.floatImageUrl = data.data.floatImageUrl+'?t='+Math.random()
                            _this.frameActivityUrl = data.data.frameActivityUrl
                            _this.frameImageUrl = data.data.frameImageUrl+'?t='+Math.random()
                            if(data.data.frameSwitch === '1'){
                                _this.value = true
                            }else{
                                _this.value = false
                            }
                            if(data.data.floatSwitch === '1'){
                                _this.value1 = true
                            }else{
                                _this.value1 = false
                            }
                            // _this.floatSwitch = data.data.floatSwitch
                            // _this.frameSwitch = data.data.frameSwitch
                            _this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:1000
                            });
                        }
                    }
                });
            },
            offBtn(){
                const _this = this
                const params = {
                    id:60,
                    value:''
                }
                if(this.value){
                    params.value = '1'
                }else{
                    params.value = '0'
                }
                var url = baseUrl+"/sys/config/update?token="+_this.token
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.getlist()
                            _this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:1000
                            });
                        }
                    }
                });
            },
            offBtn1(){
                const _this = this
                const params = {
                    id:61,
                    value:''
                }
                if(this.value1){
                    params.value = '1'
                }else{
                    params.value = '0'
                }
                
                var url = baseUrl+"/sys/config/update?token="+_this.token
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.getlist()
                            _this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:1000
                            });
                        }
                    }
                });
            },
            //弹框上传
            upload (event) {
                this.formData = new FormData()
                let file = event.target.files
                for (var i = 0; i < file.length; i++) {
                    this.formData.append('file',file[i])
                }
                this.submitUpload()
            },
            submitUpload(){
                this.$confirm('确认上传弹框图片吗？', '提示', {}).then(() => {
                    const _this= this;
                    // console.log(token)
                    _this.$http.post(baseUrl+'/act/actbanner/upload?type=7&token='+_this.token, _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                            const info = JSON.parse(response.bodyText);
                            _this.frameImageUrl = info.data[0].previewUrl+'?t='+Math.random()
                            // window.location.reload();
                        }, error => _this.$emit('complete', 500, error.message))
                });
            },
            //浮标上传
            uploadF (event) {
                this.formData = new FormData()
                let file = event.target.files
                for (var i = 0; i < file.length; i++) {
                    this.formData.append('file',file[i])
                }
                this.submitUploadF()
            },
            submitUploadF(){
                this.$confirm('确认上传浮标图片吗？', '提示', {}).then(() => {
                    const _this= this;
                    // console.log(token)
                    _this.$http.post(baseUrl+'/act/actbanner/upload?type=8&token='+_this.token, _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                            const info = JSON.parse(response.bodyText);
                            _this.floatImageUrl = info.data[0].previewUrl+'?t='+Math.random()
                            // window.location.reload();
                        }, error => _this.$emit('complete', 500, error.message))
                });
            }
        },
        mounted() {
            this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
            this.getlist()
        }
    }
</script>

<style>

</style>