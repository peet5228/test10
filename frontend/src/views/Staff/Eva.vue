<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-center font-weight-bold text-h5 text-maroon">จัดการแบบประเมิน</h1>
                    <v-form @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                            <v-text-field type="date" v-model="form.day_eva" label="วันที่ออกแบบประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="form.id_member" :items="member.map(m => ({title:`${m.first_name} ${m.last_name}`,value:m.id_member}))" label="รอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-select v-model="form.id_sys" :items="round.map(m => ({title:`รอบที่ ${m.round_sys} ปี ${m.year_sys}`,value:m.id_sys}))" label="รอบการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="submit" color="blue" class="w-full text-white">{{ form.id_eva ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="reset" color="error" class="w-full text-white">ยกเลิก</v-btn></v-col>
                        </v-row>
                    </v-form>

                    <br>

                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ผู้รับการประเมิน</th>
                                <th class="border text-center">รอบการประเมิน</th>
                                <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                <th class="border text-center">สถานะการประเมิน</th>
                                <th class="border text-center">จัดการ</th>
                                <th class="border text-center">เพิ่มกรรมการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                <td class="text-center border">{{ items.day_eva }}</td>
                                <td class="text-center border">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมการประเมิน' : 'ประเมินเสร็จสิ้น' }}</td>
                                <td class="text-center border">
                                    <v-btn class="text-center" size="small" color="warning" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                    <v-btn class="text-center" size="small" color="error" @click="del(items.id_eva)">ลบ</v-btn>
                                </td>
                                <td class="text-center border">
                                    <v-btn class="text-center" size="small" color="success" @click="add(items.id_eva)">เพิ่มกรรมการ</v-btn>
                                </td>
                            </tr>
                            <tr v-if="result.length === 0">
                                <td class="text-center border text-gray-500" colspan="8">แสดงเฉพาะแบบประเมินที่ยังไม่ได้ประเมินเท่านั้น</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {Staff} from '@/api/axios'
import {api} from '@/api/axios'

const token = localStorage.getItem('token')

const router = useRouter()

const result = ref([])
const member = ref([])
const round = ref([])

const form = ref({
    id_eva:null,
    id_member:'',
    id_sys:'',
    day_eva:'',
})

const reset = () => {
    form.value = {
        id_eva:null,
    id_member:'',
    id_sys:'',
    day_eva:'',
    }
}

const edit = (items:any) => {
    form.value = {...items}
}

const fetch = async () => {
    try{
        const m = await axios.get(`${Staff}/member/eva`,{headers : {Authorization: `Bearer ${token}` }})
        member.value = m.data
        const r = await axios.get(`${Staff}/eva/round`,{headers : {Authorization: `Bearer ${token}` }})
        round.value = r.data
        const res = await axios.get(`${Staff}/eva`,{headers : {Authorization: `Bearer ${token}` }})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    try{
        if(form.value.id_eva){
            await axios.put(`${Staff}/eva/${form.value.id_eva}`,form.value,{headers : {Authorization: `Bearer ${token}` }})
        }else{
            await axios.post(`${Staff}/eva`,form.value,{headers : {Authorization: `Bearer ${token}` }})
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('เกิดข้อผิดพลาด',err)
    }
}

const del = async (id_eva:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่?')) return
        await axios.delete(`${Staff}/eva/${id_eva}`,{headers : {Authorization: `Bearer ${token}` }})
        await fetch()
        await reset()
    }catch(err){
        console.error('Error Ddelete',err)
    }
}

const add = (id_eva:number) => {
    router.push({path:`Eva_commit/${id_eva}`})
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