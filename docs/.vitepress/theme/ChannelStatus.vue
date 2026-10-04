<script setup lang="ts">
// The status block that opens every /transports/ page (MESHSAT-1498).
//
// Five codes say where a channel stands. The codes and their meanings live
// here once and match the legend under the transports table on meshsat.net
// (site/i18n/en.yaml, lg_*): change one, change the other. A status is a fact
// about the kits and nodes, so a page's code changes when the hardware does,
// together with the home page row.
//
//   <ChannelStatus code="coming-soon">One line about this channel.</ChannelStatus>
//   <ChannelStatus code="live" inline />      just the code, for a table cell
const CODES = {
  'live': { label: 'LIVE', means: 'Runs on our prototype hardware today.' },
  'code': { label: 'CODE', means: 'In the Bridge, not running on a kit.' },
  'bench': { label: 'BENCH', means: 'Hardware on our bench, not in a kit yet.' },
  'coming-soon': { label: 'COMING SOON', means: 'Hardware on its way to the bench, nothing tested.' },
  'future-plan': { label: 'FUTURE PLAN', means: 'Planned, nothing bought.' },
} as const

const props = defineProps<{ code: keyof typeof CODES; inline?: boolean }>()
const status = CODES[props.code]
</script>

<template>
  <span v-if="inline" class="channel-code" :class="`is-${code}`">{{ status.label }}</span>
  <div v-else class="channel-status">
    <p class="channel-status-line">
      <span class="channel-code" :class="`is-${code}`">{{ status.label }}</span>
      <span>{{ status.means }}</span>
      <a href="/transports/#status-codes">What the codes mean</a>
    </p>
    <p v-if="$slots.default" class="channel-status-note"><slot /></p>
  </div>
</template>
