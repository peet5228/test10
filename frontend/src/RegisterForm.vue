<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="pa-4">
                    <h1 class="text-center font-weight-bold text-h5 text-maroon">สมัครสมาชิก</h1>
                    <p class="mt-2 text-center text-sm">ระบบแบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                    <v-form>
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="ชื่อ"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="นามสกุล"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="อีเมล"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="ชื่อผู้ใช้"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="รหัสผ่าน"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="ยืนยันรหัสผ่าน"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select v-model="form.first_name" :error-messages="error.first_name" label="เลือกประเภทสมาชิก"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="submit" class="text-maroon "></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
    first_name:'',
    last_name:'',
    email:'',
    username:'',
    password:'',
    role:'',
})
const error = ref<Record<string,string>>({})
const confirmPassword = ref('')

</script>

<style scoped>

</style>