<template>
  <div class="authorize">
    <el-form label-width="auto">
      <el-form-item>
        <el-input
          class="authorize-input"
          v-model="dataAuthorization"
          clearable
          show-password
          placeholder="请输入授权码"
        />
      </el-form-item>
    </el-form>
    <div class="flex justify-end mt-auto">
      <el-button type="primary" class="common-btn cancel-btn" @click="cancel">取消</el-button>
      <el-button type="primary" class="common-btn confirm-btn" @click="save">确定</el-button>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { PropType, ref, watch } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { localDataAuthorization, useUserStoreWithOut } from '@/store/modules/user'

const props = defineProps({
  currentRow: {
    type: String as PropType<string>,
    default: () => ''
  }
})

const userStore = useUserStoreWithOut()
const dataAuthorization = ref(props.currentRow)
const emit = defineEmits(['close'])

watch(
  () => props.currentRow,
  (value) => {
    dataAuthorization.value = value
  },
  {
    deep: true,
    immediate: true
  }
)

const save = () => {
  if (dataAuthorization.value !== localDataAuthorization) {
    ElMessage.error('授权失败，请重新输入')
  } else {
    userStore.setDataAuthorization(dataAuthorization.value)
    emit('close')
    ElMessage.success('授权成功')
  }
}

const cancel = () => {
  emit('close', true)
}
</script>
<style lang="less" scoped>
.authorize {
  .authorize-input {
    height: 44px;
    background: transparent;

    :deep(.el-input__wrapper) {
      border: 1px solid #0957ac;
      border-radius: 10px;
      box-shadow: none;
    }
  }

  .common-btn {
    width: 88px;
    height: 40px;
    border-radius: 10px;
  }

  .cancel-btn {
    color: #0957ac;
    background: var(--fill-color-blank, #fff);
    border: 1px solid #0957ac;
  }

  .confirm-btn {
    margin-left: 8px;
    color: var(--color-white, #fff);
    background: linear-gradient(0deg, #042346 0%, #0957ac 100%);
    border: none;
  }
}
</style>
