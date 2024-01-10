<template>
    <div class="surface-section px-4 py-3 md:px-6 lg:px-2">
        <div style="display: flex; align-items: center;">
            <i class="pi pi-shopping-cart mr-2" style="font-size: 24px;"></i>
            <p style="margin: 0; font-size: 20px;">My Shop</p>
        </div>
        <div class="grid py-2">
            <div class="col-12 md:col-4 flex flex-column align-items-center mb-3 md:mb-0">
                <img src="@/assets/solaobj.png" width="100"
                    class="inline-flex align-items-center justify-content-center bg-cyan-500 border-circle w-100rem h-100rem mb-4">
                <span class="text-900 text-xl font-medium mb-1">SOLAOบ้านเจ๊</span>
                <p class="text-600 line-height-3 py-0 m-0 px-3">Describe</p>
            </div>
            <div class="col-12 md:col-4 flex flex-column align-items-center mb-3 md:mb-0">
                <img src="@/assets/solaokk.jpg" width="100"
                    class="inline-flex align-items-center justify-content-center bg-cyan-500 border-circle w-100rem h-100rem mb-4">
                <span class="text-900 text-xl font-medium mb-1">SOLAO ฮัลโหล โซลาว</span>
                <p class="text-600 line-height-3 py-0 m-0 px-3">Describe</p>
            </div>
            <div class="col-12 md:col-4 flex flex-column align-items-center">
                <img src="@/assets/souelmind.png" width="100"
                    class="inline-flex align-items-center justify-content-center bg-cyan-500 border-circle w-100rem h-100rem mb-4">
                <span class="text-900 text-xl font-medium mb-1">SEOULMIND</span>
                <p class="text-600 line-height-3 py-0 m-0 px-3">Describe</p>
            </div>
        </div>
    </div>
    <div class="surface-section px-4 py-3 md:px-6 lg:px-2">
        <div style="display: flex; align-items: center;">
            <i class="pi pi-ticket mr-2" style="font-size: 24px;"></i>
            <p style="margin: 0; font-size: 20px;">My Coupon</p>
        </div>
        <div class="grid py-2">
            <div class="col-12 md:col-4 flex flex-column align-items-center mb-3 md:mb-0">
                <div class="flex align-items-center">
                    <img src="@/assets/coupon.png" width="200"
                        class="inline-flex align-items-center justify-content-center bg-cyan-500 mb-4">
                    <i class="text-900 text-xl font-medium mb-3 px-3 ">Discount 30%
                        <button>GET</button></i>
                </div>
                <div class="flex align-items-center">
                    <img src="@/assets/coupon.png" width="200"
                        class="inline-flex align-items-center justify-content-center bg-cyan-500 mb-4">
                    <i class="text-900 text-xl font-medium mb-3 px-3">Discount 30%
                        <button>GET</button>
                    </i>
                </div>
                <div class="flex align-items-center">
                    <img src="@/assets/coupon.png" width="200"
                        class="inline-flex align-items-center justify-content-center bg-cyan-500 mb-4">
                    <i class="text-900 text-xl font-medium mb-3 px-3">Discount 30%
                        <button>GET</button>
                    </i>
                </div>
            </div>
        </div>
    </div>
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