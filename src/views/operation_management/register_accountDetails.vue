<template>
	<section>
		<!--工具条-->
		<el-col :span="20" style="text-align: center;margin-top: 10px;">账户详情</el-col>
		<el-col :span="4" style="margin-top:10px;">
			<router-link :to="{ name: '注册用户信息' ,params: { id: '00', time:'00'}}"   >
				<el-button  type="text" size="small">返回注册用户信息</el-button>
			</router-link>
		</el-col>
		<el-col :span="12"  class="toolbar" style="padding-bottom: 0px;background: #fff;margin-left:300px;">
			<el-form :inline="true">
				<el-form-item label="用户ID：">
					{{id}}
				</el-form-item>
				<el-form-item label="用户名：">
				    {{username}}
				</el-form-item>
				<el-form-item label="真实姓名：">
					{{realName}}
				</el-form-item>
				<el-form-item label="性别：">
					{{sex}}
				</el-form-item>
				<el-form-item label="是否为黑名单用户：">
					{{blacklist}}
				</el-form-item>
				<el-form-item>
					<el-button type="primary"  size="small" v-if="blacklist === '否'"  v-on:click="addBlack">添加黑名单</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="20" :offset="4">
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">总资产：{{totalMoney}}</el-col>
				</el-col>
				<el-col :span="15">
					<el-col :span="24">是否为异常账户：{{isAccountUnusual}}</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">可用余额：{{leftMoney}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">账户偏差值：{{accountMoneyCheckDifferent}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">账户冻结资金：{{freezeMoney}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">零钱包余额：{{coinPurseAccountTotalMoney}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">产品冻结资金：{{investMoney}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">零钱包收益：{{coinEarnMoney}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">冻结资金是否一致：{{isSame}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">提现总次数：{{withdrawSuccessCount}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">充值总次数：{{count}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">提现总金额：
						<router-link :to="{ name: '提现记录',params: {user: username}}"   style="margin: 0 10px;">
		                    <el-button  type="text" size="small">{{WithdrawSuccessTotalMoney}}</el-button>
		                </router-link>
					</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">充值总金额：
						<router-link :to="{ name: '充值记录',params: {time: '00' ,user: username}}"   style="margin: 0 10px;">
		                    <el-button  type="text" size="small">{{sumUserRechargeSuccess}}</el-button>
		                </router-link>
					</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">可用总积分：</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">成功投资产品：
						<router-link :to="{ name: '投资记录',params: {time: '00' ,user: username}}"   style="margin: 0 10px;">
		                    <el-button  type="text" size="small">{{investSuccess}}</el-button>
		                </router-link>
					</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">已使用的总积分：</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">已结算投资产品：{{investSuccessEntirely}}</el-col>
					<!-- <el-col :span="24"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">已使用的投资券总金额：{{userCouponTotalMoney}}</el-col>
					<!-- <el-col :span="4"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">未结算投资产品：{{investSuccessUnEntirely}}</el-col>
					<!-- <el-col :span="5"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">未使用的投资券的总金额：{{userNoUseCouponTotalMoney}}</el-col>
					<!-- <el-col :span="4"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">总利息：{{totalInterestMoney}}</el-col>
					<!-- <el-col :span="5"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">已过期的投资券的总金额：{{userPastTimeCouponTotalMoney}}</el-col>
					<!-- <el-col :span="4"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">已支付利息：{{alreadSendInterestMoney}}</el-col>
					<!-- <el-col :span="5"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="6">已使用的红包总金额：{{useHongbaoTotalMoney}}</el-col>
					<!-- <el-col :span="4"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">未支付利息：{{noSendInterestMoney}}</el-col>
					<!-- <el-col :span="5"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="6">未使用的红包总金额：{{noUseHongbaoTotalMoney}}</el-col>
					<!-- <el-col :span="5"></el-col> -->
				</el-col>
			</el-col>
			<el-col :span="24" class="bt">
				<el-col :span="5" :offset="3">
					<el-col :span="24">邀请奖励：{{earnMoney}}</el-col>
					<!-- <el-col :span="5"></el-col> -->
				</el-col>
				<el-col :span="15">
					<el-col :span="24">已过期的红包总金额：{{userPastTimeHongbaoTotalMoney}}</el-col>
					<!-- <el-col :span="4"></el-col> -->
				</el-col>
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
				totalMoney:'',
				id:'',
				username:'',
				realName:'',
				leftMoney:'',
				freezeMoney:'',
				investMoney:'',
				sumUserRechargeSuccess:'',
				count:'',
				investSuccess:'',
				investSuccessEntirely:'',
				investSuccessUnEntirely:'',
				totalInterestMoney:'',
				alreadSendInterestMoney:'',
				noSendInterestMoney:'',
				earnMoney:'',
				coinEarnMoney:'',
				coinPurseAccountTotalMoney:'',
				withdrawSuccessCount:'',
				WithdrawSuccessTotalMoney:'',
				userCouponTotalMoney:'',
				userNoUseCouponTotalMoney:'',
				userPastTimeCouponTotalMoney:'',
				noUseHongbaoTotalMoney:'',
				useHongbaoTotalMoney:'',
				userPastTimeHongbaoTotalMoney:'',
				blacklist:'',
				sex:'',
				isAccountUnusual:'',
				accountMoneyCheckDifferent:'',
				isSame:''
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this
				const id = this.$route.params.id
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/admin/UserAccount/UserAccountDetailsManage?token='+_this.token+'&userId='+id,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.totalMoney = data.data.totalMoney
                        	_this.id = data.data.id
                        	_this.username = data.data.username
                        	_this.realName = data.data.realName
                        	_this.leftMoney = data.data.leftMoney
                        	_this.freezeMoney = data.data.freezeMoney
                        	_this.investMoney = data.data.investMoney
                        	_this.sumUserRechargeSuccess = data.data.sumUserRechargeSuccess
                        	_this.count = data.data.count
                        	_this.investSuccess = data.data.investSuccess
                        	_this.investSuccessEntirely = data.data.investSuccessEntirely
                        	_this.investSuccessUnEntirely = data.data.investSuccessUnEntirely
                        	_this.totalInterestMoney = data.data.totalInterestMoney
                        	_this.alreadSendInterestMoney = data.data.alreadSendInterestMoney
                        	_this.noSendInterestMoney = data.data.noSendInterestMoney
                        	_this.earnMoney = data.data.earnMoney
                        	_this.coinEarnMoney = data.data.coinEarnMoney
                        	_this.coinPurseAccountTotalMoney = data.data.coinPurseAccountTotalMoney
                        	_this.withdrawSuccessCount = data.data.withdrawSuccessCount
                        	_this.WithdrawSuccessTotalMoney = data.data.withdrawSuccessTotalMoney
                        	_this.userCouponTotalMoney = data.data.userCouponTotalMoney
                        	_this.userNoUseCouponTotalMoney = data.data.userNoUseCouponTotalMoney
                        	_this.userPastTimeCouponTotalMoney = data.data.userPastTimeCouponTotalMoney
                        	_this.noUseHongbaoTotalMoney = data.data.noUseHongbaoTotalMoney
                        	_this.useHongbaoTotalMoney = data.data.useHongbaoTotalMoney
                        	_this.userPastTimeHongbaoTotalMoney = data.data.userPastTimeHongbaoTotalMoney
                        	_this.blacklist = data.data.blacklist
                        	_this.sex = data.data.sex
                        	_this.isAccountUnusual = data.data.isAccountUnusual
                        	_this.accountMoneyCheckDifferent = data.data.accountMoneyCheckDifferent
                        	_this.isSame = data.data.isSame
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
			addBlack(){
				const _this = this
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pro/sysblacklist/addBlackList?token='+_this.token+'&userId='+_this.id,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	// _this.$message({
                         //        message: data.message,
                         //        type: 'success',
                         //        duration:1000
                         //    });
                            _this.getlist()
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
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			}
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
			this.token = JSON.parse(this.token)
			this.getlist();
		}
	}
</script>

<style>
	.bt{
		margin-bottom: 10px;
		/*color:#765;*/
	}
</style>