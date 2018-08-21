 <template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<!-- <el-form-item label="平台:">
					<el-select v-model="platformT" clearable>
				      <el-option v-for="item in types" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item> -->
				<el-form-item label="时间范围：">
					<el-date-picker
				      v-model="value"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row show-summary v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="100px;">
			</el-table-column>
			<el-table-column prop="title" label="注册平台">
				<!-- <template scope="scope">
					<router-link :to="{ name: '渠道统计汇总表',params: { type: platformT, time: '0' }}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.title}}</el-button>
					</router-link>
				</template> -->
			</el-table-column>
			<el-table-column prop="content" label="注册人数">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->
	</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				value:'',
				insertTimeSt:'',
				insertTimeEt:'',
				token:'',
				platformT:'9',
				types:[{
		          value: '9',
		          label: '全部'
		        },{
		          value: '0',
		          label: 'android'
		        }, {
		          value: '1',
		          label: 'iOS'
		        }, {
		          value: '2',
		          label: 'pc'
		        }, {
		          value: '3',
		          label: 'wap'
		        }],
		        list:[],
				selectSubjectStatus: [
				{
					value:'0',
					label:'全部'
				},{
					value:'1',
					label:'待付款'
				},{
					value:'2',
					label:'待发货'
				},{
					value:'3',
					label:'已发货'
				},{
					value:'4',
					label:'待评价'
				},{
					value:'5',
					label:'退货'
				}],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm:{},

				addbannerdiv: false,//新增界面是否显示
                modifybannerdiv: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				uploadDetails: {
					poType:'',
				}
			}
		},
		methods: {
			getlist(){
				const _this = this
				if(this.value !== '' && this.value[0] !== null){
                    const sy = this.value[0].getMonth() + 1
                    const ey = this.value[1].getMonth() + 1
                    _this.insertTimeSt = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
                    _this.insertTimeEt = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
                }else{
                    _this.insertTimeSt = ''
                    _this.insertTimeEt = ''
                }
                var url = baseUrl+"/admin/user/queryUserCountByPlatform?token="+_this.token+'&insertTimeSt='+_this.insertTimeSt+'&insertTimeEt='+_this.insertTimeEt
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.data
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
                if(this.platformT === ''){
               		this.platformT = '9'
                }
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			},
            handmodify: function (index, row) {
			    this.modifybannerdiv = true;
			    this.editForm = row;
            },
            formatterType(row,column){
                let type = ''
                if(row.status === '1'){
                	type = '使用中'
                }else{
                	type = '未使用'
                }
                return type
            },
            formatterpoType(row,column) {
            	if(row.type === '0'){
                	return '网站'
                }else if(row.type === '1'){
                	return '手机'
                }else if(row.type === '2'){
                	return 'WAP'
                }
            }
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
			this.getlist()
		}
	}
</script>

<style>
	
</style>