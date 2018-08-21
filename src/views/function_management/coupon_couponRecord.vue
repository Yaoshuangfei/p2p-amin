<template>
	<section>
		<el-col :span="22" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="用户ID">
				    <el-input v-model="userId" @keyup.enter.native="keyLogin"></el-input>
				</el-form-item>
				<el-form-item label="投资最低金额">
				    <el-input v-model="investMoney" @keyup.enter.native="keyLogin"></el-input>
				</el-form-item>
				<el-form-item label="使用范围">
					<el-select v-model="periodType" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="status" clearable>
				      <el-option v-for="item in options1" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="type" clearable>
				      <el-option v-for="item in options2" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="60px">
			</el-table-column>
			<el-table-column prop="userId" width="100px" label="用户ID">
			</el-table-column>
			<el-table-column prop="bizNum" label="业务流水号" width="240px">
			<!-- 	<template scope="scope">
					<router-link :to="{ name: '注册用户信息',params: { id: '01', time: scope.row.username}}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.username}}</el-button>
					</router-link>
				</template> -->
			</el-table-column>
			<el-table-column prop="money" width="100px" label="券金额">
			</el-table-column>
			<el-table-column prop="rate" width="80px" label="加息率">
			</el-table-column>
			<el-table-column prop="investAtleastMoney" width="130px" label="投资最低金额">
			</el-table-column>
			<el-table-column prop="type" width="110px" label="类型" :formatter='formatterS'>
			</el-table-column>
			<el-table-column prop="status" width="110px" label="状态" :formatter='formatterT'>
			</el-table-column>
			<el-table-column prop="useRange"  label="使用范围" :formatter='formatteruseRange'>
			</el-table-column>
			<el-table-column prop="useRangeName" width="150px" label="使用范围中文描述">
			</el-table-column>
			<el-table-column prop="useTime" width="130px" label="券使用时间">
			</el-table-column>
			<el-table-column prop="actActivityType" width="100px" label="活动类型">
			</el-table-column>
			<el-table-column prop="remark" width="130px" label="备注">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
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
				options:[
					{label:'周标',value:'10'},
					{label:'新手标',value:'11'},
					{label:'月标',value:'20'},
					{label:'双月标',value:'30'},
					{label:'半季标',value:'25'},
					{label:'单季标',value:'40'},
					{label:'双季标',value:'50'}
				],
				options1:[
					{label:'未使用',value:'0'},
					{label:'已使用',value:'1'},
					{label:'已过期',value:'2'}
				],
				options2:[
					{label:'常规理财券',value:'10'},
					{label:'新手理财券',value:'11'},
					{label:'常规红包',value:'20'},
					{label:'新手红包',value:'21'},
					{label:'加息券',value:'30'}
				],
				token:'',
				userId:'',
				investMoney:'',
				periodType:'',
				status:'',
				type:'',
				list:[],
				total:0,
				page:0,
				listLoading:false
			}
		},
		methods: {
			getlist(){
				const _this = this
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/wel/welcoupon/list?token='+_this.token+'&page='+_this.page+'&pageSize=20'+'&userId='+_this.userId+'&investMoney='+_this.investMoney+'&periodType='+_this.periodType+'&status='+_this.status+'&type='+_this.type,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.total = data.data.totalCount
                        	_this.page = data.data.currPage
                        	_this.list = data.data.list
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
			formatterS(row,column){
                if(row.type === '10'){
                	return '常规理财券'
                }else if(row.type === '11'){
                	return '新手理财券'
                }else if(row.type === '20'){
                	return '常规红包'
                }else if(row.type === '21'){
                	return '新手红包'
                }else if(row.type === '30'){
                	return '加息券'
                }
            },
            formatterT(row,column){
                if(row.status === '0'){
                	return '未使用'
                }else if(row.status === '1'){
                	return '已使用'
                }else if(row.status === '2'){
                	return '已过期'
                }
            },
            formatteruseRange(row,column){
                let arry = row.useRange.split(',')
                let str = []
                for (var i = 0; i < arry.length; i++) {
                	if(arry[i] === '10'){
                		str.push('周标')
                	}else if(arry[i] === '11'){
                		str.push('新手标')	
                	}else if(arry[i] === '20'){
						str.push('月标')
                	}else if(arry[i] === '30'){
                		str.push('双月标')
                	}else if(arry[i] === '40'){
                		str.push('单季标')
                	}else if(arry[i] === '50'){
                		str.push('双季标')
                	}else if(arry[i] === '25'){
                		str.push('半季标')
                	}
                }
                return str.join(',')
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

</style>