<template>
	<section>
		<el-row>
			<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="text-align: center;margin-top: 20px;color: #20a0ff;font-size: 16px;">发布常规产品</el-col>
			<el-col :offset="1" :xs="22" :sm="22" :md="22" :lg="22" style="margin-top: 40px;border-bottom:1px solid #ddd;padding-bottom: 10px;">以下带<span style="color: red">*</span>为必选项</el-col>
			<el-col :offset="2" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
				<el-form label-width="150px" :rules="rules" ref="ruleForm" :model="ruleForm">
			        <el-form-item label="产品名称:" prop="name">
			          <el-input  style="width:500px;" v-model="ruleForm.name"></el-input>
			        </el-form-item>
			        <el-col :offset="5" style="margin-bottom: 10px;padding-left: 10px;color: #aaa;">目前已发布77个新手专享产品(含预约中的产品)</el-col>
			        <el-form-item label="发起企业:" prop="enterprise">
			          <el-input  style="width:500px;" v-model="ruleForm.enterprise"></el-input>
			        </el-form-item>
			        <el-form-item label="发起人联系电话:" prop="phone">
			          <el-input  style="width:500px;" v-model="ruleForm.phone"></el-input>
			        </el-form-item>
			        <el-form-item label="投资类别:" prop="phone">
			          <el-select v-model="ruleForm.investment_type" placeholder="请选择">
			 			<el-option v-for="item in optionsRT" :key="item.value" :label="item.label" :value="item.value"></el-option>
			          </el-select>
			          新手标是货押宝投资类别
			          <!-- <el-input  style="width:500px;" v-model="ruleForm.phone"></el-input> -->
			        </el-form-item>
			        <el-form-item label="常规产品时间类型:" prop="phone">
			          <el-radio-group v-model="ruleForm.cgtime">
							    <el-radio :label="1">周标</el-radio>
							    <el-radio :label="2">月标</el-radio>
							    <el-radio :label="3">单季标</el-radio>
							    <el-radio :label="4">双季标</el-radio>
							    <el-radio :label="5">新手标</el-radio>
							    <el-radio :label="6">半季标</el-radio>
							    <el-radio :label="7">双月标</el-radio>
							  </el-radio-group>
			          <!-- <el-input  style="width:500px;" v-model="ruleForm.phone"></el-input> -->
			        </el-form-item>
			        <el-form-item label="常规产品类型:" prop="phone">
			        	<el-radio-group v-model="ruleForm.cgtype">
							    <el-radio :label="1">普通</el-radio>
							    <el-radio :label="2">爆款</el-radio>
							    <el-radio :label="3">活动</el-radio>
							  </el-radio-group>
			          <!-- <el-input  style="width:500px;" v-model="ruleForm.phone"></el-input> -->
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
			          <!-- <el-input  style="width:500px;" v-model="ruleForm.type"></el-input> -->
			        </el-form-item>
			        <el-form-item label="理财期限:" prop="days">
			          <el-input  style="width:200px;" v-model="ruleForm.days"></el-input>
			           天
			        </el-form-item>
			        <!-- <el-form-item label="自动进入已售罄时间:" prop="time">
			          <el-input  style="width:500px;" v-model="ruleForm.time"></el-input>
			        </el-form-item> -->
			        <!-- <el-col :offset="5" style="margin-bottom: 10px;padding-left: 10px;color: #aaa;">当前时间如果达到此时间，则该新手产品自动进入已售罄状态</el-col> -->
			        <el-form-item label="手机活动链接:">
			          <el-input  style="width:500px;" v-model="ruleForm.active_link"></el-input>
			        </el-form-item>
			        <el-form-item label="产品标签:">
			          <el-input v-model="ruleForm.product_label" style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="标的活动名称:">
			          <el-input v-model="ruleForm.product_name" style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="还款来源:">
			          <el-input type="textarea" :rows="6" v-model="ruleForm.protection"  style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="产品类型介绍:">
			          <el-input type="textarea" :rows="6" v-model="ruleForm.cpjs"  style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="项目介绍:">
			          <el-input type="textarea" :rows="6" v-model="ruleForm.introduction"  style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="项目图片:">
			        	<input type="file" style="position:absolute;opacity:0;width:70px;height:30px;margin-right:10px"  @change="upload" id="fileInput">
								<button type="button" class="el-button el-button--primary el-button--small">
									<span>点击上传</span>
								</button>
			          <!-- <el-input  style="width:500px;"></el-input> -->
			        </el-form-item>
			    </el-form>
			</el-col>
			<el-col :offset="1" :xs="11" :sm="11" :md="11" :lg="11" style="margin-top: 20px;">
				<el-form label-width="150px" :rules="rulesRight" ref="rightForm" :model="rightForm">
			        <el-form-item label="是否新手产品:" prop="license_number">
			        	<el-radio-group v-model="rightForm.isxs">
							    <el-radio :label="1">否</el-radio>
							    <el-radio :label="2">是</el-radio>
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
							    <el-radio :label="1">否</el-radio>
							    <el-radio :label="2">是</el-radio>
							  </el-radio-group>
			        </el-form-item>
			        <el-form-item label="奖励产品:" prop="address">
			        	<el-radio-group v-model="rightForm.jlpro">
							    <el-radio :label="1">否</el-radio>
							    <el-radio :label="2">是</el-radio>
							  </el-radio-group>
			        </el-form-item>
			        <el-form-item label="放置模块:" prop="address">
			        	<el-radio-group v-model="rightForm.fzmodel">
							    <el-radio :label="1">优选理</el-radio>
							    <el-radio :label="2">特色理财</el-radio>
							  </el-radio-group>
			        </el-form-item>
			        <el-form-item label="起投总额:" prop="start_lump_sum">
			          <el-input  style="width:300px;" v-model="rightForm.start_lump_sum"></el-input>
			          （元）
			        </el-form-item>
			        <el-form-item label="总收益:" prop="income">
			          <el-input  style="width:100px;" v-model="rightForm.income"></el-input> %
			        </el-form-item>
			        <el-form-item label="起息日:" prop="breath_day">
			        	<el-select v-model="rightForm.breath_day" placeholder="请选择">
						 			<el-option v-for="item in optionsRB" :key="item.value" :label="item.label" :value="item.value"></el-option>
			          </el-select>
			          <!-- <el-input  style="width:500px;" v-model="rightForm.breath_day"></el-input> -->
			        </el-form-item>
			        <el-form-item label="项目结束时间:"> <!-- prop="jstime" -->
			          <el-date-picker v-model="rightForm.jstime" type="date" placeholder="选择日期"></el-date-picker>
			          <!-- <el-input  style="width:500px;" v-model="rightForm.jstime"></el-input> -->
			        </el-form-item>
			        <el-form-item label="网站活动链接:">
			          <el-input style="width:500px;" v-model="rightForm.webActive_link"></el-input>
			        </el-form-item>
			        <el-form-item label="活动标语:">
			          <el-input  style="width:500px;" v-model="rightForm.campaign_slogan"></el-input>
			        </el-form-item>
			        <el-form-item label="标题活动名称颜色:">
			          <el-input type="textarea" :rows="6" v-model="rightForm.btcolor" style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="资金保障:">
			          <el-input type="textarea" :rows="6" v-model="rightForm.zibz" style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="产品流程图:">
			          <el-input type="textarea" :rows="6" v-model="rightForm.prolct" style="width:500px;"></el-input>
			        </el-form-item>
			        <el-form-item label="项目特点:">
			          <el-input type="textarea" :rows="6" v-model="rightForm.features" style="width:500px;"></el-input>
			        </el-form-item>
			    </el-form>
			</el-col>
			<el-col :offset="1" :xs="22" :sm="22" :md="22" :lg="22" style="margin-top: 140px;margin-bottom: 200px;text-align: center;">
					<el-button type="primary">发布</el-button>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				ruleForm:{
					name:'',
					enterprise:'',
					phone:'',
					investment_type:'',
					cgtime:'',
					cgtype:'',
					total_project:'',
					jl:'',
					sy:'',
					days:'',
					type:'',
					time:'',
					active_link:'',
					product_label:'',
					product_name:'',
					protection:'',
					cpjs:'',
					introduction:''
				},
				rightForm:{
					isxs:'',
					investment_type:'',
					license_number:'',
					tjpro:'',
					jlpro:'',
					fzmodel:'',
					address:'',
					start_lump_sum:'',
					income:'',
					breath_day:'',
					campaign_slogan:'',
					jstime:'',
					webActive_link:'',
					repayment:'',
					btcolor:'',
					zibz:'',
					prolct:'',
					type_introduction:'',
					features:''
				},
				rules:{
					name: [
			            { required: true, message: '请输入产品名称', trigger: 'blur' }
			        ],
			        enterprise: [
			        	{ required: true, message: '请输入企业名称', trigger: 'blur' },
			            { min: 8,  message: '发起企业名称长度要大于8位', trigger: 'blur' }
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
			        jstime: [
			            { required: true, message: '请选择项目结束时间', trigger: 'blur' }
			        ]
				},
				optionsL: [{
		          value: '1',
		          label: '到期还本付息'
		        }],
		        optionsRT: [{
		          value: '1',
		          label: '货押宝'
		        },{
		          value: '2',
		          label: '车无忧'
		        }],
		        optionsRB: [{
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
			releaseBtn(){
				const _this = this;
				// console.log(_this.ruleForm)
				// console.log(_this.rightForm)
				// $.ajax({
    //                 type:'GET',	
    //                 dataType:'jsonp',
    //                 url:baseUrl+"type=home",
    //                 // contentType:'application/json;charset=utf-8',
    //                 jsonp : 'jsonpCallback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
    //             	jsonpCallback: 'jsonp', //设置回调函数名
    //                 success:function(response, status, xhr){
    //                 	// console.log('状态为：' + status + ',状态是：' + xhr.statusText);
    //                     console.log(response)
    //                     // _this.list = response.data
    //                     _this.ebu = response.data.Value
    //                     _this.rmb = response.data.Money
    //                 }
    //             });

      //           $.ajax({
      //               type:'POST',
      //               dataType:'json',
      //               url:url,
      //               data:data,
      //               contentType:'application/json;charset=utf-8',
      //               error: function (XMLHttpRequest, textStatus, errorThrown) {},
      //               success:function(data){
      //                   if(!data.success){
      //                       alert(data.msg)
						// }else{
      //                       _this.addbannerdiv = false;
      //                       _this.getlist();
						// }
      //               }
      //           });
			},
			//图片上传
		      upload (event) {
		          this.formData = new FormData()
		          let file = event.target.files[0]
		          const self = this
		          if (file) {
		              this.fileImg = file.name
		              this.formData.append('file', file);
		          } else {
		              this.fileImg = ''
		              this.formData = new FormData()
		          }
		      },
		},
		mounted() {

		}
	}
</script>

<style>

</style>