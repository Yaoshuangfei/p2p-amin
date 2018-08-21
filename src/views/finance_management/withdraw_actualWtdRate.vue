<template>
    <section>
        <!--查询工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
            <el-form :inline="true" :model="filters">
                <el-form-item label="时间：">
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
        <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
            <el-table-column type="index"  label="序号" width="70px">
            </el-table-column>
            <el-table-column prop="transDate"  label="日期">
                 <template scope="scope">
                    {{scope.row.transDate.substring(0,10)}}
                </template>
            </el-table-column>
            <el-table-column prop="rechargeMoney"  label="充值金额(元)">
            </el-table-column>
            <el-table-column prop="withdrawalsMoney"  label="提现金额(元)">
            </el-table-column>
            <el-table-column prop="cashRate"  label="提现率(百分比)">
                <template scope="scope">
                    {{scope.row.cashRate}}%
                </template>
            </el-table-column>
        </el-table>

        <!--分页工具条-->
        <el-col :span="24" class="toolbar" style="background:#fff;">
            <el-pagination layout="total,prev,pager,next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
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
                list: [],
                value:'',
                filters: {
                    stTime:'',
                    etTime:''
                },
                total:0,
                currentPage: 1,
                listLoading: false
            }
        },
        computed: {

        },
        methods: {
            getlist(){
                const _this = this;
                if(this.value !== '' && this.value[0] !== null){
                    const sy = this.value[0].getMonth() + 1
                    const ey = this.value[1].getMonth() + 1
                    _this.filters.stTime = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
                    _this.filters.etTime = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
                    // _this.filters.payTimeSt = this.value[0].getTime()
                    // _this.filters.payTimeEt = this.value[1].getTime()
                }else{
                    _this.filters.stTime = null;
                    _this.filters.etTime = null
                }
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pay/paytransstatistics/rateCashExtraction?token='+_this.token+'&currentPage='+_this.currentPage+'&beginDate='+_this.filters.stTime+'&endDate='+_this.filters.etTime,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        //console.log(data)
                        if(data.code === 200){
                            _this.list = data.data.list;
                            _this.total = data.data.totalCount;

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
                this.currentPage = val;
                this.getlist();
            },
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