<script lang="ts" setup>
import { Component, h } from 'vue';
import { useRouter } from 'vue-router';
import { DropdownOption, NIcon, useDialog, useLoadingBar } from 'naive-ui';
import { LogOutOutline, SettingsOutline } from '@vicons/ionicons5';
import { UserFriends } from '@vicons/fa';
import { useUser } from '@stores';

const user = useUser();
const dialog = useDialog();
const router = useRouter();
const loading = useLoadingBar();

function renderIcon(icon: Component){
  return () => h(NIcon, null, {
    default: () => h(icon)
  });
}

const options: DropdownOption[] = [
  {
    label: "Settings",
    key: "settings",
    icon: renderIcon(SettingsOutline)
  },
  {
    label: "Switch Account",
    key: "switch",
    icon: renderIcon(UserFriends)
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(LogOutOutline),
  },
];

function handleSelect(key: string){
  const obj = {
    logout: () => {
      dialog.info({
        title: "Logging out",
        content: "Are you sure you want to log out?",
        onPositiveClick(_e) {
          loading.start();
          user.logout().then(() => {
            localStorage.removeItem("token");
            router.push("/login");
            loading.finish();
          });
        },
        positiveText: "Yes",
        closeOnEsc: true,
        maskClosable: true
      });
    },
    settings: () => {
      router.push("/settings");
    },
    switch: () => {
      router.push("/login");
    }
  };
  (obj[key as keyof typeof obj])();
}

defineProps<{
  name?: string;
}>();
</script>

<template>
  <n-dropdown trigger="click" :options="options" @select="handleSelect">
    <b>{{ name }}</b>
  </n-dropdown>
</template>

<style lang="scss" scoped>
b {
  font-size: 1rem;
  margin-right: 1rem;
}
</style>
