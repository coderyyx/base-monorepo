<template>
  <div
    :class="[
      $style.divider,
      { [$style.light]: theme === 'light', [$style.dark]: theme === 'dark' },
    ]"
  >
    <div :class="$style.inner">
      <div :class="$style.left" />
      <div :class="$style.center" />
      <div :class="$style.right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DividerLine',
};
</script>

<script setup>
defineProps({
  theme: {
    type: String,
    default: 'light',
  },
});
</script>

<style lang="scss" module>
.divider {
  .inner {
    @apply tw-flex-items-center;
  }

  .left {
    @apply tw-h-[9px] tw-w-[19px] tw-shrink-0;
    background: no-repeat center url('./arrow-l.svg');
  }

  .center {
    @apply tw-bg-ys-l-grey-white-5 tw-h-px tw-flex-1;
  }

  .right {
    @apply tw-h-[9px] tw-w-[19px] tw-shrink-0;
    transform: scaleX(-1);
    background: no-repeat center url('./arrow-l.svg');
  }

  &.dark {
    .left,
    .right {
      background-image: url('./arrow-d.svg');
    }
    .center {
      @apply tw-bg-gt-g-grey-white-4;
    }
  }
}
</style>
