<template>
    <h1>HOME</h1>
</template>

<script>
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

<style></style>