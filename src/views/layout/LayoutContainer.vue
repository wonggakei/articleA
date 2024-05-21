<script setup>
import {
    Menu,
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
onMounted(() => {
    userStore.getUser()
})

// router
const router = useRouter()
// @command="handleCommand"判断
const handleCommand = async (key) => {
    if (key === 'logout') {
        // 退出操作 token清空
        // 提示框
        await ElMessageBox.confirm('确认退出登录吗?', '温馨提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
        userStore.removeToken()
        // 清空
        userStore.setUser({})
        router.push('/login')
    } else {
        // 跳转操作 $key 和下面command="profile"对应
        router.push(`/${key}`)
    }
}
</script>

<template>
    <el-container class="layout-container">
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" :default-active="$route.path"
                text-color="#fff" router>
                <el-menu-item index="/show">
                    <el-icon>
                        <Menu />
                    </el-icon>
                    <span>文章推荐</span>
                </el-menu-item>
                <el-menu-item index="/channel">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分类</span>
                </el-menu-item>
                <el-menu-item index="/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu index="/user">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/profile">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/password">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <!-- //头像 -->
            <el-header>
                <div>
                    用户：<strong>{{
                        userStore.user.nickname || userStore.user.username
                        }}</strong>
                </div>
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <!-- 展示头像 -->
                    <span class="el-dropdown__box">
                        <el-avatar :src="userStore.user.user_pic || avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <!-- 折叠下拉部分 -->
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            width: 150px;
            height: 150px;
            background: url('@/assets/英文潮流文字LOGO (1).png') no-repeat center / 200px auto;
            border-radius: 50%;
            margin-left: 20px;
            margin-top: 20px;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>
