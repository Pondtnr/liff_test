<template>
    <div class=" bg-blue-900 px-1 shadow-2 flex align-items-center justify-content-between relative lg:static border-bottom-1 border-gray-800"
        style="min-height: 90px; width: 100%;">
        <img src="@/assets/TEST LINE LIFF .png" alt="Image" height="60" class="mr-0 lg:mr-6 circle-image" />

        <div class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full 
    bg-blue-900 left-0 top-0 z-1 shadow-2 lg:shadow-none border-1 lg:border-none border-gray-800 w-full">
            <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row w-full">
                <li>
                    <router-link to="/" v-ripple
                        class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
                        style="color: white !important; text-decoration: none; font-size: 20px;">
                        <i class="pi pi-home mr-2" style="font-size: 24px;"></i>
                        <span>Home</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/Shop" v-ripple
                        class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
                        style="color: white !important; text-decoration: none; font-size: 20px;">
                        <i class="pi pi-shopping-cart mr-2" style="font-size: 24px;"></i>
                        <span>Shop</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/Coupon" v-ripple
                        class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
                        style="color: white !important; text-decoration: none; font-size: 20px;">
                        <i class="pi pi-ticket mr-2" style="font-size: 24px;"></i>
                        <span>Coupon</span>
                    </router-link>
                </li>
            </ul>
            <ul
                class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 surface-border lg:border-top-none">
                <li class="border-top-1 surface-border lg:border-top-none">
                    <router-link to="Profile" v-ripple
                        class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple circle-image">
                        <img :src="lineImage" class="mr-3 lg:mr-0 " style="width: 60px; height:60px" />
                    </router-link>
                </li>
            </ul>
        </div>

        <a @click="toggleMenu" class="menu-button burger-btn" v-if="isMobile">
            <i class="pi pi-bars text-4xl"></i>
        </a>



    </div>
    <!-- Responsive menu items -->
    <ul v-if="isMenuOpen" class="responsive-menu">
        <li>
            <router-link to="/" @click="closeMenu" class="menu-item">
                <i class="pi pi-home"></i> Home
            </router-link>
        </li>
        <li>
            <router-link to="/shop" @click="closeMenu" class="menu-item">
                <i class="pi pi-shopping-cart"></i> Shop
            </router-link>
        </li>
        <li>
            <router-link to="/coupon" @click="closeMenu" class="menu-item">
                <i class="pi pi-ticket"></i> Coupon
            </router-link>
        </li>
        <li>
            <router-link to="/profile" @click="closeMenu" class="menu-item">
                <i class="pi pi-user"></i> Profile
            </router-link>
        </li>
    </ul>

    <router-view></router-view>
    
</template>
  


<script>
/* eslint-disable */ // Disabling ESLint for the entire script block
import axios from 'axios';
import Profile from './components/Profile.vue';
export default {
    components: {
        Profile,
    },
    data() {
        return {
            loading: true,
            lineProfileVisible: false,
            lineImage: '',
            lineName: 'HelloName',
            lineUID: 'UID: YOUR UID',
            lineMessage: '',
            userId: '',
            isMenuOpen: false,
            isMobile: true,
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
        handleResize() {
            this.isMobile = window.innerWidth <= 991;
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        closeMenu() {
            this.isMenuOpen = false;
        },
        logout() {
            liff.logout();
            window.location.reload();
        },
        handleScroll() {
            if (this.isMenuOpen) {
                this.isMenuOpen = false;
            }},
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
            this.isMobile = window.innerWidth <= 768;
            window.addEventListener('resize', this.handleResize);
            window.addEventListener('scroll', this.handleScroll);

        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
            window.removeEventListener('scroll', this.handleScroll);

        },
    };
</script>


<style lang="scss">
@import "~primeflex/primeflex.css";

.responsive-menu {
    padding: 0;
    margin: 0;
    position: fixed;
    top: 50;
    left: 0;
    width: 100%;
    height: 20%;
    background-color: rgba(0, 0, 0, 0.7);
    /* Semi-transparent black background */
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.menu-item {
    display: block;
    padding: 12px;
    text-decoration: none;
    color: #333;
    font-size: 16px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
}

.menu-item i {
    margin-right: 10px;
}

.menu-item:hover {
    background-color: #f2f2f2;
}

.burger-btn {
    color: #ffffff;
}

.circle-image img {
    border-radius: 50%;
}

.responsive-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #fff;
    /* Set the background color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Add a subtle box shadow */
    border-radius: 8px;
    /* Add rounded corners */
}

.menu-item {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #333;
    /* Set the text color */
    transition: background-color 0.3s;
    /* Add a smooth transition for the background color */
}

.menu-item:hover {
    background-color: #f2f2f2;
    /* Change background color on hover */
}

.regular-menu {
    /* Style for the regular menu bar (non-responsive) */
    display: flex;
    list-style: none;
    padding: 0;
}

/* Media query for screens smaller than a certain size (adjust the size as needed) */
@media (max-width: 768px) {
    .regular-menu {
        display: none;
        /* Hide regular menu on smaller screens */
    }
}
</style> 



