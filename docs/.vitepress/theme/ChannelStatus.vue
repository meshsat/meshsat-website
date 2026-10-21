<script setup lang="ts">
import { computed } from 'vue'
import registry from '../../../site/data/transports.json'

// Shared with Hugo. The page's prose records the limits of the cited evidence.
const channels: Record<string, { code: string; evidence: string; reviewed: string }> = { ...registry.additional }
for (const category of registry.groups) {
  for (const group of category.groups) {
    for (const item of group.items) channels[item.id] = { ...item, code: group.code }
  }
}
const props = defineProps<{ channel?: string; code?: string; inline?: boolean }>()
const code = computed(() => {
  const value = props.channel ? channels[props.channel]?.code : props.code
  return ({ 'coming-soon': 'soon', 'future-plan': 'plan' } as Record<string, string>)[value || ''] || value
})
const status = computed(() => {
  const value = registry.codes[code.value as keyof typeof registry.codes]
  if (!value) throw new Error(`Unknown transport status: ${props.channel || props.code}`)
  return value
})
const className = computed(() => ({ soon: 'coming-soon', plan: 'future-plan' }[code.value || ''] || code.value))
</script>

<template>
  <span v-if="inline" class="channel-code" :class="`is-${className}`">{{ status.label }}</span>
  <div v-else class="channel-status">
    <p class="channel-status-line">
      <span class="channel-code" :class="`is-${className}`">{{ status.label }}</span>
      <span>{{ status.means }}</span>
      <a href="/transports/#status-codes">What the codes mean</a>
    </p>
    <p v-if="$slots.default" class="channel-status-note"><slot /></p>
    <p v-if="channel" class="channel-status-note">Status reviewed {{ channels[channel].reviewed }}. The evidence and limits are described below.</p>
  </div>
</template>
