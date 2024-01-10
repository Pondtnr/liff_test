<template>
    <div class="container">

        <span v-show="loading">loading</span>

        <div v-show="lineProfileVisible" class="centerd-content ">
            <img :src="lineImage" width="280px" alt="Line Profile Image" class="rounded-circle">
            <div class="font-size">{{ lineName }}</div>
            <div v-if="isUIDVisible">
                UID: {{ lineUID }}
            </div>
            <button class="text-button" @click="toggleUIDVisibility">ข้อมูลส่วนตัว</button>
            
        </div>
        <button @click="logout" class="logout-button">
            LOGOUT
        </button>
    </div>
</template>



<script>
/* eslint-disable */ // Disabling ESLint for the entire script block
import axios from 'axios';

export default {
    data() {
        return {
            loading: true,
            lineProfileVisible: false,
            lineImage: '',
            lineName: 'HelloName',
            lineUID: 'UID: YOUR UID',
            lineMessage: '',
            userId: '',
            isUIDVisible: false,
        };
    },
    methods: {
        async main() {
            await liff.init({ liffId: '2002652641-9XEQkpez' });
            if (!liff.isLoggedIn()) {
                liff.login();
                return false;
            }
            const profile = await liff.getProfile();

            this.loading = false;

            //update
            this.lineImage = profile.pictureUrl;
            this.lineName = `${profile.displayName}`;
            this.lineUID = `${profile.userId}`;
            this.lineProfileVisible = true;
            this.userId = profile.userId;

            console.log('LOGIN', liff.getProfile());
        },
        toggleUIDVisibility() {
            this.isUIDVisible = !this.isUIDVisible;
        },
        logout() {
            liff.logout();
            window.location.reload();
        },
        async sendMessage() {
            try {
                if (!this.lineMessage) {
                    throw new Error('message not found');
                }
                const response = await axios.post(
                    'https://3242-180-183-202-88.ngrok-free.app/send-message',
                    {
                        userId: this.userId,
                        message: this.lineMessage,
                    }
                );
                console.log('response', response.data);
            } catch (error) {
                console.log('error', error);
            }
        },
    },
    mounted() {
        this.main();
    },
};
</script>


<style scoped>
.font-size {
    font-size: 20px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    height: 100vh;
    align-items: center;
    text-align: center;
    background-color: #f0f0f0;
    margin-top: 5px;
}

.rounded-circle {
    border-radius: 50%;
}

.logout-button {
    background-color: #e94545;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.text-button {
    background-color: #9c9c9c;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}
</style>
