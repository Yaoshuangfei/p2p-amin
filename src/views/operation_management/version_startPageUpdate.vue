<template>
    <section>
        <el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
            <el-form label-width="150px">
                <el-form-item label="启动页图片：">
                    <input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  multiple="multiple"  @change="upload" id="fileInput">
                    <button type="button" class="el-button el-button--primary el-button--small">
                        <span>点击上传</span>
                    </button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-col :span="5" v-for="item in img" style="margin-left: 20px;">
                <img style="width: 100%" :src="item" alt="">
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
                img:[],
                token:'',
                formData: new FormData(),
                fileImg: ''
            }
        },
        computed: {
            // 实时更新上传图片的名字，仅读取，值只须为函数
            imageChange: function () {
                return this.fileImg
            }
        },
        methods: {
            upBanner(){
                const _this = this
                const params = {
                    title:_this.filters.title,
                    description:_this.filters.description,
                    opChannelId:_this.filters.opChannelId,
                    activityUrl :_this.filters.activityUrl,
                    type:_this.filters.type,
                    imgUrl:_this.filters.imgUrl
                }
                let token = sessionStorage.getItem('token')
                token = JSON.parse(token)
                // console.log(_this.filters.activityUrl)
                // console.log(_this.filters.imgUrl)
                // console.log(_this.imgUrl)
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/act/actbanner/save?token='+token+'&title='+_this.filters.title+'&description='+_this.filters.description+'&opChannelId='+_this.filters.opChannelId+'&activityUrl='+_this.filters.activityUrl+'&type='+_this.filters.type+'&imgUrl='+_this.imgUrl,
                    // data:JSON.stringify(params),
                    data:'',
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        // console.log(data)
                        if(data.code === 200){
                            _this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
                            for (var i = 0; i < state.tagArry.length; i++) {
                                if(state.tagArry[i].path === 'Banner展示'){
                                    state.id = i
                                    break;
                                }
                            }
                            _this.$router.push({ path: '/banner_bannerShow' });
                        }else if(data.code === 403){
                            // console.log(111)
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
            //图片上传
            upload (event) {
                this.formData = new FormData()
                let file = event.target.files
                for (var i = 0; i < file.length; i++) {
                    this.formData.append('file',file[i])
                }
                this.submitUpload()
            },
            //添加
            submitUpload(){
                this.$confirm('确认上传吗？', '提示', {}).then(() => {
                    const _this= this;
                    let token = sessionStorage.getItem('token')
                    token = JSON.parse(token)
                    // console.log(token)
                    _this.$http.post(baseUrl+'/op/opPageStart/upload?type=4&token='+token, _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                            // console.log(response)
                            const info = JSON.parse(response.bodyText);
                            for (var i = 0; i < info.data.length; i++) {
                                _this.img.push(info.data[i].startPageUrl)
                            }
                            // console.log(_this.filters.imgUrl)
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