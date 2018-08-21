<template>
<section>
	<el-row :gutter="10" style="font-size: 16px;">
	   <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:15px auto;">
	   		平台数据
	   </el-col>
	   <el-col :offset="1" :xs="7" :sm="7" :md="3" :lg="3" :xl="3">
			<el-col class="topH"  :span="24">
				<!-- <router-link :to="{ name: '注册用户信息'}"> -->
					<!-- <el-button  type="primary">返回添加管理员</el-button> -->
					<el-col :span="24" class="tenH">平台注册人数</el-col>
					<el-col :span="24" class="tenH">{{registCount}}</el-col>
				<!-- </router-link> -->
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">今天剩余返款人数</el-col>
				<el-col :span="24" class="tenH">{{todayRefundUserCount}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">明天返款人数</el-col>
				<el-col :span="24" class="tenH">{{twodayRefundUserCount}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">平台发布总额(元)</el-col>
				<el-col :span="24" class="tenH">{{pushMoneyAll}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">平台融资总额(元)</el-col>
				<el-col :span="24" class="tenH">{{investMoneyAll}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24" style="border-right: none;">
				<el-col :span="24" class="tenH">平台发放收益总额(元)</el-col>
				<el-col :span="24" class="tenH">{{totalInterest}}</el-col>
			</el-col>
	   </el-col>
	</el-row>
	<el-row :gutter="10" style="font-size: 16px;">
	   <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:15px auto;">
	   		投资数据
	   </el-col>
	   <el-col :offset="1" :xs="7" :sm="7" :md="3" :lg="3" :xl="3">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">待结算本金(元)</el-col>
				<el-col :span="24" class="tenH">{{userInvestMoneyNoReturn}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">待结算利息(元)</el-col>
				<el-col :span="24" class="tenH">{{userTotalInterestNoReturn}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">用户投资3日内到期本金(元)</el-col>
				<el-col :span="24" class="tenH">{{userInvestMoneyThreeReturn}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">用户投资3日内到期利息(元)</el-col>
				<el-col :span="24" class="tenH">{{userTotalInterestThreeReturn}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24">
				<el-col :span="24" class="tenH">已到期未结算本金(元)</el-col>
				<el-col :span="24" class="tenH">{{userNoReturnInvestMoney}}</el-col>
			</el-col>
	   </el-col>
	   <el-col :xs="7" :sm="7" :md="4" :lg="4" :xl="4">
			<el-col class="topH"  :span="24" style="border-right: none;">
				<el-col :span="24" class="tenH">已到期未结算利息(元)</el-col>
				<el-col :span="24" class="tenH">{{userNoReturnTotalInterest}}</el-col>
			</el-col>
	   </el-col>
	</el-row>
	<el-row :gutter="10" style="font-size: 16px;">
	   <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11" style="border: 1px solid #ddd;margin-top: 40px;border-radius: 5px;box-shadow: 2px 2px 2px #aaa;">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin: 15px auto;">
					用户余额信息
	  			</el-col>
	  			<el-col :offset="2" :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="margin-bottom:15px;">
	  				<el-col :span="24" class="tenH" style="text-align: center;">用户余额总额(元)</el-col>
					<el-col :span="24" class="tenH"  style="text-align: center;">{{userAllLeftMoney}}</el-col>
	  			</el-col>
	  		</el-col>
	  		<el-col :offset="1" :xs="11" :sm="11" :md="11" :lg="11" :xl="11" style="border: 1px solid #ddd;margin-top: 40px;border-radius: 5px;box-shadow: 2px 2px 2px #aaa;">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin: 15px auto;">
					理财券信息
	  			</el-col>
	  			<el-col :offset="2" :xs="7" :sm="7" :md="7" :lg="7" :xl="7" style="margin-bottom:15px;">
					<el-col :span="24" class="tenH" style="text-align: center;">赠送理财券总额(元)</el-col>
					<el-col :span="24" class="tenH" style="text-align: center;">{{couponTotalMoney}}</el-col>
	  			</el-col>
	  			<el-col :xs="7" :sm="8" :md="8" :lg="8" :xl="8" style="margin-bottom:15px;">
					<el-col :span="24" class="tenH" style="text-align: center;">有效使用理财券总额(元)</el-col>
					<el-col :span="24" class="tenH" style="text-align: center;">{{investCouponMoney}}</el-col>
	  			</el-col>
	  			<!-- <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" style="margin-bottom:15px;">
					<el-col :span="24" class="tenH">新手理财券(元)</el-col>
					<el-col :span="24" class="tenH">{{registCount}}</el-col>
	  			</el-col> -->
	  		</el-col>
	  	</el-col>
	</el-row>
	<el-row :gutter="10" style="font-size: 16px;margin-top:30px;">
	   	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:15px auto;">
	   		最近30天投资量统计
	  	</el-col>
	  	<el-col  :span="24">
	  		<div id="investChart" class="fullChart"></div>
		</el-col>
	</el-row>
	<el-row :gutter="10" style="font-size: 16px;margin-top:30px;">
	   	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:15px auto;">
	   		当日渠道投资汇总
	  	</el-col>
	  	<el-col  :span="24">
	  		<div id="qudaoChart" class="fullChart"></div>
		</el-col>
	</el-row>
	<el-row :gutter="10" style="font-size: 16px;margin-top:30px;">
	   	<el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" style="margin:15px auto;">
	   		最近15天首投金额统计
	  	</el-col>
	  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin:15px auto;"><!-- 留白 --></el-col>
	  	<el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" style="margin:15px auto;">
	   		最近15天复投金额统计
	  	</el-col>
	  	<el-col  :span="12">
	  		<div id="fristInvChart" class="halfChart"></div>
		</el-col>
		<el-col  :span="12">
	  		<div id="reInvChart" class="halfChart"></div>
		</el-col>
	</el-row>
	<el-row :gutter="10" style="font-size: 16px;margin-top:30px;">
	   	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:15px auto;">
	   		最近15天充值提现统计
	  	</el-col>
	  	<el-col  :span="24">
	  		<div id="balanceChart" class="fullChart"></div>
		</el-col>
	</el-row>
	<el-row :gutter="10" style="font-size: 16px;margin-top:30px;">
	   	<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:15px auto;">
	   		未来15天预计还款统计
	  	</el-col>
	  	<el-col  :span="24">
	  		<div id="repaymentChart" class="fullChart"></div>
		</el-col>
	</el-row>
</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';
	import echarts from 'echarts'

	export default {
		data() {
			return {
				dlsList:[],
				name:'',
				phone:'',
				favorableRate:'',
				goodsScore:'',
				sellerScore:'',
				logisticsScore:'',
				token:'',
				registCount:'',
				todayRefundUserCount:'',
				twodayRefundUserCount:'',
				coinEarning:'',
				totalMoney:'',
				couponTotalMoney:'',
				investCouponMoney:'',
				pushMoneyAll:'',
				investMoneyAll:'',
				totalInterest:'',
				coinInterestMoney:'',
				userAllLeftMoney:'',//用户余额总额
				userInvestMoneyNoReturn:'',//用户投资的待结算的本金
				userTotalInterestNoReturn:'',//用户投资的待结算的利息
				userInvestMoneyThreeReturn:'',//用户投资3日内到期的本金
				userTotalInterestThreeReturn:'',//用户投资3日内到期的利息
				userNoReturnInvestMoney:'',//已到期未结算的本金
				userNoReturnTotalInterest:'',//已到期未结算的利息

				//图表统计数据
				investMoney:[],//最近30天投资量-金额
				investNum:[],//最近30天投资量-人数
				investDate:[],//最近30天投资量-日期

				firstInvestMoney:[],//最近15天首投-金额
				firstInvestDate:[],//最近15天首投-日期

				reInvestMoney:[],//最近15天复投-金额
				reInvestDate:[],//最近15天复投-日期

				rechargeMoney:[],//最近15天充值-金额
				withdrawMoney:[],//最近15天提现-金额
				balanceDate:[],//最近15天资金比对-日期

				repaymentCost:[],//未来15天还款预测-成本
				repaymentInterest:[],//未来15天还款预测-利息
				repaymentDate:[],//未来15天还款预测-日期

				todayOpchannelCount:[],//当日投资统计数量数组
				todayOpchannelMoney:[],//当日投资统计金额汇总数组
				todayOpchannelItems:[]//当日投资统计渠道数组
			}
		},
		methods: {
			// logi() {
   //              const _this = this
   //              const params = {
   //              	username:'admin',
   //              	password:'admin'
   //              }
   //              $.ajax({
   //                  type:'POST',
   //                  dataType:'json',
   //                  url:baseUrl+'/admin/sys/login',
   //                  data:JSON.stringify(params),
   //                  contentType:'application/json;charset=utf-8',
   //                  error: function (XMLHttpRequest, textStatus, errorThrown) {},
   //                  success:function(data){
   //                      console.log(data)
   //                  }
   //              });
   //          },
			getlist(){
				const _this = this
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/op/opChannel/getPageData?token='+_this.token,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        // console.log(data)
                        if(data.code === 200){
                            _this.coinEarning = data.data.coinEarning
                            _this.couponTotalMoney = data.data.couponTotalMoney
                            _this.investCouponMoney = data.data.investCouponMoney
                            _this.investMoneyAll = data.data.investMoneyAll
                            _this.pushMoneyAll = data.data.pushMoneyAll
                            _this.registCount = data.data.registCount
                            _this.todayRefundUserCount = data.data.todayRefundUserCount
                            _this.totalInterest = data.data.totalInterest
                            _this.totalMoney = data.data.totalMoney
                            _this.twodayRefundUserCount = data.data.twodayRefundUserCount
                            _this.coinInterestMoney = data.data.coinInterestMoney

                            _this.userAllLeftMoney  = data.data.userAllLeftMoney 
                            _this.userInvestMoneyNoReturn  = data.data.userInvestMoneyNoReturn 
                            _this.userTotalInterestNoReturn  = data.data.userTotalInterestNoReturn 
                            _this.userInvestMoneyThreeReturn  = data.data.userInvestMoneyThreeReturn 
                            _this.userTotalInterestThreeReturn  = data.data.userTotalInterestThreeReturn 
                            _this.userNoReturnInvestMoney  = data.data.userNoReturnInvestMoney 
                            _this.userNoReturnTotalInterest  = data.data.userNoReturnTotalInterest                      

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
			getcommit(){
				const _this = this
				let url = ''
				if(state.commissionLine === 2){
					url = baseUrl + '/api/shopMember/selectListByRole'
				}else{
					url = baseUrl + '/api/shopConfig/selectListBySeller'
				}
				const params = {
					pageNum:1,
					size:10,
					storeId:state.storeId
				}
				$.ajax({
		              type:'POST',
		              dataType:'json',
		              url:url,
		              data:JSON.stringify(params),
		              contentType:'application/json;charset=utf-8',
		              success:function(data){
		                // console.log(data)
		                if(data.data.list !== null){
		                	_this.dlsList = data.data.list
		                	// console.log(_this.dlsList)
		                }
		              }
		          });
			},

			getChart(){
				const _this = this;

				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/op/opChannel/indexChartStatistics?token='+_this.token,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        //console.log(data)
                        if(data.code === 200){
                        	_this.investMoney = data.data.last30DaysInvestMoney;
							_this.investNum = data.data.last30DaysInvestNum;
							_this.investDate = data.data.last30DaysInvestDate;
							_this.drawInvestChart(_this.investMoney,_this.investNum,_this.investDate);

							_this.firstInvestMoney = data.data.firstInvestMoney;
							_this.firstInvestDate = data.data.firstInvestDate;
							_this.drawFirstInvestChart(_this.firstInvestMoney,_this.firstInvestDate);

							_this.reInvestMoney = data.data.afterInvestMoney;
							_this.reInvestDate = data.data.afterInvestDate;
							_this.drawReInvestChart(_this.reInvestMoney,_this.reInvestDate);


							_this.rechargeMoney = data.data.rechargeMoney;
							_this.withdrawMoney = data.data.withdrawMoney;
							_this.balanceDate = data.data.rechargAndWithDrawDate;
							_this.drawBalanceChart(_this.rechargeMoney,_this.withdrawMoney,_this.balanceDate);

							_this.repaymentCost = data.data.returnMoney;
							_this.repaymentInterest = data.data.returnInterest;
							_this.repaymentDate = data.data.returnDate;
							_this.drawRepaymentChart(_this.repaymentCost,_this.repaymentInterest,_this.repaymentDate);

							_this.todayOpchannelCount = data.data.todayOpchannelCount;
							_this.todayOpchannelMoney = data.data.todayOpchannelMoney;
							const arry = []
							for (var i = 0; i < data.data.todayOpchannelItems.length; i++) {
								if(data.data.todayOpchannelItems[i] === '0'){
									arry.push('android')
								}else if(data.data.todayOpchannelItems[i] === '1'){
									arry.push('ios')
								}else if(data.data.todayOpchannelItems[i] === '2'){
									arry.push('pc')
								}else if(data.data.todayOpchannelItems[i] === '3'){
									arry.push('wap')
								}
							}
							_this.todayOpchannelItems = arry
							_this.drawqudaoChart(_this.todayOpchannelMoney,_this.todayOpchannelCount,_this.todayOpchannelItems)
                            
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

                /*以下为固定测试内容*/
				/*_this.investMoney = [2010,5000,3220,2580,3220,1810,1000,650,8700,1020,350,680,5880,3010,2050,1020,3220,2010,1580,2000,580,380,650,1180,2010,5620,3010,5600,3285,1620];
				_this.investNum = [201,500,322,258,322,181,100,65,87,102,35,68,588,301,205,102,322,201,158,200,58,38,65,118,201,262,301,560,328,162];
				_this.investDate = ['03-01','03-02','03-03','03-04','03-05','03-06','03-07','03-08','03-09','03-10','03-11','03-12','03-13','03-14','03-15','03-16','03-17','03-18','03-19','03-20','03-21','03-22','03-23','03-24','03-25','03-26','03-27','03-28','03-29','03-30'];
				_this.drawInvestChart(_this.investMoney,_this.investNum,_this.investDate);

				_this.firstInvestMoney = [201,500,322,258,322,181,100,65,87,102,35,68,588,301,205];
				_this.firstInvestDate = ['03-16','03-17','03-18','03-19','03-20','03-21','03-22','03-23','03-24','03-25','03-26','03-27','03-28','03-29','03-30'];
				_this.drawFirstInvestChart(_this.firstInvestMoney,_this.firstInvestDate);

				_this.reInvestMoney = [201,500,322,258,322,181,100,65,87,102,35,68,588,301,205];
				_this.reInvestDate = ['03-16','03-17','03-18','03-19','03-20','03-21','03-22','03-23','03-24','03-25','03-26','03-27','03-28','03-29','03-30'];
				_this.drawReInvestChart(_this.reInvestMoney,_this.reInvestDate);


				_this.rechargeMoney = [20100,50000,32200,25800,32200,18100,10000,6500,8700,10200,3500,6800,58800,30100,20500];
				_this.withdrawMoney = [18300,56000,48500,32800,36000,13000,43600,3300,13000,22000,6800,12000,53000,40000,28000];
				_this.balanceDate = ['03-16','03-17','03-18','03-19','03-20','03-21','03-22','03-23','03-24','03-25','03-26','03-27','03-28','03-29','03-30'];
				_this.drawBalanceChart(_this.rechargeMoney,_this.withdrawMoney,_this.balanceDate);

				_this.repaymentCost = [20100,50000,32200,25800,32200,18100,10000,6500,8700,10200,3500,6800,58800,30100,20500];
				_this.repaymentInterest = [188,203,356,320,180,256,389,258,326,158,432,201,360,358,278]
				_this.repaymentDate = ['03-31','04-01','04-02','04-03','04-04','04-05','04-06','04-07','04-08','04-09','04-10','04-11','04-12','04-13','04-14'];
				_this.drawRepaymentChart(_this.repaymentCost,_this.repaymentInterest,_this.repaymentDate);*/

			},

			//绘制最近30天投资统计表
			drawInvestChart(investMoney,investNum,investDate){
				const _this = this;
				let myChart = echarts.init(document.getElementById('investChart'));
				let colors = ['#19BE6B', '#5793f3'];
				let option = {
				    color: colors,
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross'
				        }
				    },
				    grid: {
				        right: '12%'
				    },
				    toolbox: {
				        feature: {
				            dataView: {show: true, readOnly: false},
				            saveAsImage: {show: true},
				            dataView:{  //重写数据图表样式
			                    show: true,  
			                    readOnly:false,  
			                    optionToContent: function(opt) {  
			                        let dataview = opt.toolbox[0].feature.dataView;  //获取dataview  
			                        let table = _this.getTable(opt,0);  
			                        return table;  
			                    }  
			                },  
				        }
				    },
				    legend: {
				        data:['投资金额','投资人数']
				    },
				    xAxis: [
				        {
				            type: 'category',
				            axisTick: {
				                alignWithLabel: true
				            },
				            data: investDate
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            name: '投资金额',
				            position: 'left',
				            axisLine: {
				                lineStyle: {
				                    color: colors[0]
				                }
				            },
				            axisLabel: {
				                formatter: '{value} (元)'
				            }
				        },
				        {
				            type: 'value',
				            name: '投资人数',
				            position: 'right',
				            offset: 80,
				            axisLine: {
				                lineStyle: {
				                    color: colors[1]
				                }
				            },
				            axisLabel: {
				                formatter: '{value} (人)'
				            }
				        }
				    ],
				    series: [
				        {
				            name:'投资金额',
				            type:'bar',
				            barWidth : 30,
				            data:investMoney
				        },
				        {
				            name:'投资人数',
				            type:'line',
				            yAxisIndex: 1,
				            data:investNum
				        }
				    ]
				};
				myChart.setOption(option);
			},
			//绘制当日渠道投资汇总
			drawqudaoChart(repaymentCost,repaymentInterest,repaymentDate){
				const _this = this;
				let myChart = echarts.init(document.getElementById('qudaoChart'));
				let colors = ['#D14A61', '#C9856B','#188DF0'];
				let option = {
				    color: colors,
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross'
				        },
				  //       formatter : function(params) {
						//     let result = '';
						//     result += '<span class="markPoint" style="background-color:' + colors[0] + '"></span>';
					 //        result += "预计还款本金："+params[0].data;
					 //        result += '<br/>';
					 //        result += '<span class="markPoint" style="background-color:' + colors[1] + '"></span>';
					 //        result += "预计还款利息："+params[1].data;
					 //        result += '<br/>';
					 //        result += '<span class="markPoint" style="background-color:' + colors[2] + '"></span>';
					 //        result += "预计还款总计："+(parseFloat(params[0].data)+parseFloat(params[1].data));
					 //        result += '<br/>';
					 //    	return result;
						// }
				    },
				    grid: {
				        right: '12%'
				    },
				    toolbox: {
				        feature: {
				            dataView: {show: true, readOnly: false},
				            saveAsImage: {show: true},
				            dataView:{  //重写数据图表样式
			                    show: true,  
			                    readOnly:false,  
			                    optionToContent: function(opt) {  
			                        let dataview = opt.toolbox[0].feature.dataView;  //获取dataview  
			                        let table = _this.getTable(opt,1);  
			                        return table;  
			                    }  
			                },  
				        }
				    },
				    legend: {
				        data:['当日投资统计金额','当日投资统计数量']
				    },
				    xAxis: [
				        {
				            type: 'category',
				            axisTick: {
				                alignWithLabel: true
				            },
				            data: repaymentDate
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            name: '当日投资统计金额',
				            position: 'left',
				            axisLine: {
				                lineStyle: {
				                    color: colors[0]
				                }
				            },
				            axisLabel: {
				                formatter: '{value}(元)'
				            }
				        },
				        {
				            type: 'value',
				            name: '当日投资统计数量',
				            position: 'right',
				            offset: 80,
				            axisLine: {
				                lineStyle: {
				                    color: colors[1]
				                }
				            },
				            axisLabel: {
				                formatter: '{value}'
				            }
				        }
				    ],
				    series: [
				        {
				            name:'当日投资统计金额',
				            type:'bar',
				            barWidth : 30,
				            data:repaymentCost
				        },
				        {
				            name:'当日投资统计数量',
				            type:'line',
				            yAxisIndex: 1,
				            data:repaymentInterest
				        }
				    ]
				};
				myChart.setOption(option);
			},

			//绘制最近15天首投统计表
			drawFirstInvestChart(firstInvestMoney,firstInvestDate){
				const _this = this;
				let myChart = echarts.init(document.getElementById('fristInvChart'));
				let colors = '#5793f3';
				let option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross'
				        }
				    },
				    grid: {
				    	orient: 'horizontal', 
				    	width:'80%',
						x: 'right',
				    },
				    toolbox: {
				        feature: {
				            dataView: {show: true, readOnly: false},
				            saveAsImage: {show: true},
				            dataView:{  //重写数据图表样式
			                    show: true,  
			                    readOnly:false,  
			                    optionToContent: function(opt) {  
			                        let dataview = opt.toolbox[0].feature.dataView;  //获取dataview  
			                        let table = _this.getTable(opt,0);  
			                        return table;  
			                    }  
			                },  
				        }
				    },
				    xAxis: {
				        type: 'category',
				        data: firstInvestDate
				    },
				    yAxis: {
				        type: 'value',
			            axisLabel: {
			                formatter: '{value} (元)'
			            },
			            axisLine: {
			                lineStyle: {
			                    color: colors
			                }
			            },
				    },
				    series: [{
				    	name: '投资金额',
				        data: firstInvestMoney,
				        type: 'bar',
				        barWidth : 20,
				        lineStyle:{
                           normal: {
                               color: colors
                           }
                       },
                       itemStyle: {
                           normal: {
                               color: colors
                           }
                       },
				    }]
				};
				myChart.setOption(option);
			},

			//绘制最近15天复投统计表
			drawReInvestChart(reInvestMoney,reInvestDate){
				const _this = this;
				let myChart = echarts.init(document.getElementById('reInvChart'));
				let colors = '#5793f3';
				let option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross'
				        }
				    },
				    grid: {
				    	orient: 'horizontal', 
				    	width:'80%',
						x: 'right',
				    },
				    toolbox: {
				        feature: {
				            dataView: {show: true, readOnly: false},
				            saveAsImage: {show: true},
				            dataView:{  //重写数据图表样式
			                    show: true,  
			                    readOnly:false,  
			                    optionToContent: function(opt) {  
			                        let dataview = opt.toolbox[0].feature.dataView;  //获取dataview  
			                        let table = _this.getTable(opt,0);  
			                        return table;  
			                    }  
			                },  
				        }
				    },
				    xAxis: {
				        type: 'category',
				        data: reInvestDate
				    },
				    yAxis: {
				        type: 'value',
			            axisLabel: {
			                formatter: '{value} (元)'
			            },
			            axisLine: {
			                lineStyle: {
			                    color: colors
			                }
			            },
				    },
				    series: [{
				    	name: '投资金额',
				        data: reInvestMoney,
				        type: 'bar',
				        barWidth : 20,
				        lineStyle:{
                           normal: {
                               color: colors
                           }
                       },
                       itemStyle: {
                           normal: {
                               color: colors
                           }
                       }
				    }]
				};
				myChart.setOption(option);
			},

			//绘制最近15天充值提现统计表
			drawBalanceChart(rechargeMoney,withdrawMoney,balanceDate){
				const _this = this;
				let myChart = echarts.init(document.getElementById('balanceChart'));
				let colors = ['#188df0', '#d14a61'];
				let option = {
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['充值金额','提现金额']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            saveAsImage : {show: true},
				            dataView:{  //重写数据图表样式
			                    show: true,  
			                    readOnly:false,  
			                    optionToContent: function(opt) {  
			                        let dataview = opt.toolbox[0].feature.dataView;  //获取dataview  
			                        let table = _this.getTable(opt,0);  
			                        return table;  
			                    }  
			                },  
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : balanceDate
				        }
				    ],
				    yAxis : {
				    	type: 'value',
			            axisLabel: {
			                formatter: '{value} (元)'
			            },
				    },
				    series : [
				        {
				            name:'充值金额',
				            type:'bar',
				            barWidth : 30,
				            data: rechargeMoney,
				            lineStyle:{
	                           normal: {
	                               color: colors[0]
	                           }
	                       	},
	                       	itemStyle: {
	                           normal: {
	                               color: colors[0]
	                           }
	                       },
				            /*markPoint : {
				                data : [
				                    {type : 'max', name: '最大值'},
				                    {type : 'min', name: '最小值'}
				                ]
				            },*/
				            markLine : {
				                data : [
				                    {type : 'average', name: '平均值'}
				                ]
				            }
				        },
				        {
				            name:'提现金额',
				            type:'bar',
				            barWidth : 30,
				            data: withdrawMoney,
				            lineStyle:{
	                           normal: {
	                               color: colors[1]
	                           }
	                       	},
	                       	itemStyle: {
	                           normal: {
	                               color: colors[1]
	                           }
	                       },
				            /*markPoint : {
				                data : [
				                    {type : 'max', name: '最大值'},
				                    {type : 'min', name: '最小值'}
				                ]
				            },*/
				            markLine : {
				                data : [
				                    {type : 'average', name : '平均值'}
				                ]
				            }
				        }
				    ]
				};
				myChart.setOption(option);
			},

			//绘制未来15天预计还款统计表
			drawRepaymentChart(repaymentCost,repaymentInterest,repaymentDate){
				const _this = this;
				let myChart = echarts.init(document.getElementById('repaymentChart'));
				let colors = ['#D14A61', '#C9856B','#188DF0'];
				let option = {
				    color: colors,
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross'
				        },
				        formatter : function(params) {
						    let result = '';
						    result += '<span class="markPoint" style="background-color:' + colors[0] + '"></span>';
					        result += "预计还款本金："+params[0].data;
					        result += '<br/>';
					        result += '<span class="markPoint" style="background-color:' + colors[1] + '"></span>';
					        result += "预计还款利息："+params[1].data;
					        result += '<br/>';
					        result += '<span class="markPoint" style="background-color:' + colors[2] + '"></span>';
					        result += "预计还款总计："+(parseFloat(params[0].data)+parseFloat(params[1].data));
					        result += '<br/>';
					    	return result;
						}
				    },
				    grid: {
				        right: '12%'
				    },
				    toolbox: {
				        feature: {
				            dataView: {show: true, readOnly: false},
				            saveAsImage: {show: true},
				            dataView:{  //重写数据图表样式
			                    show: true,  
			                    readOnly:false,  
			                    optionToContent: function(opt) {  
			                        let dataview = opt.toolbox[0].feature.dataView;  //获取dataview  
			                        let table = _this.getTable(opt,1);  
			                        return table;  
			                    }  
			                },  
				        }
				    },
				    legend: {
				        data:['预计还款本金','预计还款利息']
				    },
				    xAxis: [
				        {
				            type: 'category',
				            axisTick: {
				                alignWithLabel: true
				            },
				            data: repaymentDate
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            name: '预计还款本金',
				            position: 'left',
				            axisLine: {
				                lineStyle: {
				                    color: colors[0]
				                }
				            },
				            axisLabel: {
				                formatter: '{value} (元)'
				            }
				        },
				        {
				            type: 'value',
				            name: '预计还款利息',
				            position: 'right',
				            offset: 80,
				            axisLine: {
				                lineStyle: {
				                    color: colors[1]
				                }
				            },
				            axisLabel: {
				                formatter: '{value} (元)'
				            }
				        }
				    ],
				    series: [
				        {
				            name:'预计还款本金',
				            type:'bar',
				            barWidth : 30,
				            data:repaymentCost
				        },
				        {
				            name:'预计还款利息',
				            type:'line',
				            yAxisIndex: 1,
				            data:repaymentInterest
				        }
				    ]
				};
				myChart.setOption(option);
			},

			//重写图表中的数据视图_增加合计栏
			//mark=1标记"15天预计还款统计"表，需要增加每行的合计数额
			getTable(opt,mark){  
				let axisData = opt.xAxis[0].data;//获取图形的data数组
				let series = opt.series;//获取series
				let num = 0;//记录序号  
        		let sum = new Array();//获取合计数组（根据对应的系数生成相应数量的sum）
				//console.log(axisData);
				//console.log(series);
				for(let i=0; i<series.length; i++){  
		            sum[i] = 0;  
		        } 
				let table = '<table class="dataTable"><thead><tr>'; 
				table += '<th>序号</th>' 
				table += '<th>日期</th>' 
				for(let i=0; i<series.length;i++){  
		            table += '<th>'+series[i].name+'</th>'  
		        }
		        if(mark == 1){
					table += '<th>预计还款总计</th>'
		        }
		        table += '</tr></thead><tbody>';
		        for (let i = 0, l = axisData.length; i < l; i++) {  
		        	num += 1; 
		            for(let n=0;n<series.length;n++){  
		                if(series[n].data[i]){  
		                    sum[n] += Number(series[n].data[i]);  
		                }else{  
		                    sum[n] += Number(0);  
		                }  
		  
		            }  
		            table += '<tr>' 
		            	+ '<td>' + num + '</td>'  
		                + '<td>' + axisData[i] + '</td>';  
		            for(let j=0; j<series.length;j++){  
		                if(series[j].data[i]){  
		                    table += '<td>' + series[j].data[i] + '</td>';  
		                }else{  
		                    table += '<td>' + 0 + '</td>';  
		                }  
		            }  
		            if(mark == 1){
	                	table += '<td>' + (series[0].data[i]+series[1].data[i]) + '</td>';
	                }
            		table += '</tr>';  
        		}
        		//最后一行加上合计  
		        table += '<tr><td></td><td>合计</td>';  
		        for(let n=0;n<series.length;n++){  
		            table += '<td>' + Number(sum[n])  + '</td>';     
		        }  
		        if(mark == 1){
                	table += '<td>' + (sum[0]+sum[1]) + '</td>';
                }
		        table += '</tr></tbody></table>';  
		        
		        return table;  
		    }  

		},		
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
			this.getlist();
			this.getChart();
		}
	}

</script>

<style>
	.topH{
		height: 60px;
		border-right: 1px solid #aaa;
		text-align: center;
    	color: #888;
	}
	.topL{
		height: 60px;
		text-align: center;
    	color: #888;
	}
	.tenH{
		margin-top: 5px;
		color: #aaa;
	}

	.fullChart{
		width:100%;
		height: 500px;
	}
	.halfChart{
		width:90%;
		height: 300px;
	}
	.markPoint{
		display:inline-block;
		margin-right:5px;
		border-radius:10px;
		width:9px;
		height:9px;
	}

	/*重新图表的数据视图样式*/
	.dataTable{
		cellspacing:0 ;  
        border-spacing: 0; 
        border-collapse:collapse;
        empty-cells:show;
		border:1px solid #eee;
		width:100%;
		font-size: 14px;
		color:#555;
	}
	.dataTable th{
		border:1px solid #ddd;
		height: 35px;
		background-color: #eee;
	}
	.dataTable td{
		border:1px solid #eee;
		height: 25px;
		text-align: center;
	}
	
</style>
