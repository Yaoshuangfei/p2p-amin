<template>
	<section>
		<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="margin:20px auto;margin-left: 25%;color: #20a0ff;font-size: 16px;">发布banner</el-col>
		<el-col :offset="1" :xs="22" :sm="22" :md="22" :lg="22" style="margin-top: 40px;border-bottom:1px solid #ddd;padding-bottom: 10px;">以下带<span style="color: red">*</span>为必选项</el-col>
		<el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
				<el-form label-width="150px"  :model="filters" :rules="rules">
			       	<el-form-item label="标题：" prop="title">
						<el-input v-model="filters.title" type="text"></el-input>
					</el-form-item>
					<el-form-item label="描述：">
						<el-input v-model="filters.description" type="text"></el-input>
					</el-form-item>
					<el-form-item label="渠道code：" ><!-- @blur="channelId" 光标移出之后触发-->
						<el-input v-model="filters.opChannelId" type="text" ></el-input>
						<el-col style="color: red;" v-show="showEroor">{{error_info}}</el-col>
						此字段支持多个渠道code；多渠道用英文逗号隔开；如：360zs,yyb,xiaomi 不填则针对所有渠道
					</el-form-item>
					<el-form-item label="展示类型：" prop="title">
						<el-select v-model="showCid" clearable>
				      		<el-option v-for="item in optionsT" :label="item.label" :value="item.value"></el-option>
				    	</el-select> 渠道code若不为空此字段必填
					</el-form-item>
					<el-form-item label="活动链接：" prop="activityUrl">
						<el-input v-model="filters.activityUrl " type="text"></el-input>
					</el-form-item>
					<el-form-item label="类型：" prop="title">
						<el-select v-model="filters.type" clearable>
				      		<el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
				    	</el-select>
					</el-form-item>
					<el-form-item label="banner图片：" prop="title">
						<input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  @change="upload" id="fileInput">
						<button type="button" class="el-button el-button--primary el-button--small">
							<span>点击上传</span>
						</button>
						<!-- <button type="button" class="el-button el-button--primary el-button--small" id="btnClear" @click="clear">清空上传</button> -->
						<!-- <span style="display: block;font-size: 12px">{{ imageChange }}</span> -->
						<!--<button type="button" class="el-button el-button&#45;&#45;primary el-button&#45;&#45;small" id="btnClear" @click="clear">清空上传</button>-->
						<!--<span style="display: block;font-size: 12px">{{ imageChange }}</span>-->
						<img style="width: 100%" :src="imgUrl" alt="" @click="yulan(imgUrl)">
					</el-form-item>
					<!-- <el-form-item label="类型：">
						<el-select v-model="uploadDetails.poType" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</el-form-item> -->
					<el-col :span='24' style="margin-left:300px;">
						<!-- <el-button type="primary" @click.native="submitUpload" :loading="editLoading">预览</el-button> -->
						<el-button type="primary" @click.native="upBanner">发布</el-button>
					</el-col>
			    </el-form>
			</el-col>
			<el-dialog title="预览" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			  <img :src="ylimg" alt="" style="width: 100%">
			</el-dialog>
	</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				dialogVisible:false,
				ylimg:'',
				imgUrl:'',
				error_info:'',
				token:'',
				radio: '1',
				checked: true,
				showEroor:false,
				value:'',
				value1:'',
				value2:'',
				url:'',
				urls:'',
				qdID:[],
				removeOpChannelCode:'',
				opChannelCode :'',
				options: [{
		          value: '0',
		          label: '网站'
		        }, {
		          value: '1',
		          label: '手机'
		        }, {
		          value: '2',
		          label: 'WAP'
		        }],
		        showCid:'',
		        optionsT:[{
		          value: '0',
		          label: '针对此渠道展示'
		        }, {
		          value: '1',
		          label: '针对此渠道不展示'
		        }],
				filters: {
					title: '',
					description:'',
					opChannelId:'',
					activityUrl :'',
					type:'',
					imgUrl:''
				},
				rules: {
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
					],
					activityUrl: [
						{ required: true, message: '请输入活动链接', trigger: 'blur' }
					]
				},
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
			yulan(url){
				this.dialogVisible = true
				this.ylimg = url
			},
			handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            // done();
		            this.dialogVisible = false
		          })
		          .catch(_ => {});
		    },
			channelId(){
				const _this = this
				_this.showEroor = false
				let token = sessionStorage.getItem('token')
				token = JSON.parse(token)
				if(_this.filters.opChannelId !== ''){
					$.ajax({
	                    type:'GET',
	                    dataType:'json',
	                    url:baseUrl+'/op/opChannel/queryIdByName?token='+token+'&channelName='+_this.filters.opChannelId,
	                    // data:JSON.stringify(params),
	                    data:'',
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                        // console.log(data)
	                        if(data.code === 200){
	                        	_this.qdID = data.data
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
	                                duration:2000
	                            });
	                            _this.showEroor = true
	                            _this.error_info = data.message
	                        }
	                    }
	                });
				}
			},
			upBanner(){
				const _this = this
				if(_this.filters.opChannelId !== ''){
					if(_this.showCid === ''){
						_this.$message({
                          message: '展示类型必传',
                          type: 'error',
                          duration:1000
                        });
						return
					}
				}
				if(_this.showCid!== ''){
					if(_this.filters.opChannelId === ''){
						_this.$message({
                          message: '渠道code必传',
                          type: 'error',
                          duration:1000
                        });
						return
					}
				}
				if(_this.showCid === '1'){//不展示
					_this.removeOpChannelCode = _this.filters.opChannelId
					_this.opChannelCode = ''
					// const b = []
					// for (var i = 0; i < _this.qdID.length; i++) {
					// 	b.push('-'+_this.qdID[i])
					// }
					// _this.qdID = b
				}else if(_this.showCid === '0'){//展示
					_this.removeOpChannelCode = ''
					_this.opChannelCode = _this.filters.opChannelId
				}else{
					_this.removeOpChannelCode = ''
					_this.opChannelCode = ''
				}
				let token = sessionStorage.getItem('token')
				token = JSON.parse(token)
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/act/actbanner/save?token='+token+'&title='+_this.filters.title+'&description='+_this.filters.description+'&removeOpChannelCode='+_this.removeOpChannelCode+'&opChannelCode='+_this.opChannelCode+'&activityUrl='+_this.filters.activityUrl+'&type='+_this.filters.type+'&imgUrl='+_this.imgUrl,
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
//		    清空上传
            clear(){
                let btn = document.getElementById("btnClear");
                let files = document.getElementById("fileInput");
                this.fileImg = '';
                // for IE, Opera, Safari, Chrome
                if (files !== null && files.value) {
                    //     files.outerHTML = files.outerHTML;
                    // } else { // FF(包括3.5)
                    files.value = "";
                    this.formData = new FormData()
                }
            },
		    //图片上传
            upload (event) {
                this.formData = new FormData()
                let file = event.target.files[0]
                // let file = event.target.files
                // console.log(file)
                const self = this
                // const flag = this.flag
                if (file) {
                    // console.log('存在file', file)
                    // console.log(file.size)
                    this.fileImg = file.name
                    // console.log(this.formData)
                    this.formData.append('file', file);
                    this.submitUpload()
                } else {
                    this.fileImg = ''
                    // console.log('不存在file', file)
                    this.formData = new FormData()
                }
            },
            //添加
            submitUpload(){
                // this.$confirm('确认发布吗？', '提示', {}).then(() => {
                    const _this= this;
                    let token = sessionStorage.getItem('token')
					token = JSON.parse(token)
					// console.log(token)
                    _this.$http.post(baseUrl+'/act/actbanner/upload?type=1&token='+token, _this.formData, {
                        progress(event) {
                        	console.log(event)
                        }
                    })
                        .then(response => {
                        	if(response.body.code === 200){
	                        	const info = JSON.parse(response.bodyText);
	                        	_this.filters.imgUrl = info.data[0].filePath
	                        	_this.imgUrl = info.data[0].previewUrl
                        	}else{
                        		 _this.$message({
	                                message: response.body.message,
	                                type: 'error',
	                                duration:1000
	                            });
                        	}
                        	// _this.filters.imgUrl = info.data.filePath
                        	// _this.imgUrl = info.data.previewUrl
                        	// console.log(_this.filters.imgUrl)
                        }, error => _this.$emit('complete', 500, error.message))
                // });
            }
		},
		mounted() {
		}
	}
</script>

<style>

</style>