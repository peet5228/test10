<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center font-weight-bold text-h5 text-maroon">สถานะการประเมินของกรรมการ</h1>
                    รายชื่อกรรมการประเมิน
                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">กรรมการประเมิน</th>
                                <th class="border text-center">สถานะการประเมิน</th>
                                <!-- <th class="border text-center">รายละเอียด</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border">
                                    <v-btn class="text-white" :color="bg(items.status_commit)" size="small">{{ items.status_commit === 'n' ? 'ยังไม่ได้ประเมิน' : 'ประเมินเสร็จสิ้น' }}</v-btn>
                                </td>
                                <!-- <td class="text-center border">
                                    <v-btn class="text-center" size="small" color="success" @click="add(items.id_eva)">รายละเอียด</v-btn>
                                </td> -->
                            </tr>
                            <tr v-if="result.length === 0">
                                <td class="text-center border text-gray-500" colspan="8">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {Staff} from '@/api/axios'
import {api} from '@/api/axios'

const token = localStorage.getItem('token')

const id_eva = useRoute().params.id_eva

const result = ref([])

const fetch = async () => {
    try{
        const res = await axios.get(`${Staff}/status/${id_eva}`,{headers : {Authorization: `Bearer ${token}` }})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const bg = (status_commit:string) => {
    if(status_commit === 'y') return 'success'
    if(status_commit === 'n') return 'error'
}

const add = (id_eva:number) => {
    router.push({path:`Status2/${id_eva}`})
}

onMounted(fetch)
</script>

<style scoped>

.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>