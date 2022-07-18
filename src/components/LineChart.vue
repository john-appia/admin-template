<template>
  <div>
    <div class="text-h6 text-capitalize q-ml-sm">
      title of line chart 
    </div>
    <apexchart width="100%" type="line" :options="options" :series="series">
    </apexchart>
    <!-- <VueApexCharts width="500" type="line" :options="options" :series="series">
    </VueApexCharts> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: 'LineChart',
  components: [ VueApexCharts],
  props: {
  },
  data(){
    return{
      options: {
        chart: {
          id: 'LineChart'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  }
})
</script>
