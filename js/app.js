//check to see if connection is good
console.log("Test for conneciton -- good")

// Use D3 to read in samples.json from URL
const sample_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Fetch Data
d3.json(sample_data).then(function(data) {
    //console.log(data);
})

//build function called buildChart
function buildChart(sample){
    console.log("building function");
    d3.json(sample_data).then(function(data) {
        console.log("sample data")
        console.log(data);
    //to build barchart-

    let samples = data.samples
    console.log(samples);

    //filter
    let sampleArray = samples.filter(sampleObject => sampleObject.id == sample);
    console.log(sampleArray);

    let sampleResult = sampleArray[0];
    console.log(sampleResult)

    // create variables
    let sample_values = sampleResult.sample_values;
    console.log("this is sample_values")
    console.log(sample_values);

    let otu_ids = sampleResult.otu_ids;
    console.log("this is otu_ids")
    console.log(otu_ids);

    let otu_labels = sampleResult.otu_labels;
    console.log("this is otu_labels")
    console.log(otu_labels);

    //build chart
    let traceBubble = {
        x: otu_ids,
        y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Jet',

            }
          };

    
    
    let dataBubble = [traceBubble]

    let layoutBubble = {
        title : "Bacteria in Sample",
        showlegend: false,
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"}
    }
      

      Plotly.newPlot('bubble', dataBubble, layoutBubble);


//this is the end- no data available after this
    });
};


//create an itialize function
function initialize() {
    //call buildCharts
    buildChart(940);
}
initialize()