<template>
	<section>
		<!--工具条-->
		<el-col :span="22" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="用户名">
				    <el-input v-model="username" @keyup.enter.native="keyLogin"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="type" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="发起提现时间范围">
					<el-date-picker
				      v-model="value"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
                <el-form-item label="提现到账时间范围">
                    <el-date-picker
                      v-model="value1"
                      type="daterange"
                      placeholder="选择时间范围">
                    </el-date-picker>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="2" style="margin-top: 20px;"><el-button type="primary" v-on:click="batchAudit">批量审核</el-button></el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="60px">
			</el-table-column>
			<el-table-column prop="sysOrderId" width="140px" label="系统订单号">
			</el-table-column>
			<el-table-column prop="username" width="130px" label="用户名">
                <template scope="scope">
                  <router-link :to="{ name: '注册用户信息',params: { id: '01', time: scope.row.username}}"   style="margin: 0 10px;">
                    <el-button  type="text" size="small">{{scope.row.username}}</el-button>
                  </router-link>
                </template>
			</el-table-column>
			<el-table-column prop="userRealName" width="80px" label="姓名">
			</el-table-column>
			<el-table-column prop="transMoney" width="100px" label="提现金额">
			</el-table-column>
			<!-- <el-table-column prop="userCardManageId" width="100px" label="银行卡id">
			</el-table-column> -->
			<el-table-column prop="status" width="100px" label="提现状态" :formatter='formatterType'>
			</el-table-column>
			<el-table-column prop="checkStatus" width="100px"  label="资金审核" :formatter='checkStatusF'>
            </el-table-column>
			<el-table-column prop="auditStatus" width="100px" label="审核状态" :formatter='formatterStatus'>
			</el-table-column>
            <el-table-column prop="backMoneyStatus" width="100px" label="是否返款" :formatter='backMoneyInt'>
            </el-table-column>
            <el-table-column prop="insertTime" label="插入时间">
            </el-table-column>
            <el-table-column prop="auditTime" label="审核时间">
            </el-table-column>
            <el-table-column prop="payTime" label="到账时间">
            </el-table-column>
            <el-table-column prop="warningStatus" width="100px" label="警报状态" :formatter='warningStatusF'>
            </el-table-column>
			<el-table-column prop="remark" label="备注">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.remark !== null && scope.row.remark.length > 7">
                      <p>{{ scope.row.remark }}</p>
                      <div slot="reference" class="name-wrapper" v-if="scope.row.remark !== null && scope.row.remark.length > 7">
                        <el-tag style="width:115px;background:#fff;color: #000;">{{ scope.row.remark.substring(0,7)}}......</el-tag>
                      </div>
                      <div slot="reference" class="name-wrapper" v-if="scope.row.remark !== null && scope.row.remark.length < 7">
                        <el-tag style="width:115px;background:#fff;color: #000;">{{ scope.row.remark}}</el-tag>
                      </div>
                    </el-popover>
                    <el-col v-if="scope.row.remark !== null && scope.row.remark.length < 7">{{scope.row.remark}}</el-col>
                </template>
			</el-table-column>
			<el-table-column label="操作" width="150px">
				<template scope="scope">
                    <el-col :span="24">
                        <el-button type="text" v-if="scope.row.warningStatus === '0' && scope.row.auditStatus === '0'" size="small" @click="oneUp(scope.$index, scope.row)">资金审核</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="text" v-if="scope.row.checkStatus === '1' && scope.row.auditStatus === '0' && scope.row.warningStatus === '0' " size="small" @click="auditYes(scope.$index, scope.row)">审核通过</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="text" v-if="scope.row.checkStatus === '1' && scope.row.auditStatus === '0' && scope.row.warningStatus === '0' " size="small" @click="auditNo(scope.$index, scope.row)">审核不通过</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="text" v-if="scope.row.status === '2' && (scope.row.backMoneyStatus === '0' || scope.row.backMoneyStatus === null)" size="small" @click="returnMoney(scope.$index, scope.row)">返款</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button type="text" v-if="scope.row.status === '2' && (scope.row.backMoneyStatus === '0' || scope.row.backMoneyStatus === null)" size="small" @click="returnMoneyNo(scope.$index, scope.row)">不返款</el-button>
                    </el-col>
					
					
                    
                    <el-button type="text" v-if="scope.row.warningStatus === '1' " size="small" @click="jcwarning(scope.$index, scope.row)">解除警报</el-button>
					
                    
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
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
				value:'',
                value1:'',
				username:'',
				type:'',
				list: [],
                payTimeSt:'',
                payTimeEt:'',
				checked: true,
				options: [{
		          value: '0',
		          label: '提现中'
		        }, {
		          value: '1',
		          label: '提现成功'
		        }, {
		          value: '2',
		          label: '提现失败'
		        }],
				total: 0,
				page: 1,
				listLoading: false,
                payTimeSt1:'',
                payTimeEt1:''
			}
		},
        computed: {
            
        },
		methods: {
            keyLogin(ev){
             if (ev.keyCode==13){
                 this.getlist()
             }
            },
			getlist(){
				const _this = this;
                if(this.value !== '' && this.value[0] !== null){
                    const sy = this.value[0].getMonth() + 1
                    const ey = this.value[1].getMonth() + 1
                    _this.payTimeSt = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
                    _this.payTimeEt = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
                }else{
                    _this.payTimeSt = ''
                    _this.payTimeEt = ''
                }
                if(this.value1 !== '' && this.value1[0] !== null){
                    const sy1 = this.value1[0].getMonth() + 1
                    const ey1 = this.value1[1].getMonth() + 1
                    _this.payTimeSt1 = this.value1[0].getFullYear() + '-'+ sy1 + '-' + this.value1[0].getDate()
                    _this.payTimeEt1 = this.value1[1].getFullYear() + '-'+ ey1 + '-' + this.value1[1].getDate()
                }else{
                    _this.payTimeSt1 = ''
                    _this.payTimeEt1 = ''
                }
				let url = baseUrl+'/pay/paywithdraworder/pageListWithdrawOder?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10'+'&status='+_this.type+'&username='+_this.username
				if(this.value !== '' && this.value[0] !== null ||this.value1 !== '' && this.value1[0] !== null){
					url = baseUrl+'/pay/paywithdraworder/pageListWithdrawOder?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10'+'&status='+_this.type+'&username='+_this.username+'&timeSt='+_this.payTimeSt+'&timeEt='+_this.payTimeEt+'&payTimeSt='+_this.payTimeSt1+'&payTimeEt='+_this.payTimeEt1
				}else{
					url = baseUrl+'/pay/paywithdraworder/pageListWithdrawOder?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10'+'&status='+_this.type+'&username='+_this.username
				}
				
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.total = data.data.pageUtils.totalCount
                        	_this.page = data.data.pageUtils.currPage
                        	_this.list = data.data.pageUtils.list
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:2000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:2000
                            });
                        }
                    }
                });
			},
            jcwarning(index, row){
                this.$confirm('确认解除警报吗?', '提示', {
                }).then(() => {
                    const _this = this
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pay/paywithdraworder/updateWarningStatus?token='+_this.token+'&withdrawId='+row.id,
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            // console.log(data)
                            if(data.code === 200){
                                _this.getlist()
                                _this.$message({
                                    message: data.data,
                                    type: 'success',
                                    duration:2000
                                });
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:2000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.data,
                                    type: 'error',
                                    duration:2000
                                });
                                _this.getlist()
                            }
                        }
                    });
                }).catch(() => {

                });
            },
			oneUp(index, row){
                this.$confirm('确认资金审核吗?', '提示', {
                }).then(() => {
    				const _this = this
    				$.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pay/paywithdraworder/moneyCheck?token='+_this.token+'&withdrawId='+row.id,
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            // console.log(data)
                            if(data.code === 200){
                            	_this.getlist()
                            	_this.$message({
                                    message: data.message,
                                    type: 'success',
                                    duration:2000
                                });
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:2000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.message,
                                    type: 'error',
                                    duration:2000
                                });
                                _this.getlist()
                            }
                        }
                    });
                }).catch(() => {

                });
			},
			auditYes(index,row){
                this.$confirm('确认审核通过吗?', '提示', {
                }).then(() => {
    				const _this = this
    				$.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pay/paywithdraworder/updateWithdrawStatus?token='+_this.token+'&userId='+row.userId+'&withDrawId='+row.id+'&status=1',
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 500){
                                _this.$message({
                                    message: data.message,
                                    type: 'error',
                                    duration:2000
                                });
                            }else if(data.code === 200){
                            	_this.getlist()
                            	_this.$message({
                                    message: data.message,
                                    type: 'success',
                                    duration:2000
                                });
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:2000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.message,
                                    type: 'error',
                                    duration:2000
                                });
                                _this.getlist()
                            }
                        }
                    });
                }).catch(() => {

                });
			},
			auditNo(index,row){
                this.$confirm('确认审核不通过吗?', '提示', {
                }).then(() => {
                    const _this = this
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pay/paywithdraworder/updateWithdrawStatus?token='+_this.token+'&userId='+row.userId+'&withDrawId='+row.id+'&status=2',
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            // console.log(data)
                            if(data.code === 500){
                                _this.$message({
                                    message: data.message,
                                    type: 'error',
                                    duration:2000
                                });
                            }else if(data.code === 200){
                                _this.getlist()
                                _this.$message({
                                    message: data.message,
                                    type: 'success',
                                    duration:2000
                                });
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:2000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.message,
                                    type: 'error',
                                    duration:2000
                                });
                                _this.getlist()
                            }
                        }
                    });
                }).catch(() => {

                });
			},
            returnMoney(index,row){
                this.$confirm('确认返款吗?', '提示', {
                }).then(() => {
                    const _this = this
                    // console.log(index)
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pay/paywithdraworder/returnMoney?token='+_this.token+'&withdrawId='+row.id+'&backStatus=1',
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200){
                                _this.getlist()
                                _this.$message({
                                    message: data.data,
                                    type: 'success',
                                    duration:2000
                                });
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:2000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.data,
                                    type: 'error',
                                    duration:2000
                                });
                                _this.getlist()
                            }
                        }
                    });
                }).catch(() => {

                });
            },
            returnMoneyNo(index,row){
                this.$confirm('确认不返款吗?', '提示', {
                }).then(() => {
                    const _this = this
                    // console.log(index)
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pay/paywithdraworder/returnMoney?token='+_this.token+'&withdrawId='+row.id+'&backStatus=0',
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200){
                                _this.getlist()
                                _this.$message({
                                    message: data.data,
                                    type: 'success',
                                    duration:2000
                                });
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:2000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.data,
                                    type: 'error',
                                    duration:2000
                                });
                                _this.getlist()
                            }
                        }
                    });
                }).catch(() => {

                });
            },
			batchAudit(){
                this.$confirm('确认全部通过吗?', '提示', {
                }).then(() => {
    				const _this = this
    				$.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pay/paywithdraworder/withDrawAuditAll?token='+_this.token,
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            // console.log(data)
                            if(data.code === 200){
                            	_this.getlist()
                            	_this.$message({
                                    message: data.data,
                                    type: 'success',
                                    duration:2000
                                });
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:2000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.data,
                                    type: 'error',
                                    duration:2000
                                });
                                _this.getlist()
                            }
                        }
                    });
                }).catch(() => {

                });
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			},
            formatterTime(row,column){
                let curTime = row.createTime;
                curTime = new Date(curTime).toLocaleString()
                return curTime
            },
            formatterType(row,column){
                if(row.status === '0'){
                	return '提现中'
                }else if(row.status === '1'){
                	return  '提现成功'
                }else if(row.status === '2'){
                    return  '提现失败'
                }else if(row.status === '3'){
                	return '提现失败返款'
                }
            },
            formatterStatus(row,column) {
            	if(row.auditStatus === '0'){
                	return '待审核'
                }else if(row.auditStatus === '1'){
                	return  '审核成功'
                }else{
                	return '审核失败'
                }
            },
            checkStatusF(row,column) {
                if(row.checkStatus === '0'){
                    return '未审核'
                }else if(row.checkStatus === '1'){
                    return  '已审核'
                }
            },
            warningStatusF(row,column) {
                if(row.warningStatus === '0'){
                    return '无'
                }else if(row.warningStatus === '1'){
                    return  '警报'
                }
            },
            backMoneyInt(row,column) {
                if(row.backMoneyStatus  === '0' || row.backMoneyStatus  === null){
                    return '未操作'
                }else if(row.backMoneyStatus  === '1'){
                    return  '已操作'
                }
            },
            payTimeInt(row,column) {
                if(row.payTime  === 'null'){
                    return ''
                }else if(row.payTime  === '1'){
                    return  row.payTime
                }
            },
            geshihua(row,column) {
                if(row.remark !== null){
                    const str = row.remark
                    if(str.length  > 10){
                        return str.substring(0,10)+"..."
                    }else if(str.length  < 10){
                        return str
                    }
                }else{
                    return ''
                }
                // let str = row.remark
                
            }
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
			this.token = JSON.parse(this.token)
            if(this.$route.params.user !== '00'){
                this.username = this.$route.params.user
                this.type = '1'
            }
			this.getlist()
		}
	}
</script>

<style>
</style>