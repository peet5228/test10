<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="mt-2 pa-2">
                        <p>ชื่อ : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-3">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table rounded">
                                <thead class="bg-grey">
                                    <tr>
                                        <th class="text-center border w-1/10">ตัวชี้วัด</th>
                                        <th class="text-center border w-1/10">รายละเอียดตัวชี้วัด</th>
                                        <th class="text-center border w-1/10">น้ำหนักคะแนน</th>
                                        <th class="text-center border w-1/10">คะแนนเต็ม</th>
                                        <th class="text-center border w-1/10">คะแนนที่ได้</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="indicate in topic.indicates" :key="indicate.id_indicate">
                                        <td class="text-center border">{{ indicate.name_indicate }}</td>
                                        <td class="text-center border">{{ indicate.detail_indicate }}</td>
                                        <td class="text-center border">{{ indicate.point_indicate }}</td>
                                        <td class="text-center border">{{ indicate.point_indicate*4 }}</td>
                                        <td class="text-center border">{{ indicate.score_member*indicate.point_indicate }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="mt-4 text-center">
                        <v-alert type="success" class="text-end">คะแนนรวมสุทธิ : {{ totalScore || 0 }} คะแนน</v-alert>
                    </div>
                </v-form>
                <v-alert type="success" v-else-if="user.status_eva === 1">คุณกรอกแบบประเมินแล้ว</v-alert>
                <v-alert type="warning" v-else >คุณยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {Eva} from '@/api/axios'
const user = ref({})
const topics = ref([])
const token = localStorage.getItem('token')
const totalScore = ref(0)
const fetchUser = async () =>{
    try{
        const res = await axios.get(`${Eva}/score_eva`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลไม่สำเร็จ',err)
    }
}

const fetchTopic = async () =>{
    try{
        const res = await axios.get(`${Eva}/score_eva/indicate`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
        res.data.forEach(score =>
            score.indicates.forEach((i) =>{
                totalScore.value += (i.score_member)*(i.point_indicate)
            })
        )
    }catch(err){
        console.error('โหลดข้อมูลไม่สำเร็จ',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})
const fileMap = ref<Record<string,string>>({})
const onFileChange = (event:Event,id_topic:number,id_indicate:number) =>{
    const file = (event.target as HTMLInputElement)?.files?.[0]
    if(!file)return
    fileMap.value[`${id_topic}-${id_indicate}`] = file
}

const saveScore = async () =>{
    const formData = new FormData()
    const allScore = topics.value.flatMap(topic =>
        topic.indicates.map((i:any) =>{
            const key = `${topic.id_topic}-${i.id_indicate}`
            const file = fileMap.value[key]
            if(file) formData.append(`file_${key}`,file)
            return{
                id_topic:topic.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
                detail_eva:i.detail_eva,
                file_key:file ? `file_${key}` : null,
            }
        })
    )
    if(allScore.some((s) => !s.score)){
        alert('กรุณากรอกคะแนนให้ครบ')
        return
    }
    formData.append('scores',JSON.stringify(allScore))
    try{
        await axios.post(`${Eva}/selfeva`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('บันทึกคะแนนสำเร็จ')
        await Promise.all([fetchTopic(),fetchUser()])
    }catch(err){
        console.error('บันทึกคะแนนไม่สำเร็จ',err)
    }
}
</script>

<style scoped>

</style>