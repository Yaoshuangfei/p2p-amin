<template>
	<section>
		<el-row :gutter="10" style="font-size: 16px;">
		   <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:15px auto;">
		   		数量统计
		  	</el-col>
		  	<el-col :offset="1" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24">
					<el-col :span="24" class="tenH">已发布产品总数(个)</el-col>
					<el-col :span="24" class="tenH">{{totalProCount}}</el-col>
				</el-col>
		  	</el-col>
		  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24">
					<el-col :span="24" class="tenH">新手产品(个)</el-col>
					<el-col :span="24" class="tenH">{{newProCount}}</el-col>
				</el-col>
		  	</el-col>
		  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24">
					<el-col :span="24" class="tenH">常规产品(个)</el-col>
					<el-col :span="24" class="tenH">{{commonProCount}}</el-col>
				</el-col>
		  	</el-col>
		  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24">
					<el-col :span="24" class="tenH">售罄产品(个)</el-col>
					<el-col :span="24" class="tenH">{{saleoutCount}}</el-col>
				</el-col>
		  	</el-col>
		  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24" style="border-right: none;">
					<el-col :span="24" class="tenH">在售产品(个)</el-col>
					<el-col :span="24" class="tenH">{{saleingCount}}</el-col>
				</el-col>
		  	</el-col>
		</el-row>
		<el-row :gutter="10" style="font-size: 16px;">
		   <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:15px auto;">
		   		金额统计
		  	</el-col>
		  	<el-col :offset="1" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24">
					<el-col :span="24" class="tenH">发布产品总额(元)</el-col>
					<el-col :span="24" class="tenH">{{sumProCopies}}</el-col>
				</el-col>
		  	</el-col>
		  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24">
					<el-col :span="24" class="tenH">新手产品总额(元)</el-col>
					<el-col :span="24" class="tenH">{{newProSum}}</el-col>
				</el-col>
		  	</el-col>
		  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24">
					<el-col :span="24" class="tenH">常规产品总额(元)</el-col>
					<el-col :span="24" class="tenH">{{commonProSum}}</el-col>
				</el-col>
		  	</el-col>
		  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24">
					<el-col :span="24" class="tenH">售罄产品总额(元)</el-col>
					<el-col :span="24" class="tenH">{{saleoutSumCopies}}</el-col>
				</el-col>
		  	</el-col>
		  	<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
				<el-col class="topH"  :span="24" style="border-right: none;">
					<el-col :span="24" class="tenH">在售产品总额(元)</el-col>
					<el-col :span="24" class="tenH">{{saleingSumCopies}}</el-col>
				</el-col>
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
				token:'',
				totalProCount:'',
				newProCount:'',
				commonProCount:'',
				saleoutCount:'',
				saleingCount:'',
				sumProCopies:'',
				newProSum:'',
				commonProSum:'',
				saleoutSumCopies:'',
				saleingSumCopies:''
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pro/proproduct/queryProductStatistics?token='+_this.token,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.totalProCount = _this.formatterNum(data.data.totalProCount),
							_this.newProCount = _this.formatterNum(data.data.newProCount),
							_this.commonProCount = _this.formatterNum(data.data.commonProCount),
							_this.saleoutCount = _this.formatterNum(data.data.saleoutCount),
							_this.saleingCount = _this.formatterNum(data.data.saleingCount),
							_this.sumProCopies = _this.formatterNum(data.data.sumProCopies),
							_this.newProSum = _this.formatterNum(data.data.newProSum),
							_this.commonProSum = _this.formatterNum(data.data.commonProSum),
							_this.saleoutSumCopies = _this.formatterNum(data.data.saleoutSumCopies),
							_this.saleingSumCopies = _this.formatterNum(data.data.saleingSumCopies)

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
			formatterNum(s){
				s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(0) + "";
			    let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
			    let t = "";
			    for (let i = 0; i < l.length; i++) {
			        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			    }
			    return t.split("").reverse().join("");
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