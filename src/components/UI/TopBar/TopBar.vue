<template>
    <teleport to="main">
        <div class="topbar-wrapper">
            <div class="topbar">
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
.topbar-wrapper{
    position:sticky;
    top:0;
    height: 60px;
    box-shadow:0px 5px 5px rgb(0, 0, 0, 0.05);
    width:100%;
    z-index: 100;
    background: var(--gray0);
    display: flex;
    align-items: center;
}

.topbar{
    width: 90%;
    margin: 0px auto;
    min-width: 1200px;
}
</style>