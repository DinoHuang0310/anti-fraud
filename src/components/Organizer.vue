<template>
  <div
    id="corporate-sponsor"
    class="bg-white dark:bg-gray-100 bg-repeat py-16 sm:py-24"
  >
    <Title>防詐陣線</Title>
    <div class="container space-y-16 md:space-y-8 w-11/12 max-w-[1024px]">
      <table class="block md:table w-full" v-for="group in organizer" :key="group.index">
        <tbody class="block md:table-row-group">
          <tr class="block md:table-row">
            <td class="block md:table-cell">
              <div
                class="flex flex-wrap"
                :class="group.list.length === 1 && 'justify-center sm:justify-start'"
              >
                <div
                  v-for="organizer in group.list"
                  :key="organizer.index"
                  :class="organizer.className || 'w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-4'"
                >
                  <a
                    v-if="organizer.href"
                    :class="organizer.contentClass || 'relative block pb-[34%]'"
                    :href="organizer.href"
                    target="_blank"
                  >
                    <img
                      class="absolute h-full w-full object-contain"
                      :src="`${isDev ? '' : '.'}${organizer.image}`"
                      :alt="organizer.title"
                      loading="lazy"
                    >
                  </a>
                  <div v-else class="relative block pb-[34%]">
                    <img
                      class="absolute h-full w-full object-contain"
                      :src="`${isDev ? '' : '.'}${organizer.image}`"
                      :alt="organizer.title"
                      loading="lazy"
                    >
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Title from '../components/Title.vue'
import useClientConfig from '../composables/useClientConfig'

const { isDev } = useClientConfig()
const props = defineProps({
  organizer: {
    type: Array,
    required: true
  },
})
</script>