<template>
    <div class="tooltip">
        <slot></slot>
        <p>{{label}}</p>
    </div>
</template>

<script>
export default {
    props:["label"]
}
</script>

<style lang="scss" scoped>
.tooltip{
    position:relative;
    display:flex;
    align-items:center;

    p {
        position:absolute;
        color: var(--gray0);
        background: rgba(0, 0, 0, 0.6);
        border-radius: 5px;
        font-size:12px;
        padding: 0px 10px; 
        right: -90px;
        bottom: -20px;
        opacity:0;
        transition: opacity 0.3s 0.3s;
    }

    &:hover{
        p{
            opacity:1;
        }
    }
}
</style>