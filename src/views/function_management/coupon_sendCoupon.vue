<template>
	<section>
		<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="margin:20px auto;margin-left: 18%;color: #20a0ff;font-size: 16px;">新增理财券</el-col>
		<el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
				<el-form label-width="150px" >
					<el-col :offset="5" style="margin-bottom: 10px;color: red;">群发用英文  ‘,’ 分开</el-col>
					<el-form-item label="用户名：">
						<el-input v-model="phone" style="width: 260px;" @change="realName"  type="textarea"></el-input> 
					</el-form-item>
					<el-col :offset="5" style="margin-bottom: 10px;color: red;" v-show="showname">{{realname}}</el-col>
					<el-col :offset="5" style="margin-bottom: 10px;color: red;" v-show="showuser">{{realname}}</el-col>
                    <el-form-item label="类型：">
                        <el-select v-model="type" placeholder="请选择" @change="typeShow">
	                        <el-option
	                          v-for="item in options"
	                          :key="item.value"
	                          :label="item.label"
	                          :value="item.value">
	                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="利率：" v-if="showrate">
                        <el-input v-model="rate" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
					<el-form-item label="发放金额：" v-else>
						<el-input v-model="money" style="width: 260px;" type="text"></el-input> 
					</el-form-item>
					<el-form-item label="有效天数：">
                        <el-input v-model="validDay" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
                    <el-form-item label="满多少可用：">
                        <el-input v-model="investAtleastMoney" style="width: 260px;" type="text"></el-input> 
                    </el-form-item>
					<el-form-item label="可用产品：">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
					    	<el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.label}}</el-checkbox>
					  	</el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="使用范围名称：">
                        <el-input v-model="useRangeName" style="width: 260px;" type="text"></el-input> <el-col style="margin-bottom: 10px;color: red;">如：适用于常规标</el-col>
                    </el-form-item>
                    <!-- <el-col :offset="5" style="margin-bottom: 10px;color: red;">如：适用于常规表</el-col> -->
                    <el-form-item label="来源(备注)：">
                        <el-input v-model="remark" style="width: 300px;" type="textarea"></el-input> 
                    </el-form-item>
				<el-col :span='24' style="margin-left:250px;">
					<el-button type="primary" @click.native="submitUpload" :loading="editLoading">发放红包</el-button>
				</el-col>
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
				realname:'',
                token:'',
                phone:'',
                useRange:'',
                validDay:'',
                type:'10',
                investAtleastMoney:'',
                rate:'',
                money:'',
                useTime:'',
                actActivityId:'',
                useRangeName:'',
                actActivityType:'',
                remark:'',
                checkedCities:[],
                checkAll: true,
		        checkedCities: [],
		        showrate:false,
		        cities: [
		        	{
		        		id:10,
		        		label:'周标'
		        	},
		        	{
		        		id:11,
		        		label:'新手标'
		        	},
		        	{
		        		id:20,
		        		label:'月标'
		        	},
		        	{
		        		id:30,
		        		label:'双月标'
		        	},
		        	{
		        		id:25,
		        		label:'半季标'
		        	},
		        	{
		        		id:40,
		        		label:'单季标'
		        	},
		        	{
		        		id:50,
		        		label:'双季标'
		        	}
		        ],
		        // cities: ['周标', '新手标', '月标', '双月标', '半季标', '单季标', '双季标'],
		        isIndeterminate: true,
				options: [{
		          value: '10',
		          label: '常规理财券'
		        },{
		          value: '11',
		          label: '新手理财券'
		        },{
                  value: '20',
                  label: '常规红包'
                },{
                  value: '21',
                  label: '新手红包'
                },{
                  value: '30',
                  label: '加息券'
                }],
                newOption: [{
                  value: '0',
                  label: '否'
                },{
                  value: '1',
                  label: '是'
                }],
				editLoading: false,
				showname:false,
				showuser:false
			}
		},
        computed: {

        },
		methods: {
			realName(){
				const _this = this
				if(_this.phone.length === 11){
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/pay/payrechargerecord/realNameByUsername?token='+_this.token +'&username='+_this.phone,
	                    data:"",
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                    	if(data.code === 200 && data.data !== null && data.data !== ''){
		                    	_this.realname = data.message
		                    	if(_this.realname === '' || _this.realname === undefined){
									_this.showname = false
								}else{
									_this.showname = true
								}
	                    	}else{
	                    		_this.realname = data.message
	                            _this.showuser = true
	                    		_this.showname = false
	                    	}
	                    }
	                });
				}else{
					_this.showuser = false
	                _this.showname = false
				}
			},
			typeShow(){
				if(this.type === '30'){
					this.showrate = true
				}else{
					this.showrate = false
				}
			},
			handleCheckAllChange(event) {
				// console.log(event) 
		        this.checkedCities = event.target.checked ? [10,11,20,25,30,40,50] : [];
		        this.isIndeterminate = false;
		    },
			handleCheckedCitiesChange(value){
                // console.log(value)
                // console.log(this.checkedCities)
            },
            //添加
            submitUpload(){
            	// console.log(this.checkedCities)
                const _this = this
                let url = baseUrl+'/wel/welcoupon/saveWelCoupon?token='+_this.token+'&phone='+_this.phone+'&validDay='+_this.validDay+'&type='+_this.type+'&investAtleastMoney='+_this.investAtleastMoney+'&rate='+_this.rate+'&money='+_this.money+'&useRange='+this.checkedCities+'&remark='+this.remark+'&useRangeName='+_this.useRangeName
                if(this.showrate === false){
                	url = baseUrl+'/wel/welcoupon/saveWelCoupon?token='+_this.token+'&phone='+_this.phone+'&validDay='+_this.validDay+'&type='+_this.type+'&investAtleastMoney='+_this.investAtleastMoney+'&money='+_this.money+'&useRange='+this.checkedCities+'&rate=0'+'&remark='+this.remark+'&useRangeName='+_this.useRangeName
                }else{
                	url = baseUrl+'/wel/welcoupon/saveWelCoupon?token='+_this.token+'&phone='+_this.phone+'&validDay='+_this.validDay+'&type='+_this.type+'&investAtleastMoney='+_this.investAtleastMoney+'&rate='+_this.rate+'&useRange='+this.checkedCities+'&money=0'+'&remark='+this.remark+'&useRangeName='+_this.useRangeName
                }
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    // data:data,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.$message({
                              message: data.message,
                              type: 'success',
                              duration:1000
                            });
                            // for (var i = 0; i < state.tagArry.length; i++) {
                            //     if(state.tagArry[i].path === '版本展示'){
                            //         state.id = i
                            //         break;
                            //     }
                            // }
                            // _this.$router.push({ path: '/version_versionShow' });
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
		}
	}
</script>

<style>

</style>