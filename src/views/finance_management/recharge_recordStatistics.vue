<template>
    <section>
        <!--工具条-->
       <!--  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
            <el-form :inline="true">
                <el-form-item label="状态">
                    <el-select v-model="type" clearable>
                      <el-option v-for="item in options" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
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
        </el-col> -->

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
            <el-table-column type="index" width="80px">
            </el-table-column>
            <el-table-column prop="transDate"  label="交易日期">
                <template scope="scope">
                  <router-link :to="{ name: '充值记录',params: {time: scope.row.transDate ,user: '00'}}"   style="margin: 0 10px;">
                    <el-button  type="text" size="small">{{scope.row.transDate}}</el-button>
                  </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="transMoney"  label="交易金额">
            </el-table-column>
            <el-table-column prop="transCount"  label="总笔数">
            </el-table-column>
            <!-- <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="handEnabled(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column> -->
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
                id:'',
                username:'',
                type:'',
                value:'',
                list: [],
                options: [{
                  value: '0',
                  label: '处理中'
                }, {
                  value: '1',
                  label: '交易成功'
                }, {
                  value: '2',
                  label: '交易失败'
                }],
                total: 0,
                page: 1,
                listLoading: false,
                payTimeSt:'',
                payTimeEt:''
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
                // if(this.value !== '' && this.value[0] !== null){
                //     const sy = this.value[0].getMonth() + 1
                //     const ey = this.value[1].getMonth() + 1
                //     _this.payTimeSt = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
                //     _this.payTimeEt = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
                // }else{
                //     _this.payTimeSt = ''
                //     _this.payTimeEt = ''
                // }
                let url = baseUrl+'/pay/paytransstatistics/statistics?pageSize=10&type=1&token='+_this.token+'&page='+_this.page
                // if(this.value !== '' && this.value[0] !== null){
                //     url = baseUrl+'/pay/payrechargerecord/pageListRechageRecord?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10&username='+_this.username+'&status='+_this.type+'&timeSt='+_this.payTimeSt+'&timeEt='+_this.payTimeEt
                // }else{
                //     url = baseUrl+'/pay/payrechargerecord/pageListRechageRecord?token='+_this.token+'&currentPage='+_this.page+'&pageSize=10&username='+_this.username+'&status='+_this.type
                // }
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    data:"",
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
            },
            fstatus(row,column){
                if(row.status === '0'){
                    return '处理中'
                }else if(row.status === '1'){
                    return '交易成功'
                }else if(row.status === '2'){
                    return '交易失败'
                }
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