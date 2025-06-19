<template>
    <div ref="linediv" class="chart"></div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
export default {
    name: 'Linechart',
    methods: {
        linechart() {
            if (!this.$refs.linediv) {
                console.error("linediv is not defined");
                return;
            }

            let root = am5.Root.new(this.$refs.linediv);
            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    paddingLeft: 0,
                    layout: root.verticalLayout,
                })
            );
            
            let data = [
                {
                    "year": "2021",
                    "europe": 5,
                    "namerica": 2.5,
                    "asia": 1
                }, 
                {
                    "year": "2022",
                    "europe": 2.6,
                    "namerica": 6.7,
                    "asia": 2.2
                }, 
                {
                    "year": "2023",
                    "europe": 4.8,
                    "namerica": 1.9,
                    "asia": 4.4
                }
            ]
            // Create Y-axis
            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {})
                })
            );

            // Create X-Axis
            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    maxDeviation: 0.2,
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    categoryField: "year"
                })
            );
            xAxis.data.setAll(data);

            // Create series
            const createSeries = (name, field) => {
                let series = chart.series.push(
                    am5xy.LineSeries.new(root, {
                        name: name,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: field,
                        categoryXField: "year",
                        stacked: true,
                    })
                )
                series.strokes.template.setAll({
                    strokeWidth: 3,
                    strokeDasharray: [10,5]
                });
                series.fills.template.setAll({
                    fillOpacity: 0.5,
                    visible: true
                });
                series.data.setAll(data);
            }

            createSeries("Europe", "europe");
            createSeries("North America", "namerica");
            createSeries("Asia", "asia");

            this.root = root;
        }
    },
    mounted() {
        this.linechart();
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