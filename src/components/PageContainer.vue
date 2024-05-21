<!-- 父传子 -->
<script setup>
defineProps({
    // 标题
    title: {
        require: true,
        type: String
    }
})
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>{{ title }}</span>
                <div class="extra">
                    <!-- 添加按钮不写死 用具名插槽占位 -->
                    <slot name="extra"></slot>
                </div>
            </div>
        </template>
        <!-- 内容 -->
        <!-- 默认插槽 -->
        <slot></slot>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    /*最小高度*/
    min-height: 100%;
    box-sizing: border-box;

    /*里面布局*/
    .header {
        /*布局 去两边 垂直居中*/
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
