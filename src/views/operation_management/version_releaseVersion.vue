<template>
	<section>
		<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="margin:20px auto;margin-left: 18%;color: #20a0ff;font-size: 16px;">发布版本</el-col>
		<el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
				<el-form label-width="150px">
                    <el-form-item label="系统类型：">
                        <el-select v-model="platform" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
					<el-form-item label="版本号：">
                        <el-input v-model="appVersion" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
                    <el-form-item label="更新地址：" v-show="platform !== '0'">
                        <el-input v-model="updateUrl" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
					<el-form-item label="文件大小：" v-show="platform === '0'">
                        <el-input v-model="fileSize" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
					<el-form-item label="是否强制更新：">
						<el-select v-model="type" placeholder="请选择">
					    <el-option
					      v-for="item in newOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</el-form-item>
                    <el-form-item label="安卓包：" v-show="platform === '0'">
                        <input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  @change="upload" id="fileInput">
                        <button type="button" class="el-button el-button--primary el-button--small">
                            <span>点击上传</span>
                        </button>
                    </el-form-item>
                    <el-col :offset="3" style="margin-bottom: 20px;">{{name}}</el-col>
                    <el-form-item label="更新内容：  ">
                        <el-input v-model="content" style="width: 300px;" type="textarea"></el-input> 
                    </el-form-item>
                    <el-col :offset="3" :span="24" v-show="progressShou">
                        <el-col :span="10" style="margin-bottom: 20px;">
                            <el-progress :percentage="upSize"></el-progress>
                        </el-col>
                    </el-col>
				<el-col :span='24' style="margin-left:250px;">
					<el-button type="primary" @click.native="UploadAndroid" :loading="editLoading">提交</el-button>
				</el-col>
			    </el-form>
			</el-col>
            <el-upload class="upload-demo" action="p2p-admin/sys/sysVersions/upload?type=5&token=edd8547ba0b35b0ec19b89d3426bc1e5" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
	</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';
    import axios from 'axios';
	export default {
		data() {
			return {
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                token:'',
                platform:'',
                appVersion:'',
                fileSize:'',
                updateUrl:'',
                type:'',
                content:'',
				options: [{
		          value: '0',
		          label: 'Android'
		        },{
		          value: '1',
		          label: 'iOS'
		        },{
                  value: '2',
                  label: 'pc'
                },{
                  value: '3',
                  label: 'wap'
                }],
                newOption: [{
                  value: '0',
                  label: '否'
                },{
                  value: '1',
                  label: '是'
                }],
				editLoading: false,
                formData: new FormData(),
                fileImg: '',
                name:'',
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
		    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
            //添加
            submitUpload(){
                const _this = this
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/sysVersions/releaseVersion?token='+_this.token+'&platform='+_this.platform+'&appVersion='+_this.appVersion+'&fileSize='+_this.fileSize+'&updateUrl='+_this.updateUrl+'&type='+_this.type+'&content='+_this.content,
                    // data:data,
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
                                if(state.tagArry[i].path === '版本展示'){
                                    state.id = i
                                    break;
                                }
                            }
                            _this.$router.push({ path: '/version_versionShow' });
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
            //包上传
            upload(event) {
                this.formData = new FormData()
                let file = event.target.files
                // console.log(file)
                this.formData.append('file',file[0])
                // this.submitUpload()
                this.name = file[0].name
            },
            UploadAndroid1(){
                const _this = this
                console.log(1)
                $.ajax({
                    type: "POST",
                　　url: baseUrl+'/sys/sysVersions/upload?type=5&token='+_this.token,
                　　data: _this.formData ,　　//这里上传的数据使用了formData 对象
                　　processData : false, 
                　　//必须false才会自动加上正确的Content-Type 
                　　contentType : false , 
                　　//这里我们先拿到jQuery产生的 XMLHttpRequest对象，为其增加 progress 事件绑定，然后再返回交给ajax使用
                　　xhr: function(){
                　　　　var xhr = $.ajaxSettings.xhr();
                　　　　if(onprogress && xhr.upload) {
                　　　　　　xhr.upload.onprogress = progressFunction;
                 　　　　　 return xhr;
                 　　　 }
                 　 }
                })
            },
            UploadAndroid(){
                if(this.platform === '0'){
                    this.$confirm('上传包会覆盖原有的apk，确认上传吗？', '提示', {}).then(() => {
                        console.log('开始上传！')
                        const _this= this;
                        // _this.editLoading = true
                        // _this.progressShou = true
                        // let token = sessionStorage.getItem('token')
                        // token = JSON.parse(token)
                        // let m = 120
                        // _this.upSize = 0
                        // const timer = setInterval(function(){
                        //     m -= 1
                        //     _this.upSize += 1
                        //     if(m === 0 || _this.upSize === 100){//满足某个条件时 清除定时器
                        //         clearInterval(timer);
                        //     }
                        // }, 300)
                        _this.$http.post(baseUrl+'/sys/sysVersions/upload?type=5&token='+_this.token, _this.formData, {
                            progress(event) {
                                console.log(event)
                                // if (event.lengthComputable) {
                                //   // var percent = Math.floor(event.loaded/event.total*100);
                                //   var percent = (event.loaded / event.total * 100 | 0) + '%'
                                //     console.log(percent)
                                //   if(percent <= 100) {
                                //     // $("#J_progress_bar").progress('set progress', percent);
                                //     // $("#J_progress_label").html('已上传：'+percent+'%');
                                //   }
                                //   if(percent >= 100) {
                                //     // $("#J_progress_label").html('文件上传完毕，提交表单中，请等待...');
                                //     // $("#J_progress_label").addClass('success');
                                //   }
                                // }
                            }
                        })
                            .then(response => {
                                // console.log(response)
                                const info = JSON.parse(response.bodyText);
                                if(response.body.code === 200){
                                    // clearInterval(timer);
                                    _this.upSize = 100
                                    _this.$message({
                                        message: response.body.message,
                                        type: 'success',
                                        duration:1000
                                    });
                                    _this.editLoading = false
                                    _this.submitUpload()
                                    // clearInterval(timer);
                                }else if(response.body.code === 403){
                                    _this.$message({
                                        message: response.body.message,
                                        type: 'error',
                                        duration:1000
                                    });
                                    _this.loading = false
                                    // clearInterval(timer);
                                    _this.$router.push({ path: '/login' });
                                }else{
                                    _this.$message({
                                        message: response.body.message,
                                        type: 'error',
                                        duration:1000
                                    });
                                    _this.upSize = 0
                                    _this.editLoading = false
                                    _this.progressShou = false
                                    // clearInterval(timer);
                                }
                            }, error => _this.$emit('complete', 500, error.message))
                    });
                }else{
                    this.submitUpload()
                }
            }
		},
		mounted() {
            this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
		}
	}
</script>

<style>

</style>