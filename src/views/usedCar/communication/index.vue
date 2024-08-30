<template>
  <div class="app-container">
    <div class="header">
      <el-form :model="filterForm">
        <el-form-item label="状态">
          <el-select v-model="filterForm.status">
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="filter-oper">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      :max-height="maxHeight"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="userRealName" label="用户名" width="180" />
      <el-table-column prop="userContactPhone" label="手机号" width="180" />
      <el-table-column prop="dealer" label="经销商名称" width="120" />
      <el-table-column prop="carTitle" label="二手车名称" width="200" />
      <el-table-column prop="statusDescription" label="状态">
        <template v-slot="scope">
          <el-text v-if="scope.row.status === '001'" :type="statusMap[scope.row.status]">{{
            scope.row.statusDescription
          }}</el-text>
          <el-text v-else :type="statusMap[scope.row.status]">{{
            scope.row.statusDescription
          }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="confirmTime" label="确认时间" width="180">
        <template v-slot="scope">
          <FromatDate :time="scope.row.confirmTime" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="180">
        <template v-slot="scope">
          <FromatDate :time="scope.row.modifyTime" />
        </template>
      </el-table-column>
      <el-table-column prop="oper" label="操作" width="120">
        <template v-slot="scope">
          <el-popover
            v-if="scope.row.status === '001'"
            placement="top"
            :width="120"
            trigger="click"
            :visible="scope.row.visible"
          >
            <template #reference>
              <el-button type="primary" size="small" @click.stop="scope.row.visible = true"
                >获取用户信息</el-button
              >
            </template>
            <div style="font-size: 12px; margin-bottom: 10px"> 确认获取用户信息 </div>
            <el-button size="small" @click="scope.row.visible = false">取消</el-button>
            <el-button size="small" type="primary" @click="handleUpdate(scope.row)">确定</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="pageParams.currentPage"
        v-model:page-size="pageParams.pageSize"
        :page-sizes="[20, 50, 150, 300]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FromatDate from '@/views/components/FromatDate.vue'
import { communication, update } from '@/api/communicate'
import { maxHeight, useTableHeight } from '@/hooks/useTableHeight'
import { ElMessage } from 'element-plus'

useTableHeight() // 动态修改表格高度
const loading = ref(false)
const tableData = ref([])
const statusOptions = [
  { value: '', label: '全部' },
  { value: '001', label: '待沟通' },
  { value: '090', label: '已确认' }
]
const statusMap = {
  '001': 'warning',
  '090': 'success'
} as any

// 过滤字段
const filterForm = reactive({
  status: ''
})
// 分页信息
const total = ref(0)
const pageParams = reactive({
  currentPage: 1,
  pageSize: 20
})

// 列表请求
const getData = async () => {
  loading.value = true
  try {
    const res = await communication({
      ...pageParams,
      condition: {
        ...filterForm
      }
    })
    loading.value = false
    const { body } = res
    total.value = body.totalCount
    tableData.value = body.pageItems
  } catch (error) {
    loading.value = false
  }
}
// 初始化列表数据
getData()

// 搜索
const search = () => {
  pageParams.pageSize = 20
  pageParams.currentPage = 1
  getData()
}

// 确认沟通
const handleUpdate = async (row: any) => {
  try {
    await update({ id: row.id })
    row.visible = false
    getData()
    ElMessage.success('修改成功')
  } catch (error) {}
}

// 修改每页数量
const handleSizeChange = (value: number) => {
  pageParams.pageSize = value
  getData()
}

// 改变当前页
const handleCurrentChange = (value: number) => {
  pageParams.currentPage = value
  getData()
}
// 重置
const reset = () => {
  filterForm.status = ''
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  .filter-oper {
    margin-left: 20px;
  }
}
.pagination {
  margin-top: 20px;
}
</style>
