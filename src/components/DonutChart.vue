<template>
  <div>
    <div class="text-h6 text-capitalize q-ml-sm">
      title of donut chart
    </div>
    <apexchart width="100%" type="donut" :options="options" :series="series">
    </apexchart>
    <!-- <VueApexCharts width="500" type="line" :options="options" :series="series">
    </VueApexCharts> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: 'DonutChart',
  components: [ VueApexCharts],
  props: {
  },
  data(){
    return{
      options: {
        chart: {
          id: 'DonutChart'
        }
      },
      series: [44, 55, 41, 17, 15]
    }
  }
})
</script>
