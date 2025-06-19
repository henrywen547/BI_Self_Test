<template>
    <div ref="piediv" class="chart"></div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
export default {
    name: 'Piechart',
    methods: {
        piechart() {
            if (!this.$refs.piediv) {
                console.error("piediv is not defined");
                return;
            }

            let root = am5.Root.new(this.$refs.piediv);
            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            let chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    layout: root.verticalLayout,
                })
            );
            
            // Define data
            let data = [
                {
                    country: "France",
                    sales: 100000
                }, 
                {
                    country: "Spain",
                    sales: 160000
                }, 
                {
                    country: "United Kingdom",
                    sales: 80000
                }
            ];
            let series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    name: "Series",
                    valueField: "sales",
                    categoryField: "country",
                })
            );
            series.data.setAll(data);

            // Add legend
            chart.children.push(am5.Legend.new(root, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                layout: root.horizontalLayout
            }));

            this.root = root;
        }
    },
    mounted() {
        this.piechart();
    },
    beforeDestroy() {
        if (this.root) {
            this.root.dispose();
        }
    }
}
</script>
<style scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>