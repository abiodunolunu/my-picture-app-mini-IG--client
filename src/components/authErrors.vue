<template>
    <div>
     <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['errors']
}
</script>

<style lang="scss" scoped>
    div {
        background: lighten( red, 40%);
        padding: 5px 10px;
        border-radius: 5px;
        margin-bottom: 8px;

        p {
            color: red;
            font-size: 0.85rem;
            text-align: center;
        }
    }

    
</style>