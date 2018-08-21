<template>
	<section>
		<el-col :span="22" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="选择年">
					<el-date-picker v-model="value" type="year" placeholder="选择年"></el-date-picker>
				</el-form-item>
				<el-form-item label="选择月">
					<el-date-picker v-model="value4" format="MM" type="month" placeholder="选择月"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column prop="data" label="周">
				<template scope="scope">{{scope.row.data[0].week}}</template>
		    </el-table-column>
		    <el-table-column prop="data" label="货押宝周标">
		        <template scope="scope">
		          <el-col v-for="item in scope.row.data">{{item.type10}}</el-col>
		        </template>
		    </el-table-column>
		    <el-table-column prop="data" label="新手专享">
		        <template scope="scope">
		          <el-col v-for="item in scope.row.data">{{item.type11}}</el-col>
		        </template>
		    </el-table-column>
		    <el-table-column prop="data" label="货押宝月标">
		        <template scope="scope">
		          <el-col v-for="item in scope.row.data">{{item.type20}}</el-col>
		        </template>
		    </el-table-column>
		    <el-table-column prop="data" label="货押宝半季标">
		        <template scope="scope">
		          <el-col v-for="item in scope.row.data">{{item.type25}}</el-col>
		        </template>
		    </el-table-column>
		    <el-table-column prop="data" label="货押宝双月标">
		        <template scope="scope">
		          <el-col v-for="item in scope.row.data">{{item.type30}}</el-col>
		        </template>
		    </el-table-column>
		    <el-table-column prop="data" label="货押宝单季标">
		        <template scope="scope">
		          <el-col v-for="item in scope.row.data">{{item.type40}}</el-col>
		        </template>
		    </el-table-column>
		    <el-table-column prop="data" label="货押宝双季标">
		        <template scope="scope">
		          <el-col v-for="item in scope.row.data">{{item.type50}}</el-col>
		        </template>
		    </el-table-column>
		    <el-table-column prop="data" label="还款时间">
		        <template scope="scope">
		          <el-col v-for="item in scope.row.data">{{item.date}}</el-col>
		        </template>
		    </el-table-column>
		    <el-table-column prop="total" label="每周还款金额(元)">
		    	<template scope="scope">
		          <el-col>{{scope.row.total/100}}</el-col>
		        </template>
		    </el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="30" :total="total" style="float:right;">
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
				value4:'',
				value:'',
				list: [],
				total: 0,
				page: 1,
				years:'',
				months:'',
				listLoading: false
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this
				const time = new Date()
					_this.years = time.getFullYear().toString()
				
				if(_this.value !== '' && _this.value !== undefined){
					const time1 = _this.value
					_this.years = time1.getFullYear()
				}
				let url = baseUrl+'/pro/proinvest/weekRepaymentStatistics?token='+_this.token+'&page='+_this.page+'&pageSize=30&years='+_this.years
				if(_this.value4 !== '' && _this.value4 !== undefined){
					const time4 = this.value4
					_this.months = time4.getMonth() + 1
					url = baseUrl+'/pro/proinvest/weekRepaymentStatistics?token='+_this.token+'&page='+_this.page+'&pageSize=30&years='+_this.years+'&months='+_this.months
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.list = data.data.list
                        	_this.total = data.data.totalCount
                        	_this.page = data.data.currPage
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