<template>
  <el-dialog
    :model-value="props.modelValue"
    :close-on-click-modal="false"
    title="简历详情"
    @open="open"
    @close="close"
    width="80%"
  >
    <template #default>
      <!-- 个人信息 -->
      <div class="base-form form-item">
        <div class="title">个人信息</div>
        <el-form :model="detailForm">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="姓名" prop="name">
                {{ detailForm.name }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="在职状态" prop="jobStatus">
                {{ statusMap[detailForm.jobStatus] }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机号码" prop="phone">
                {{ detailForm.phone }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮箱" prop="email">
                {{ detailForm.email }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="性别" prop="gender">
                {{ genderMap[detailForm.gender] }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生年月" prop="birthDate">
                {{ formatDateTime(detailForm.birthDate, "YYYY-MM-DD") }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始工作时间" prop="startWorkDate">
                {{ formatDateTime(detailForm.startWorkDate, "YYYY-MM-DD") }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 期望职位 -->
      <div class="position-form form-item">
        <div class="title">期望职位</div>
        <el-form :model="detailForm" ref="positionFormRef">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="期望职位" prop="expectedPosition">
                {{ detailForm.expectedPosition }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="期望薪资" prop="salary">
                {{ detailForm.salary }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="期望行业" prop="expectedIndustry">
                {{ detailForm.expectedIndustry }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工作城市" prop="workCity">
                {{ detailForm.workCity }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 工作经历 -->
      <div class="add-form-item form-item">
        <div class="title">工作经历</div>
        <div
          class="show-form-item"
          v-for="(item, index) in detailForm.workExperiences"
          :key="index"
        >
          <!-- 编辑工作经历 -->
          <el-form :model="item">
            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="公司名称" prop="companyName">
                  {{ item.companyName }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属行业" prop="industry">
                  {{ item.industry }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="公司部门名称" prop="dept">
                  {{ item.dept }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职位名称" prop="positionName">
                  {{ item.positionName }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="在职时间" prop="officeTime">
                  {{ formatDateTime(item.officeTime[0], "YYYY-MM-DD") }} -
                  {{ formatDateTime(item.officeTime[1], "YYYY-MM-DD") }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="工作内容" prop="workContent">
                  {{ item.workContent }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="工作业绩" prop="workPerformance">
                  {{ item.workPerformance }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="拥有技能" prop="skills">
                  {{ item.skills }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!-- 项目经历-->
      <div class="add-form-item form-item">
        <div class="title">项目经历</div>
        <div
          class="show-form-item"
          v-for="(item, index) in detailForm.projectExperiences"
          :key="index"
        >
          <!-- 编辑项目经历 -->
          <el-form :model="item">
            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="项目名称" prop="projectName">
                  {{ item.projectName }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目角色" prop="projectRole">
                  {{ item.projectRole }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目时间" prop="projectTime">
                  {{ formatDateTime(item.projectTime[0], "YYYY-MM-DD") }}
                  -
                  {{ formatDateTime(item.projectTime[1], "YYYY-MM-DD") }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="项目内容" prop="projectContent">
                  {{ item.projectContent }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="项目业绩" prop="projectPerformance">
                  {{ item.projectPerformance }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="项目链接" prop="projectLink">
                  {{ item.projectLink }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!-- 教育经历 -->
      <div class="add-form-item form-item">
        <div class="title">教育经历</div>
        <div
          class="show-form-item"
          v-for="(item, index) in detailForm.eduExperiences"
          :key="index"
        >
          <!-- 编辑项目经历 -->
          <el-form :model="item">
            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="学校名称" prop="schoolName">
                  {{ item.schoolName }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学历" prop="eduQualifications">
                  {{ item.eduQualifications }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业" prop="major">
                  {{ item.major }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="在校时间" prop="schoolTime">
                  {{ formatDateTime(item.schoolTime[0], "YYYY-MM-DD") }}
                  -
                  {{ formatDateTime(item.schoolTime[1], "YYYY-MM-DD") }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="在校经历" prop="schoolExperience">
                  {{ item.schoolExperience }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!-- 证书 -->
      <div class="form-item">
        <div class="title">资格证书</div>
        <el-tag
          v-for="tag in detailForm.certificateTags"
          :key="tag"
          :disable-transitions="false"
        >
          {{ tag }}
        </el-tag>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { resumeDetail } from "@/api/recruitment/delivery";
import { formatDateTime } from "@/utils";

interface Props {
  modelValue: boolean;
  id?: string | number;
}
const detailForm = reactive<any>({
  name: "", // 姓名
  jobStatus: "", // 在职状态
  phone: "", // 电话
  email: "", // 邮箱
  gender: "", // 性别
  birthDate: "", // 出生年月
  startWorkDate: "", // 开始工作时间
  expectedPosition: "", // 期望职位
  salary: "", // 期望薪资
  expectedIndustry: "", // 期望行业
  workCity: "", // 工作城市
  workExperiences: [] as any,
  projectExperiences: [] as any,
  eduExperiences: [] as any,
  certificateTags: [],
});
const emit = defineEmits(["update:modelValue", "refresh"]);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  id: "1",
});
const statusMap = {
  "0": "离职",
  "1": "在职",
} as any;
const genderMap = {
  "0": "女",
  "1": "男",
} as any;

// 关闭
const close = () => emit("update:modelValue", false);

// 打开时
const open = () => {
  getResumeDetail();
};

const initFormFields = (detail: any) => {
  Object.keys(detailForm).forEach((key) => {
    if (detail.hasOwnProperty(key)) {
      detailForm[key] = detail[key];
    }
  });
  detailForm.certificateTags =
    detail.certificate && detail.certificate?.split(",");
};

// 获取详情数据
const getResumeDetail = async () => {
  try {
    const res = await resumeDetail({
      id: props.id,
    });
    initFormFields(res.body);
  } catch (error) {}
};
</script>

<style scoped lang="scss">
.form-item {
  padding: 12px 0;
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
  :deep(.el-form-item__label) {
    font-weight: 600;
  }
  .title {
    position: relative;
    padding-left: 14px;
    font-size: 20px;
    height: 27px;
    line-height: 27px;
    font-weight: 500;
    margin-bottom: 12px;
    &::before {
      content: "";
      position: absolute;
      width: 4px;
      height: 17px;
      background: #409eff;
      border-radius: 3px;
      left: 0;
      top: 5px;
    }
  }
  .button-new-tag {
    margin-left: 10px;
  }
  .submit {
    justify-content: flex-end;
  }
  &.add-form-item {
    &:hover {
      .add-icon {
        display: flex;
      }
    }
    .add-icon {
      position: absolute;
      right: 0;
      top: 0;
      align-items: center;
      cursor: pointer;
      display: none;
      .icon-plus {
        margin-right: 5px;
        padding: 2px;
        border-radius: 3px;
        font-size: 13px;
        font-weight: 400;
        background: #e20755;
        color: #fff;
      }
      span {
        font-size: 13px;
        color: #e20755;
      }
    }
  }
  .show-form-item {
    margin-top: 24px;
    .form-item-info {
      padding: 8px 16px;
      position: relative;
      min-height: 40px;
      border-radius: 8px;
      .edit-btn {
        display: none;
      }
      .info-title {
        display: flex;
        justify-content: space-between;
        height: 24px;
        line-height: 24px;
        .name {
          font-size: 16px;
          font-weight: 500;
          color: #222;
          span:first-of-type {
            margin-right: 20px;
          }
          .school-time {
            display: inline-block;
            font-size: 14px;
            color: #999;
            line-height: 20px;
            align-self: start;
          }
        }
      }
      .school-attr {
        display: block;
        overflow: hidden;
        margin-top: 8px;
        li {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
          float: left;
          padding: 0 8px;
          line-height: 20px;
          font-size: 14px;
          margin: 0;
          min-height: auto;
          color: #222;
          &:first-of-type {
            padding-left: 0;
          }
        }
      }
      &:hover {
        background: #f8f8f8;
        cursor: pointer;
        .edit-btn {
          display: block;
        }
      }
    }
  }
}
</style>
