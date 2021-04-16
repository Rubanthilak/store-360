<template>
    <div class="top-bar flex">
        <div class="container flex">
            <the-logo></the-logo>
            <the-links></the-links>
            <img src="../../../assets/icons/settings.svg" alt="settings_icon">
        </div>
    </div>
</template>

<script>
import NavigationBarLogo from './NavigationBarLogo.vue';
import NavigationBarLinks from './NavigationBarLinks.vue';

export default {
    components: {
        'the-logo': NavigationBarLogo,
        'the-links': NavigationBarLinks
    }
}
</script>

<style scoped lang="scss">
    .top-bar{
        position: absolute;
        top: 0px;
        width: 100%;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
        height: 60px;
        background: var(--gray0);
        align-items: center;    

        .container{
            justify-content: space-between;
            align-items: center;  
            width: 90%;  
        }
    }
</style>