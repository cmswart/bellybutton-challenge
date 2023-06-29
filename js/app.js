//check to see if connection is good
//console.log("Test for conneciton -- good")

// Use D3 to read in samples.json from URL
const sample_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Fetch Data
d3.json(sample_data).then(function(data) {
    //console.log(data);
})

//build function called buildChart
function buildChart(sample){
    //console.log("building function");
    d3.json(sample_data).then(function(data) {
        //console.log("sample data")
        //console.log(data);
    //to build barchart-

    let samples = data.samples
    //console.log(samples);

    //filter
    let sampleArray = samples.filter(sampleObject => sampleObject.id == sample);
    //console.log(sampleArray);

    let sampleResult = sampleArray[0];
    //console.log(sampleResult)

    // create variables
    let sample_values = sampleResult.sample_values;
    // console.log("this is sample_values")
    // console.log(sample_values);

    let otu_ids = sampleResult.otu_ids;
    // console.log("this is otu_ids")
    // console.log(otu_ids);

    let otu_labels = sampleResult.otu_labels;
    // console.log("this is otu_labels")
    // console.log(otu_labels);

    //build chart
    let traceBubble = {
        x: otu_ids,
        y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Picnic',

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

      //build bar chart

let dataBar = [{
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    type: 'bar',
    orientation: "h"


}];

let layoutBar = {
    title: "Top 10 Bacteria"

}

Plotly.newPlot('bar', dataBar, layoutBar);

//this is the end- no data available after this
    });
};

//buildMetadata function
function buildMetadata(sample) {
    d3.json(sample_data).then(function(data) {
        console.log("this metadata")
        let metadata = data.metadata;
        console.log(metadata);

        //filter samples down
        let metadataArray = metadata.filter(metadataObject => metadataObject.id == sample);
        console.log(metadataArray)

        //unpack Array
        let metadataResult = metadataArray[0]
        console.log("this is metadataResults")
        console.log(metadataResult)

        //d3.select method to get where to put metadata, assign to a variable
        let metadataPanel = d3.select("#sample-metadata");
        //wipe clean the panel
        metadataPanel.html("")
        //iterate over key value pairs in metadataResult and append to panel
        for (key in metadataResult) {
            metadataPanel.append("h5").text(`${key.toUpperCase()} : ${metadataResult[key]}`);
        }

    });
};

//Event Listener
function optionChanged(newSample) {
    //build charts with new sample
    buildChart(newSample);
    buildMetadata(newSample)
};

//create an intialize function
function initialize() {
    d3.json(sample_data).then(function(data) {
        let sampleNames = data.names;
        // view in console
        //console.log(sampleNames);

        //pop pulldown menu
        //ref MDN
        //
        let pulldownSelect = d3.select("#selDataset")

        //iterate over sampleNames, add option, value, text for each sampleName
        for (let index =0; index < sampleNames.length; index++) {
            pulldownSelect
                .append("option")
                .text(sampleNames[index])
                .property("value",sampleNames[index]);
        };

        let firstSample=sampleNames[0];

    //call buildCharts
    buildChart(firstSample);
    //call buildmetadata
    buildMetadata(firstSample);
    });
};



initialize()