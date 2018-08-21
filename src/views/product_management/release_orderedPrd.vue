<template>
	<section>
		<el-row>
			<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="text-align: center;margin-top: 20px;margin-bottom:20px;color: #20a0ff;font-size: 16px;">发布预约产品</el-col>			<el-col :offset="1" :xs="22" :sm="22" :md="22" :lg="22">
				<el-collapse v-model="activeNames">
				  <el-collapse-item title="正在营销/预约中的产品" name="1">
				  	<el-col :offset="1" :xs="11" :sm="11" :md="11" :lg="11">营销中</el-col>
				  	<el-col :offset="1" :xs="11" :sm="11" :md="11" :lg="11">预约中</el-col>
				  	<el-col :offset="1" :xs="11" :sm="11" :md="11" :lg="11" style="overflow-y: auto; height: 250px;">
						<el-table :data="Left_list" highlight-current-row v-loading="listLoading" border>
							<el-table-column type="index" label="序号">
							</el-table-column>
							<el-table-column prop="title"  label="产品名称">
							</el-table-column>
							<el-table-column prop="leftMoney"  label="剩余金额(元)">
							</el-table-column>
						</el-table>
				  	</el-col>
				  	<el-col :offset="1" :xs="11" :sm="11" :md="11" :lg="11" style="overflow-y: auto; height: 250px;">
						<el-table :data="right_list" highlight-current-row v-loading="listLoading" border>
							<el-table-column type="index" label="序号">
							</el-table-column>
							<el-table-column prop="title"  label="产品名称">
							</el-table-column>
							<el-table-column prop="insertTime"  label="发布时间">
							</el-table-column>
						</el-table>
				  	</el-col>
				  </el-collapse-item>
				</el-collapse>
			</el-col>
			<el-col :offset="1" :xs="22" :sm="22" :md="22" :lg="22" style="margin-top: 40px;border-bottom:1px solid #ddd;padding-bottom: 10px;">以下带*为必选项</el-col> <!--  -->
			<el-col :offset="2" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
				<el-form label-width="150px" :rules="rules" ref="ruleForm" :model="ruleForm">
			        <el-form-item label="产品名称:" prop="name">
			          <el-input  style="width:500px;" v-model="ruleForm.name"></el-input>
			        </el-form-item>
			        <!-- <el-col :offset="5" style="margin-bottom: 10px;padding-left: 10px;color: #aaa;">目前已发布77个新手专享产品(含预约中的产品)</el-col> -->
			        <el-form-item label="发起企业:" prop="realName">
			          <el-input  style="width:500px;" v-model="ruleForm.realName"></el-input>
			        </el-form-item>
			        <el-form-item label="发起人联系电话:" prop="phone">
			          <el-input  style="width:500px;" v-model="ruleForm.phone"></el-input>
			        </el-form-item>
			        <el-form-item label="投资类别:" prop="phone">
			          <el-select v-model="ruleForm.investment_type" placeholder="请选择">
			 			<el-option v-for="item in optionsRT" :key="item.value" :label="item.label" :value="item.value"></el-option>
			          </el-select>
			          新手标是货押宝投资类别
			        </el-form-item>
			        <el-form-item label="常规产品时间类型:" prop="phone">
			          <el-radio-group v-model="ruleForm.cgtime">
					    <el-radio :label="10">周标</el-radio>
					    <el-radio :label="11">新手</el-radio>
					    <el-radio :label="20">月标</el-radio>
					    <el-radio :label="25">半季标</el-radio>
					    <el-radio :label="30">双月标</el-radio>
					    <el-radio :label="40">单季标</el-radio>
					    <el-radio :label="50">双季标</el-radio>
					  </el-radio-group>
			        </el-form-item>
			        <el-form-item label="常规产品类型:" prop="phone">
			        	<el-radio-group v-model="ruleForm.cgtype">
							    <el-radio :label="0">普通产品</el-radio>
							    <el-radio :label="1">爆款产品</el-radio>
							    <el-radio :label="2">活动产品</el-radio>
							  </el-radio-group>
			        </el-form-item>
			        <el-form-item label="项目总额:" prop="total_project">
			          <el-input  style="width:300px;" v-model="ruleForm.total_project"></el-input>
			          （元）
			        </el-form-item>
			        <el-form-item label="奖励收益:" prop="jl">
			          <el-input  style="width:100px;" v-model="ruleForm.jl"></el-input>% +
			          <el-input  style="width:100px;" v-model="ruleForm.sy"></el-input>%
			        </el-form-item>
			        <el-form-item label="还款方式:" prop="type">
			          <el-select v-model="ruleForm.type" placeholder="请选择">
						 	<el-option v-for="item in optionsL" :key="item.value" :label="item.label" :value="item.value"></el-option>
			          </el-select>
			        </el-form-item>
			        <el-form-item label="理财期限:" prop="days">
			          <el-input  style="width:200px;" v-model="ruleForm.days"></el-input>
			           天
			        </el-form-item>
			        <el-form-item label="手机活动链接:">
			          <el-input  style="width:500px;" v-model="ruleForm.active_link"></el-input>
			        </el-form-item>
			        <el-form-item label="标的活动名称:">
			          <el-input v-model="ruleForm.product_name" style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="项目介绍:" prop="introduction">
			          <el-input type="textarea" :rows="6" v-model="ruleForm.introduction"  style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="项目流程及说明:" prop="cpjs">
			          <el-input type="textarea" :rows="6" v-model="ruleForm.cpjs"  style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="项目流程图:" prop="days">
			        	<input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  @change="upload" id="fileInput">
						<button type="button" class="el-button el-button--primary el-button--small">
							<span>点击上传</span>
						</button>
			        </el-form-item>
			        <img :src="imgUrl" style="margin-left: 150px;" alt="" @click="yulan(imgUrl)">
			    </el-form>
			</el-col>
			<el-col :offset="1" :xs="11" :sm="11" :md="11" :lg="11" style="margin-top: 20px;"> <!--  -->
				<el-form label-width="150px" :rules="rulesRight" ref="rightForm" :model="rightForm">
			        <el-form-item label="是否新手产品:" prop="license_number">
			        	<el-radio-group v-model="rightForm.isxs">
							    <el-radio :label="20">否</el-radio>
							    <el-radio :label="10">是</el-radio>
							  </el-radio-group>
			          <!-- <el-input  style="width:500px;" v-model="rightForm.license_number"></el-input> -->
			        </el-form-item>
			        <el-form-item label="证件号:" prop="license_number">
			          <el-input  style="width:500px;" v-model="rightForm.license_number"></el-input>
			        </el-form-item>
			        <el-form-item label="发起人联系地址:" prop="address">
			          <el-input  style="width:500px;" v-model="rightForm.address"></el-input>
			        </el-form-item>
			        <el-form-item label="推荐产品:" prop="address">
			        	<el-radio-group v-model="rightForm.tjpro">
						    <el-radio :label="0">不推荐</el-radio>
						    <el-radio :label="1">推荐</el-radio>
						  </el-radio-group>
			        </el-form-item>
			        <el-form-item label="起投金额:" prop="start_lump_sum">
			          <el-input  style="width:300px;" v-model="rightForm.start_lump_sum"></el-input>
			          （元）
			        </el-form-item>
			        <el-form-item label="总收益:" prop="income">
			          <el-input  style="width:100px;" v-model="rightForm.income"></el-input> %
			        </el-form-item>
			        <el-form-item label="计息方式:" prop="breath_day">
			        	<el-select v-model="rightForm.breath_day" placeholder="请选择">
						 	<el-option v-for="item in optionsRB" :key="item.value" :label="item.label" :value="item.value"></el-option>
			          </el-select>
			          <!-- <el-input  style="width:500px;" v-model="rightForm.breath_day"></el-input> -->
			        </el-form-item>
			        <el-form-item label="购买截止时间:" prop="jstime">
			          <el-date-picker v-model="rightForm.buyCloseTime" type="date" placeholder="选择日期"></el-date-picker>
			        </el-form-item>
			        <el-form-item label="项目预计结束时间:" prop="jstime">
			          <el-date-picker v-model="rightForm.finishTime" type="date" placeholder="选择日期"></el-date-picker>
			        </el-form-item>
			        <el-form-item label="活动标语:">
			          <el-input  style="width:500px;" v-model="rightForm.campaign_slogan"></el-input>
			        </el-form-item>
			        <el-form-item label="网站活动链接:">
			          <el-input style="width:500px;" v-model="rightForm.webActive_link"></el-input>
			        </el-form-item>
			        <el-col style="color: red;margin-left: 25px;">标题颜色 # + 6位数字字母组合 如： #ff23d4</el-col>
			        <el-form-item label="标题活动名称颜色:">
			          <el-input v-model="rightForm.btcolor" style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="项目特点:" prop="features">
			          <el-input type="textarea" :rows="6" v-model="rightForm.features" style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="相关资料图片:" prop="features">
			        	<input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px" multiple="multiple"  @change="uploadxg" id="fileInput">
						<button type="button" class="el-button el-button--primary el-button--small">
							<span>点击上传</span>
						</button>
			        </el-form-item>
			        <el-col :span="20">
						<el-col :offset="3" :span="3" v-for="(item,index) in img" >
							<img src="./../../assets/icon_close.png" @click="deldeImg(index)" style="width: 15px;position: relative;left: 143px;top: 10px;">
							<img :src="item" style="margin-left: 50px;" alt="" @click="yulan(item)">
						</el-col>
			        </el-col>
			    </el-form>
			</el-col>
			<el-col :offset="1" :xs="22" :sm="22" :md="22" :lg="22" style="margin-top: 140px;margin-bottom: 200px;text-align: center;">
					<el-button type="primary" @click="releaseBtn">发布</el-button>
			</el-col>
		</el-row>
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
				token:'',
				Left_list:[],
				right_list:[],
				listLoading:false,
				activeNames: ['1'],//是否展开 '1'
				informationImage:[],
				processImg:'',
				imgUrl:'',
				img:[],
				ruleForm:{
					name:'',//产品名称
					realName:'',//发起企业
					phone:'',//发起人联系电话
					investment_type:'0',//投资类别
					cgtime:'',//常规产品时间类型
					cgtype:'',//常规产品类型
					total_project:'',
					jl:'',
					sy:'',
					days:'',//理财期限
					type:'',
					// time:'',
					active_link:'',//手机活动链接
					product_label:'',
					product_name:'',
					protection:'',
					cpjs:'',//产品类型介绍
					introduction:''
				},
				rightForm:{
					isxs:'',
					license_number:'',
					tjpro:'',
					jlpro:'',
					fzmodel:'',
					address:'',
					start_lump_sum:'',
					income:'',
					breath_day:'',
					campaign_slogan:'',
					webActive_link:'',
					jk_yt:'',
					btcolor:'',
					zibz:'',
					prolct:'',
					features:'',
					buyCloseTime:'',
					finishTime:''
				},
				rules:{
					name: [
			            { required: true, message: '请输入产品名称', trigger: 'blur' }
			        ],
			        realName: [
			        	{ required: true, message: '请输入企业名称', trigger: 'blur' },
			            // { min: 8,  message: '发起企业名称长度要大于8位', trigger: 'blur' }
			        ],
			        phone: [
			            { required: true, message: '请输入发起人联系电话', trigger: 'blur' }
			        ],
			        total_project: [
			            { required: true, message: '请输入项目总额', trigger: 'blur' }
			        ],
			        days: [
			            { required: true, message: '请输入理财期限', trigger: 'blur' }
			        ],
			        type: [
			            { required: true, message: '请选择还款方式', trigger: 'blur' }
			        ],
			        time: [
			            { required: true, message: '请选择时间', trigger: 'blur' }
			        ],
			        jl: [
			            { required: true, message: '请输入奖励收益', trigger: 'blur' }
			        ],
			        introduction: [
			            { required: true, message: '请输入项目介绍', trigger: 'blur' }
			        ],
			        cpjs: [
			            { required: true, message: '请输入项目流程及说明', trigger: 'blur' }
			        ]
				},
				rulesRight:{
					investment_type: [
			            { required: true, message: '请选择投资类别', trigger: 'blur' }
			        ],
			        license_number: [
			            { required: true, message: '请输入证件号', trigger: 'blur' }
			        ],
			        address: [
			            { required: true, message: '请输入联系地址', trigger: 'blur' }
			        ],
			        start_lump_sum: [
			            { required: true, message: '请输入起投总额', trigger: 'blur' }
			        ],
			        income: [
			            { required: true, message: '请输入总收益', trigger: 'blur' }
			        ],
			        breath_day: [
			            { required: true, message: '请选择起息日模式', trigger: 'blur' }
			        ],
			        features: [
			            { required: true, message: '请输入项目特点', trigger: 'blur' }
			        ]
				},
				optionsL: [{
		          value: '0',
		          label: '按月付息到期还本'
		        },{
		          value: '1',
		          label: '到期还本付息'
		        },{
		          value: '2',
		          label: '按季付息到期还本'
		        },{
		          value: '3',
		          label: '按年付息到期还本'
		        }],
		        optionsRT: [{
		          value: '0',
		          label: '贸易通'
		        },{
		          value: '1',
		          label: '车贷宝'
		        },{
		          value: '2',
		          label: '货押宝'
		        }],
		        optionsRB: [{
		          value: '0',
		          label: 'T+0'
		        },{
		          value: '1',
		          label: 'T+1'
		        }],
		        formData: new FormData(),
		        fileImg: ''
					}
				},
	    computed: {

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
			deldeImg(index){
				this.img.splice(index, 1)
				this.informationImage.splice(index, 1)
			},
			releaseBtn(){
				const _this = this;
				let buyCloseTime = ''
				let finishTime = ''
				if(_this.rightForm.buyCloseTime !== '' && _this.rightForm.buyCloseTime !== null){
					const by = _this.rightForm.buyCloseTime.getMonth() + 1
					buyCloseTime = _this.rightForm.buyCloseTime.getFullYear()+'-'+ by +'-'+_this.rightForm.buyCloseTime.getDate() +' 00:00:00'
				}
				if(_this.rightForm.finishTime !== '' && _this.rightForm.finishTime !== null){
					const fy = _this.rightForm.finishTime.getMonth() + 1
					finishTime = _this.rightForm.finishTime.getFullYear()+'-'+ fy +'-'+_this.rightForm.finishTime.getDate() +' 00:00:00'
				}
				const params = {
					title:_this.ruleForm.name,//产品标题
					yearRate:_this.rightForm.income,////年化总收益率
					addRate:_this.ruleForm.sy,//加息额度
					baseRate:_this.ruleForm.jl,//基础年化收益
					periodType:_this.ruleForm.cgtime.toString(),//产品期限类型
					productType:_this.rightForm.isxs.toString(),//产品类型
					investType:_this.ruleForm.investment_type,//投资类型
					financingDay:_this.ruleForm.days,//理财期限
					payInterestWay:_this.ruleForm.type,//还款方式
					calcInterestWay:_this.rightForm.breath_day,//计息方式
					totalCopies:_this.ruleForm.total_project,//项目总额
					atleastMoney:_this.rightForm.start_lump_sum,//起投金额
					buyCloseTime:buyCloseTime,//购买截止时间
					finishTime:finishTime,//项目预计结束时间  展示给用户看的结束时间
					phone:_this.ruleForm.phone,//联系电话
					realName:_this.ruleForm.realName,//真实姓名
					idCard:_this.rightForm.license_number,//证件号
					informationImage:_this.informationImage.join(";"),//图片地址
					address:_this.rightForm.address,//地址
					productLeave:_this.ruleForm.cgtype.toString(),
					mobileActivityUrl:_this.ruleForm.active_link,
					webActivityUrl:_this.rightForm.webActive_link,
					hot:_this.rightForm.tjpro.toString(),
					activitySlogan:_this.rightForm.campaign_slogan,
					activity:_this.ruleForm.product_name,
					activityColor:_this.rightForm.btcolor,
					jsonInfo:{
						introduce:{
							title:'项目介绍',
							content:encodeURI(encodeURI(_this.ruleForm.introduction,"utf-8"),"utf-8"),
							image:'',
						},
						process:{
							title:'项目流程及说明',
							content:encodeURI(encodeURI(_this.ruleForm.cpjs,"utf-8"),"utf-8"),
							image:_this.imgUrl,
						},
						point:{
							title:'项目特点',
							content:encodeURI(encodeURI(_this.rightForm.features,"utf-8"),"utf-8"),
							image:'',
						}
					}
				} 
                if(_this.ruleForm.introduction === '' || _this.ruleForm.cpjs === '' || _this.imgUrl === '' || _this.rightForm.features === '' || params.informationImage === ''){
                	_this.$message({
                      message: '项目介绍、项目流程及说明、项目特点、项目流程图、相关资料图片必传',
                      type: 'error',
                      duration:3000
                    });
                }else{
	                $.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/pro/proproduct/releaseProduct?token='+_this.token,
	                    data:JSON.stringify(params),
	                    pageEncoding:"UTF-8",
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                    	if(data.code === 200){
	                            _this.$message({
	                              message: data.message,
	                              type: 'success',
	                              duration:1000
	                            });
	                            for (var i = 0; i < state.tagArry.length; i++) {
	                            	if(state.tagArry[i].path === '产品发布记录'){
										state.id = i
										break;
									}
	                            }
	                            _this.$router.push({ path: '/ifm_prdReleaseRecord' });
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
				}
			},
			//图片上传
	      upload (event) {
	        this.formData = new FormData()
	        let file = event.target.files[0]
	        const self = this
	        if (file) {
	            this.fileImg = file.name
	            this.formData.append('file', file);
	            this.submitUpload()
	        } else {
	            this.fileImg = ''
	            this.formData = new FormData()
	        }
	      },
	      submitUpload(){
                    const _this= this;
                    _this.$http.post(baseUrl+'/act/actbanner/upload?token='+_this.token+'&type=3', _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                        	const info = JSON.parse(response.bodyText);
                        	_this.processImg = info.data[0].filePath
                        	_this.imgUrl = info.data[0].previewUrl
                        }, error => _this.$emit('complete', 500, error.message))
            },
            uploadxg (event) {
		        this.formData = new FormData()
		        let file = event.target.files
		        for (var i = 0; i < file.length; i++) {
		        	this.formData.append('file',file[i])
		        }
		        this.submitUploadxg()
	      },
	      submitUploadxg(){
                    const _this= this;
                    _this.$http.post(baseUrl+'/act/actbanner/upload?token='+_this.token+'&type=3', _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                        	const info = JSON.parse(response.bodyText);
                        	for (var i = 0; i < info.data.length; i++) {
	                        	_this.informationImage.push(info.data[i].filePath)
	                        	_this.img.push(info.data[i].previewUrl)
                        	}
                        }, error => _this.$emit('complete', 500, error.message))
            },
            getlist(){
				const _this = this;
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pro/proproduct/pageListProduct?status=30&token='+_this.token,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code === 200){
                            _this.Left_list = data.data.pageList.list
                            _this.$message({
                                message: '成功',
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
			getlistR(){
				const _this = this;
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pro/proproduct/pageListProduct?status=20&token='+_this.token,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code === 200){
                            _this.right_list = data.data.pageList.list
                            _this.$message({
                                message: '成功',
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
			}
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
			this.getlist()
			this.getlistR()
		}
	}
</script>

<style>

</style>